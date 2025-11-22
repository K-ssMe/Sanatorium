// IndexedDB wrapper for sanatorium data storage
// Provides much larger storage capacity than localStorage (hundreds of MB vs 5-10 MB)

const DB_NAME = "sanatorium_db";
const DB_VERSION = 1;

interface DBStores {
  bookings: "bookings";
  guests: "guests";
  rooms: "rooms";
  organizations: "organizations";
  auditHistory: "auditHistory";
  auditLogs: "auditLogs";
  roomTypes: "roomTypes";
  settings: "settings";
}

const STORES: DBStores = {
  bookings: "bookings",
  guests: "guests",
  rooms: "rooms",
  organizations: "organizations",
  auditHistory: "auditHistory",
  auditLogs: "auditLogs",
  roomTypes: "roomTypes",
  settings: "settings",
};

let dbInstance: IDBDatabase | null = null;

// Initialize IndexedDB
export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (dbInstance) {
      resolve(dbInstance);
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.error("IndexedDB error:", request.error);
      reject(request.error);
    };

    request.onsuccess = () => {
      dbInstance = request.result;
      console.log("IndexedDB initialized successfully");
      resolve(dbInstance);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Create object stores if they don't exist
      Object.values(STORES).forEach((storeName) => {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName);
          console.log(`Created object store: ${storeName}`);
        }
      });
    };
  });
};

// Generic save function
export const saveToIndexedDB = async <T>(
  storeName: keyof DBStores,
  key: string,
  data: T,
): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.put(data, key);

    request.onsuccess = () => resolve();
    request.onerror = () => {
      console.error(`Error saving to ${storeName}:`, request.error);
      reject(request.error);
    };
  });
};

// Generic load function
export const loadFromIndexedDB = async <T>(
  storeName: keyof DBStores,
  key: string,
): Promise<T | null> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.get(key);

    request.onsuccess = () => {
      resolve(request.result || null);
    };
    request.onerror = () => {
      console.error(`Error loading from ${storeName}:`, request.error);
      reject(request.error);
    };
  });
};

// Migrate data from localStorage to IndexedDB
export const migrateFromLocalStorage = async (): Promise<void> => {
  console.log("Starting migration from localStorage to IndexedDB...");

  const migrations = [
    { key: "sanatorium_bookings", store: STORES.bookings as keyof DBStores },
    { key: "sanatorium_guests", store: STORES.guests as keyof DBStores },
    { key: "sanatorium_rooms", store: STORES.rooms as keyof DBStores },
    {
      key: "sanatorium_organizations",
      store: STORES.organizations as keyof DBStores,
    },
    {
      key: "sanatorium_auditHistory",
      store: STORES.auditHistory as keyof DBStores,
    },
    { key: "sanatorium_auditLogs", store: STORES.auditLogs as keyof DBStores },
    { key: "sanatorium_roomTypes", store: STORES.roomTypes as keyof DBStores },
    { key: "sanatorium_currentDate", store: STORES.settings as keyof DBStores },
  ];

  for (const { key, store } of migrations) {
    const data = localStorage.getItem(key);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        await saveToIndexedDB(store, key, parsed);
        console.log(`Migrated ${key} to IndexedDB`);
        // Keep localStorage as backup for now
      } catch (error) {
        console.error(`Error migrating ${key}:`, error);
      }
    }
  }

  console.log("Migration completed!");
};

// Check if migration is needed
export const checkMigrationNeeded = async (): Promise<boolean> => {
  try {
    const bookings = await loadFromIndexedDB(STORES.bookings, "sanatorium_bookings");
    return bookings === null && localStorage.getItem("sanatorium_bookings") !== null;
  } catch {
    return false;
  }
};

export { STORES };
