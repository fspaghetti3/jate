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
  try {

    const editorDb = await openDB('jate', 1);
    const transfer = editorDb.transaction('jate', 'readwrite')
    const store = transfer.objectStore('jate')
    const req = store.put({ value: content })
    await req;

    console.log('Saved to Database:', content );
   } catch (error) {
    console.error('Could not save to database', error)

    }

}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {

    const editorDb = await openDB('jate', 1);
    const transfer = editorDb.transaction('jate', 'readonly')
    const store = transfer.objectStore('jate')
    const req = store.getAll()
    const result = await req;
    console.log('Data retrieved from Database!', result);
    return result?.value;
  } catch (error) {
    console.error('Could not fetch Database', error)
  }


}

initdb();