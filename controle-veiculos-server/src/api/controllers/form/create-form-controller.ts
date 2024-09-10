import { ok, serverError, unprocessable } from '../helpers';
import { ICreateFormParams } from '@/src/domain/services/form/protocols';
import { HttpRequest, HttpResponse, IController } from '../protocols';
import { CreateFormService } from '@/src/domain/services/form/create-form-service';

export class CreateFormController implements IController {
  constructor(private readonly createFormService: CreateFormService) {}

  async handle(
    httpRequest: HttpRequest<ICreateFormParams>
  ): Promise<HttpResponse<unknown>> {
    try {
      const requiredFields = [
        'name',
        'warName',
        'rank',
        'phoneNumber',
        'SU',
        'vehicle',
        'model',
        'plate',
        'color',
      ];

      for (const field of requiredFields) {
        if (!httpRequest.body?.[field as keyof ICreateFormParams]?.length) {
          return unprocessable(`Field {${field}} is required`);
        }
      }

      this.createFormService.execute(httpRequest.body!);

      return ok({});
    } catch (err) {
      return serverError();
    }
  }
}
