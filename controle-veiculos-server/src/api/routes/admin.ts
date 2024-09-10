import { Router } from 'express';
import { AuthController } from '../controllers/auth';
import { AuthService } from '../../domain/services/auth/auth-service';
import { PrismaAdminRepository } from '../../infra/repositories/prisma-repositories/prisma-admin-repository';

const admin = Router();

admin.post('/admin/login', async (req, res) => {
  const authService = new AuthService(new PrismaAdminRepository());

  const authController = new AuthController(authService);

  const { body, statusCode } = await authController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

export { admin };
