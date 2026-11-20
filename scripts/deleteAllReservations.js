import { initializeApp } from "@firebase/app";
import { getFirestore, collection, getDocs, deleteDoc, doc, setDoc } from "@firebase/firestore";
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

const PROPERTY_ID = process.env.VITE_PROPERTY_ID || env.VITE_PROPERTY_ID || "prop_astha_01";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function purgeAll(colRef, label) {
  let count = 0;
  while (true) {
    const snapshot = await getDocs(colRef);
    if (snapshot.empty) break;
    for (const d of snapshot.docs) {
      await deleteDoc(d.ref);
      count++;
    }
  }
  console.log(`✅ [${label}] Completely emptied. Deleted ${count} documents total.`);
}

async function run() {
  await purgeAll(collection(db, "properties", PROPERTY_ID, "reservations"), `properties/${PROPERTY_ID}/reservations`);
  await purgeAll(collection(db, "reservations"), "root /reservations");
  await purgeAll(collection(db, "properties", PROPERTY_ID, "folios"), `properties/${PROPERTY_ID}/folios`);
  await purgeAll(collection(db, "folios"), "root /folios");

  // Reset all rooms
  const roomsSnap = await getDocs(collection(db, "properties", PROPERTY_ID, "rooms"));
  for (const d of roomsSnap.docs) {
    const resetData = {
      ...d.data(),
      currentReservationId: null,
      currentGuestName: "",
      operational: "available",
      status: "clean",
      updatedAt: new Date().toISOString()
    };
    await setDoc(d.ref, resetData, { merge: true });
    await setDoc(doc(db, "rooms", d.id), resetData, { merge: true });
  }
  console.log(`✅ Reset ${roomsSnap.size} rooms to clean & available.`);
  process.exit(0);
}

run().catch(console.error);
