import admin from "firebase-admin";
import serviceAccount from "./service.json";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
export const db = admin.firestore();