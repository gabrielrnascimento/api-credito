import 'dotenv/config';
import { setupApp } from './config/app';
import { mongoUtilFactory } from './factories/database';

const app = setupApp();

const mongoUtil = mongoUtilFactory;

mongoUtil.conecta(process.env.MONGO_URL)
  .then(async () => {
    app.listen(process.env.PORTA, async () => {
      console.log(`Servidor rodando na porta: ${process.env.PORTA}`);
    });
  })
  .catch((erro) => { console.error(erro); });
