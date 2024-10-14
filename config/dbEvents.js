import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let changeStream;
let isConnected = false;

async function connectToMongo() {
  if (!isConnected) {
    try {
      await client.connect();
      console.log('Conectado a MongoDB');
      isConnected = true;
    } catch (error) {
      console.error('Error al conectar con MongoDB:', error);
      throw error;
    }
  }
}

async function dbEvents(sendEvent) {
  if (typeof sendEvent !== 'function') {
    throw new Error('sendEvent debe ser una función');
  }

  try {
    await connectToMongo();
    const database = client.db(process.env.DB_NAME);
    //Lista de colecciones a observar
    const collections = ['usuarios', 'productos', 'programacions', 'materialapoyos'];
    
    //Crear un changeStream por cada colección
    const changeStreams = collections.map(coleccion => {
      const collection = database.collection(coleccion);
      const stream = collection.watch();

      stream.on('change', (change) => {
        console.log('Cambio detectado:', change);
        const mensaje = JSON.stringify({
          type: 'change',
          collection: change.ns.coll,
          operationType: change.operationType,
          documentKey: change.documentKey
        });
        sendEvent(mensaje);
      });

      return stream;
    });

    sendEvent(JSON.stringify({ type: 'connection', message: 'Conexión establecida con la base de datos' }));

    return changeStreams;
  } catch (error) {
    console.error('Error en dbEvents:', error);
    sendEvent(JSON.stringify({ type: 'error', message: 'Error al conectar con la base de datos' }));
    throw error;
  }
}

process.on('SIGINT', async () => {
  if (changeStream) {
    await Promise.all(changeStreams.map(stream => stream.close()));
  }
  if (isConnected) {
    await client.close();
  }
  process.exit(0);
});

export { dbEvents, connectToMongo };
