import { Router } from 'express';

import {
  CreateVehicleController,
  DeleteVehicleController,
  FindAllVehiclesController,
  UpdateVehicleController,
} from '../controllers/vehicle';
import {
  CreateVehicleService,
  DeleteVehicleService,
  FindAllVehiclesService,
  UpdateVehicleService,
} from '../../domain/services/vehicle';
import {
  PrismaVehicleRepository,
  PrismaUserRepository,
} from '../../infra/repositories/prisma-repositories';

const vehicle = Router();

const vehicleRepository = new PrismaVehicleRepository();
const userRepository = new PrismaUserRepository();

vehicle.post('/vehicles', async (req, res) => {
  const createVehicleService = new CreateVehicleService(vehicleRepository);

  const createVehicleController = new CreateVehicleController(
    createVehicleService
  );

  const { body, statusCode } = await createVehicleController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

vehicle.get('/vehicles', async (req, res) => {
  const findAllVehiclesService = new FindAllVehiclesService(vehicleRepository);

  const findAllVehiclesController = new FindAllVehiclesController(
    findAllVehiclesService
  );

  const { body, statusCode } = await findAllVehiclesController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

vehicle.put('/vehicles', async (req, res) => {
  const updateVehicleService = new UpdateVehicleService(
    userRepository,
    vehicleRepository
  );

  const updateVehicleController = new UpdateVehicleController(
    updateVehicleService
  );

  const { body, statusCode } = await updateVehicleController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

vehicle.delete('/vehicles', async (req, res) => {
  const deleteVehicleService = new DeleteVehicleService(vehicleRepository);

  const deleteVehicleController = new DeleteVehicleController(
    deleteVehicleService
  );

  const { statusCode } = await deleteVehicleController.handle({
    body: req.body,
  });

  res.status(statusCode).send({});
});

export { vehicle };
