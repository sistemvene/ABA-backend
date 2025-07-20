import { createClient } from 'redis';

async function testRedis() {
  const redisClient = createClient({
    url: 'redis://:ChangeMe!@10.20.20.6:6379'
  });

  redisClient.on('error', (err) => console.error('Redis Client Error', err));

  await redisClient.connect();

  console.log('Conectado a Redis!');

  // Prueba simple
  await redisClient.set('clave_prueba', 'valor_de_prueba');
  const valor = await redisClient.get('clave_prueba');
  console.log('Valor obtenido de Redis para clave_prueba:', valor);

  await redisClient.quit();
}

testRedis().catch(console.error);
