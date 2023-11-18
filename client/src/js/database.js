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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {

    const editorDb = await openDB('JATE', 1);
    const transfer = editorDb.transaction('JATE', 'readwrite')
    const store = transfer.objectStore('JATE')
    const req = store.put({ id: 1, value: content})
    const result = await req;

    console.error('Saved to Database', result.value );

}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {

    const editorDb = await openDB('JATE', 1);
    const transfer = editorDb.transaction('JATE', 'readwrite')
    const store = transfer.objectStore('JATE')
    const req = store.put({ id: 1, value: content})
    const result = await req;
    result ? console.log('Data retrieved from Database!', result.value) : console.log('Data not found.', result.value)

}

initdb();