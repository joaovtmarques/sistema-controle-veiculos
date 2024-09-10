import { Router } from 'express';

import {
  CreateUserService,
  DeleteUserService,
  FindAllUsersService,
  UpdateUserService,
} from '../../domain/services/user';
import {
  CreateUserController,
  DeleteUserController,
  FindAllUsersController,
  UpdateUserController,
} from '../controllers/user';
import { PrismaUserRepository } from '../../infra/repositories/prisma-repositories/prisma-user-repository';

const user = Router();

const userRepository = new PrismaUserRepository();

user.post('/users', async (req, res) => {
  const createUserService = new CreateUserService(userRepository);

  const createUserController = new CreateUserController(createUserService);

  const { body, statusCode } = await createUserController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

user.get('/users', async (req, res) => {
  const findAllUsersService = new FindAllUsersService(userRepository);

  const findAllUsersController = new FindAllUsersController(
    findAllUsersService
  );

  const { body, statusCode } = await findAllUsersController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

export { user };

user.delete('/users', async (req, res) => {
  const deleteUserService = new DeleteUserService(userRepository);

  const deleteUserController = new DeleteUserController(deleteUserService);

  const { body, statusCode } = await deleteUserController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

user.put('/users', async (req, res) => {
  const updateUserService = new UpdateUserService(userRepository);

  const updateUserController = new UpdateUserController(updateUserService);

  const { body, statusCode } = await updateUserController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});
