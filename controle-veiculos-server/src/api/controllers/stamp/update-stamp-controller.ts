import { IUpdateStampParams } from './protocols';
import { UpdateStampService } from '@/src/domain/services/stamp';
import { notFound, ok, serverError, unprocessable } from '../helpers';
import { HttpRequest, HttpResponse, IController } from '../protocols';

export class UpdateStampController implements IController {
  constructor(private readonly updateStampService: UpdateStampService) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<string>> {
    try {
      const requiredFields = ['lic', 'vencHab', 'stampId', 'number', 'status'];

      for (const field of requiredFields) {
        if (!httpRequest.body?.[field as keyof IUpdateStampParams]?.length) {
          return unprocessable(`Field {${field}} is required`);
        }
      }

      const updatedStamp = await this.updateStampService.execute({
        lic: parseInt(httpRequest.body!.lic.toString()),
        vencHab: parseInt(httpRequest.body!.vencHab.toString()),
        number: parseInt(httpRequest.body!.number.toString()),
        stampId: httpRequest.body!.stampId,
        status: httpRequest.body!.status,
      });

      return ok(updatedStamp);
    } catch (err) {
      if (err instanceof Error) {
        return notFound(err.message);
      }

      return serverError();
    }
  }
}
