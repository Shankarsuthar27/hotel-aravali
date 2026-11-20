// ==============================================================================
// HOTEL PMS PRO - DUAL-TENANCY CLOUD FIRESTORE MASTER SEEDER
// Seeds all 16 collections in root and nested under /properties/prop_astha_01/
// ==============================================================================

import { initializeApp } from "@firebase/app";
import { getFirestore, doc, setDoc, writeBatch } from "@firebase/firestore";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import {
  initialProperty,
  initialRoomTypes,
  initialRooms,
  initialMealPlans,
  initialRatePlans,
  initialReservations,
  initialFolios,
  initialStaffNotes,
  initialOtaChannels,
  initialTeamMembers,
  initialNightAudits,
  initialAuditTrail,
  initialGuests,
  initialTaxRules,
  initialServiceCharges
} from "../src/data/initialPmsData.js";

// Load environment variables from .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, "../.env");

const env = {};
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  content.split("\n").forEach((line) => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      let val = (match[2] || "").trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      env[match[1]] = val;
    }
  });
}

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || env.VITE_FIREBASE_API_KEY || "AIzaSyDjV73OruUnFyYPpmk0D9_YjXzCkkygPKo",
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || env.VITE_FIREBASE_AUTH_DOMAIN || "hotel-aravali-20101.firebaseapp.com",
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || env.VITE_FIREBASE_PROJECT_ID || "hotel-aravali-20101",
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || env.VITE_FIREBASE_STORAGE_BUCKET || "hotel-aravali-20101.firebasestorage.app",
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || env.VITE_FIREBASE_MESSAGING_SENDER_ID || "70247603413",
  appId: process.env.VITE_FIREBASE_APP_ID || env.VITE_FIREBASE_APP_ID || "1:70247603413:web:8e264861de08cb6aff165c",
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID || env.VITE_FIREBASE_MEASUREMENT_ID || "G-Y2CT5YWTMP"
};

const PROPERTY_ID = process.env.VITE_PROPERTY_ID || env.VITE_PROPERTY_ID || "prop_astha_01";

console.log("==================================================================");
console.log(`🏨 Connecting to Firebase Firestore: [${firebaseConfig.projectId}]`);
console.log(`📌 Primary PMS Tenant Property ID:   [${PROPERTY_ID}]`);
console.log("==================================================================");

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Helper to dual-write (both root & properties/{propertyId}/ subcollection) with batch safety (<500 items)
async function dualBatchWrite(collectionName, items, idKey = "id") {
  if (!items || items.length === 0) return;
  const CHUNK_SIZE = 200; // 200 items * 2 = 400 operations, safely under 500 limit
  for (let i = 0; i < items.length; i += CHUNK_SIZE) {
    const chunk = items.slice(i, i + CHUNK_SIZE);
    const batch = writeBatch(db);
    chunk.forEach((item) => {
      const docId = String(item[idKey] || item.code || item.id);
      // 1. Root collection
      batch.set(doc(db, collectionName, docId), item, { merge: true });
      // 2. Nested tenant subcollection
      batch.set(doc(db, "properties", PROPERTY_ID, collectionName, docId), item, { merge: true });
    });
    await batch.commit();
  }
  console.log(`✅ [${collectionName.padEnd(18)}] Seeded ${items.length} records (Root + Tenant)`);
}

