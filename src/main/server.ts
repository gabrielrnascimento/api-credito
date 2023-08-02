import 'dotenv/config';
import { MongoUtil } from '../infra/db/mongodb/util/mongo-util';
import { setupApp } from './config/app';

const app = setupApp();

export const mongoUtil = new MongoUtil();

mongoUtil.conecta(process.env.MONGO_URL)
  .then(async () => {
    app.listen(process.env.PORTA, async () => {
      console.log(`Server is running on port ${process.env.PORTA}`);
    });
  })
  .catch((erro) => { console.error(erro); });
