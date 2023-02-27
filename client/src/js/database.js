import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jate = await openDB('jate', 1);
  const store = jate.transaction('jate', 'readwrite').objectStore('jate');
  const req = store.put({ id: 1, value: content });
  const result = await req;
  console.log('🚀 - data saved to the database', req.value)
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  
};

initdb();
