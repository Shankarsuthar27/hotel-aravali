import { initializeApp } from "@firebase/app";
import { getFirestore, collection, getDocs } from "@firebase/firestore";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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
  apiKey: process.env.VITE_FIREBASE_API_KEY || env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID || env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const PROPERTY_ID = process.env.VITE_PROPERTY_ID || env.VITE_PROPERTY_ID || "prop_astha_01";

async function checkReservations() {
  console.log(`Checking reservations in Firebase project: [${firebaseConfig.projectId}]`);
  
  // 1. Check Root Collection: /reservations
  const rootSnapshot = await getDocs(collection(db, "reservations"));
  console.log(`\n📁 Root Collection: /reservations (${rootSnapshot.size} documents)`);
  rootSnapshot.forEach((doc) => {
    const data = doc.data();
    console.log(`  - Doc ID: [${doc.id}] | Ref: ${data.bookingReference || "N/A"} | Guest: ${data.primaryGuest?.name || data.guestName || "N/A"} | Room: ${data.roomNumber || "Unassigned"} | Status: ${data.status}`);
  });

  // 2. Check Nested Tenant Subcollection: /properties/{propertyId}/reservations
  const tenantSnapshot = await getDocs(collection(db, "properties", PROPERTY_ID, "reservations"));
  console.log(`\n📁 Tenant Subcollection: /properties/${PROPERTY_ID}/reservations (${tenantSnapshot.size} documents)`);
  tenantSnapshot.forEach((doc) => {
    const data = doc.data();
    console.log(`  - Doc ID: [${doc.id}] | Ref: ${data.bookingReference || "N/A"} | Guest: ${data.primaryGuest?.name || data.guestName || "N/A"} | Room: ${data.roomNumber || "Unassigned"} | Status: ${data.status}`);
  });

  // 3. Check Linked Folios Collection: /folios
  const folioSnapshot = await getDocs(collection(db, "folios"));
  console.log(`\n📁 Linked Billing Folios: /folios (${folioSnapshot.size} documents)`);

  process.exit(0);
}

checkReservations().catch((err) => {
  console.error("Error checking reservations:", err);
  process.exit(1);
});
