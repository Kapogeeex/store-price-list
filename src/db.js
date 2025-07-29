import { get, set } from 'idb-keyval';
import { createClient } from '@supabase/supabase-js';
import firebaseConfig from './config/firebaseConfig';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, setDoc, doc } from 'firebase/firestore';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config/supabaseConfig';

// Local store key
const STORE_KEY = 'store-items';

// IndexedDB helpers
export async function loadLocal() {
  return (await get(STORE_KEY)) || [];
}
export function saveLocal(items) {
  return set(STORE_KEY, items);
}

// Initialize Firebase
const fbApp = initializeApp(firebaseConfig);
const firestore = getFirestore(fbApp);

// Initialize Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Sync to Firebase
export async function syncToFirebase(items) {
  const col = collection(firestore, 'items');
  await Promise.all(items.map(item => setDoc(doc(col, item.id), item)));
}

// Sync to Supabase
export async function syncToSupabase(items) {
  await supabase.from('items').upsert(items, { onConflict: 'id' });
}