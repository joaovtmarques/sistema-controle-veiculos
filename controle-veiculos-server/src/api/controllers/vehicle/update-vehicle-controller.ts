import { IUpdateVehicleParams } from './protocols';
import { UpdateVehicleService } from '@/src/domain/services/vehicle';
import { notFound, ok, serverError, unprocessable } from '../helpers';
import { HttpRequest, HttpResponse, IController } from '../protocols';

export class UpdateVehicleController implements IController {
  constructor(private readonly updateVehicleService: UpdateVehicleService) {}

  async handle(
    httpRequest: HttpRequest<IUpdateVehicleParams>
  ): Promise<HttpResponse<string>> {
    try {
      const requiredFields = [
        'model',
        'plate',
        'color',
        'type',
        'userId',
        'vehicleId',
      ];

      for (const field of requiredFields) {
        if (!httpRequest.body?.[field as keyof IUpdateVehicleParams]?.length) {
          return unprocessable(`Field {${field}} is required`);
        }
      }

      const vehicle = await this.updateVehicleService.execute(
        httpRequest.body!
      );

      return ok(vehicle);
    } catch (err) {
      if (err instanceof Error) {
        if (
          err.message === 'Usuário não encontrado' ||
          err.message === 'Veículo não encontrado'
        )
          return notFound(err.message);
      }

      return serverError();
    }
  }
}
