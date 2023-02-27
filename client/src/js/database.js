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
  console.log('PUT content into Database!');
  const jate = await openDB('jate', 1);
  const store = jate.transaction('jate', 'readwrite').objectStore('jate');
  const req = store.put({ id: 1, value: content });
  const res = await req;
  console.log('🚀 - data saved to the database', res.value)
};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET content from Database!');
  const jate = await openDB('jate', 1);
  const store = jate.transaction('jate', 'readonly').objectStore('jate');
  const req = store.get(1);
  const res = await req;
  res ? console.log('🚀 - data retrieved from the database', req.value) : console.log('🚀 - cannot find data from database');
  return res?.value;
};

initdb();
