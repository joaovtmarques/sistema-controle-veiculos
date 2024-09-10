import { Router } from 'express';
import {
  FindUploadByUserController,
  UploadFilesController,
} from '../controllers/upload';
import {
  PrismaUserRepository,
  PrismaUploadRepository,
} from '@/src/infra/repositories/prisma-repositories';
import { uploadStorage } from '../middlewares/upload-middleware';
import { UploadService } from '@/src/domain/services/upload/upload-service';
import { FindUploadByUserService } from '@/src/domain/services/upload/find-upload-by-user-service';

const upload = Router();

const userRepository = new PrismaUserRepository();
const uploadRepository = new PrismaUploadRepository();

upload.post('/uploads', uploadStorage.array('file', 6), async (req, res) => {
  const uploadService = new UploadService(uploadRepository, userRepository);

  const uploadFilesController = new UploadFilesController(uploadService);

  const { statusCode, body } = await uploadFilesController.handle({
    body: req.body,
    files: req.files,
  });

  res.status(statusCode).send(body);
});

upload.get('/uploads', async (req, res) => {
  const findUploadByUserService = new FindUploadByUserService(
    userRepository,
    uploadRepository
  );

  const findUploadByUserController = new FindUploadByUserController(
    findUploadByUserService
  );

  const { statusCode, body } = await findUploadByUserController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

upload.post('/uploads/download', async (req, res) => {
  res.download(req.body!.filePath, 'filePath.pdf');
});

export { upload };
