import ip from 'ip';
import cors from 'cors';
import express from 'express';
import { config } from 'dotenv';
import bodyParser from 'body-parser';

import { user, upload, vehicle, stamp, form, admin } from './api/routes';

const main = async () => {
  config();

  const app = express();

  app.use(express.json());

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(cors());

  app.use(user, vehicle, upload, stamp, form, admin);

  const port = process.env.PORT || 8000;

  // eslint-disable-next-line no-console
  app.listen(port, () =>
    console.log(`Servidor iniciado em http://${ip.address()}:${port}`)
  );
};

main();
