//import { createClient } from 'redis';

//const redisClient = createClient({
//  url: `redis://:ChangeMe!@10.20.20.6:6379`
//});

//export default redisClient;
// -------- MOCK para pruebas sin Redis --------
export default {
  get: async () => null,
  set: async () => null
};
