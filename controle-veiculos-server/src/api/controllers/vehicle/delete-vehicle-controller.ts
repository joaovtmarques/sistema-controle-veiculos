import { IDeleteVehicleParams } from './protocols';
import { DeleteVehicleService } from '@/src/domain/services/vehicle';
import { notFound, ok, serverError, unprocessable } from '../helpers';
import { HttpRequest, HttpResponse, IController } from '../protocols';

export class DeleteVehicleController implements IController {
  constructor(private readonly deleteVehicleService: DeleteVehicleService) {}

  async handle(
    httpRequest: HttpRequest<IDeleteVehicleParams>
  ): Promise<HttpResponse<unknown>> {
    try {
      const requiredFields = ['vehicleId'];

      for (const field of requiredFields) {
        if (!httpRequest.body?.[field as keyof IDeleteVehicleParams]?.length) {
          return unprocessable(`Field {${field}} is required`);
        }
      }

      await this.deleteVehicleService.execute(httpRequest.body!.vehicleId);

      return ok({});
    } catch (err) {
      if (err instanceof Error) return notFound(err.message);

      return serverError();
    }
  }
}