async function seedAll16Collections() {
  try {
    console.log("\n🚀 Initiating Dual-Tenancy Firestore Seeder (16 Collections)...\n");

    // 1. Property Master Document
    const propDocData = {
      ...initialProperty,
      id: PROPERTY_ID,
      propertyId: PROPERTY_ID,
      businessDate: "2026-11-20",
      sacCode: "996311",
      fnbSacCode: "996331",
      updatedAt: new Date().toISOString()
    };
    await setDoc(doc(db, "properties", PROPERTY_ID), propDocData, { merge: true });
    console.log(`✅ [properties        ] Master Property Profile set for ${PROPERTY_ID}`);

    // 2. Room Types (4 categories: rt_standard, rt_deluxe, rt_premium, rt_ultra_premium)
    await dualBatchWrite("roomTypes", initialRoomTypes);

    // 3. Physical Rooms (20 inventory units rm_101 through rm_304)
    await dualBatchWrite("rooms", initialRooms);

    // 4. Meal Plans (EP, CP, MAP, AP)
    await dualBatchWrite("mealPlans", initialMealPlans, "code");

    // 5. Rate Plans (BAR_CP, BAR_EP, etc.)
    await dualBatchWrite("ratePlans", initialRatePlans, "code");

    // 6. Reservations (res_1 through res_12 + live references)
    await dualBatchWrite("reservations", initialReservations);

    // 7. Folios (Double-entry billing ledgers fol_1 through fol_12)
    const foliosArray = Object.entries(initialFolios).map(([k, v]) => ({
      ...v,
      id: k,
      folioId: k
    }));
    await dualBatchWrite("folios", foliosArray);

    // 8. Guests (CRM Profiles gst_001 through gst_010)
    await dualBatchWrite("guests", initialGuests);

    // 9. Staff Profiles (Auth RBAC profiles)
    await dualBatchWrite("staff", initialTeamMembers, "uid");

    // 10. Team Members (Directory usr_owner, usr_gm, usr_frontdesk, usr_housekeeping, usr_auditor)
    await dualBatchWrite("teamMembers", initialTeamMembers);

    // 11. Audit Trail (Initial timeline events at_01, at_02)
    await dualBatchWrite("auditTrail", initialAuditTrail);

    // 12. Night Audits (na_01, na_02 end-of-day balances)
    await dualBatchWrite("nightAudits", initialNightAudits);

    // 13. OTA Channels (ota_booking, ota_agoda, ota_mmt)
    await dualBatchWrite("otaChannels", initialOtaChannels, "code");

    // 14. Maintenance Blocks (Out-of-order room blocks)
    const initialMaintenanceBlocks = [
      {
        id: "mb_01",
        roomId: "rm_203",
        roomNumber: "203",
        reason: "AC Compressor overhaul & coolant flush",
        startDate: "2026-10-23",
        endDate: "2026-10-26",
        createdAt: "2026-10-23T08:00:00Z"
      }
    ];
    await dualBatchWrite("maintenanceBlocks", initialMaintenanceBlocks);

    // 15. Tax Rules (GST 12%, GST 18%, etc.)
    await dualBatchWrite("taxRules", initialTaxRules);

    // 16. Global Settings (property_config)
    const globalSettings = {
      propertyId: PROPERTY_ID,
      businessDate: "2026-11-20",
      currency: "₹",
      timezone: "Asia/Kolkata",
      checkInTime: "14:00",
      checkOutTime: "11:00",
      updatedAt: new Date().toISOString()
    };
    await setDoc(doc(db, "settings", "property_config"), globalSettings, { merge: true });
    await setDoc(doc(db, "properties", PROPERTY_ID, "settings", "property_config"), globalSettings, { merge: true });
    console.log(`✅ [settings          ] Global property_config applied`);

    console.log("\n==================================================================");
    console.log("🎉 SUCCESS: All 16 Collections Seeded in Cloud Firestore!");
    console.log(`   Database: Cloud Firestore (${firebaseConfig.projectId})`);
    console.log(`   Tenant:   ${PROPERTY_ID}`);
    console.log("==================================================================");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Firestore Seeding Failed:", error);
    if (error.message && error.message.includes("PERMISSION_DENIED")) {
      console.log("\n💡 ACTION REQUIRED IN FIREBASE CONSOLE:");
      console.log("1. Open: https://console.firebase.google.com/project/" + firebaseConfig.projectId + "/firestore");
      console.log("2. Click 'Create database'");
      console.log("3. Select Location: asia-south1 (Mumbai) and choose 'Start in test mode' or deploy firestore.rules.");
      console.log("4. Once the database is created, re-run: npm run db:seed\n");
    }
    process.exit(1);
  }
}

seedAll16Collections();

