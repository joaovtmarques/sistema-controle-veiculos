import { Router } from 'express';
import { CreateFormService } from '../../domain/services/form/create-form-service';
import { CreateFormController } from '../controllers/form/create-form-controller';

const form = Router();

form.post('/forms', async (req, res) => {
  const createFormService = new CreateFormService();
  const createFormController = new CreateFormController(createFormService);

  const { body, statusCode } = await createFormController.handle({
    body: req.body,
  });

  res.status(statusCode).send(body);
});

export { form };
