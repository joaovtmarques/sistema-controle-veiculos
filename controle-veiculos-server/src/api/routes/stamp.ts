import { Router } from 'express';

import {
  CreateStampService,
  FindAllStampsService,
  CreateStampSpreadsheetService,
  UpdateStampService,
} from '../../domain/services/stamp';
import {
  CreateStampController,
  UpdateStampController,
  FindAllStampsController,
  CreateStampSpreadsheetController,
} from '../controllers/stamp';
import {
  PrismaUserRepository,
  PrismaStampRepository,
  PrismaVehicleRepository,
} from '../../infra/repositories/prisma-repositories';

const stamp = Router();

const stampRepository = new PrismaStampRepository();
const userRepository = new PrismaUserRepository();
const vehicleRepository = new PrismaVehicleRepository();

stamp.post('/stamps', async (req, res) => {
  const createStampService = new CreateStampService(
    stampRepository,
    userRepository,
    vehicleRepository
  );
  const createStampSpreadsheetService = new CreateStampSpreadsheetService();

  const createStampController = new CreateStampController(
    createStampService,
    createStampSpreadsheetService
  );

  const { body, statusCode } = await createStampController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

stamp.post('/stamps/spreadsheet', (req, res) => {
  const createStampSpreadsheetService = new CreateStampSpreadsheetService();
  const createStampSpreadsheetController = new CreateStampSpreadsheetController(
    createStampSpreadsheetService
  );

  createStampSpreadsheetController.handle();

  res.status(201).send({});
});

stamp.get('/stamps', async (req, res) => {
  const findAllStampsService = new FindAllStampsService(stampRepository);

  const findAllStampsController = new FindAllStampsController(
    findAllStampsService
  );

  const { body, statusCode } = await findAllStampsController.handle({});

  res.status(statusCode).send(body);
});

stamp.put('/stamps', async (req, res) => {
  const updateStampService = new UpdateStampService(stampRepository);

  const updateStampController = new UpdateStampController(updateStampService);

  const { body, statusCode } = await updateStampController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

export { stamp };
