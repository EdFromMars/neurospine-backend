import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let changeStream;

async function run() {
  try {
    await client.connect();
    
    console.log('Conectado a MongoDB');
    const database = client.db(process.env.DB_NAME);
    const collection = database.collection('usuarios');

    changeStream = collection.watch();

    changeStream.on('change', (change) => {
      console.log(change);
    });

    await new Promise(() => {});

  } catch (error) {
    console.error('Error al conectar con MongoDB:', error);
  } finally {
    await client.close();
  }
}

process.on('SIGINT', async () => {
  if (changeStream) {
    await changeStream.close();
  }

  await client.close();
  process.exit(0);
});

export default run;
