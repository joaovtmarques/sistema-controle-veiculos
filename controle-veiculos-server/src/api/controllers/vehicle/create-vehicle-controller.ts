import { IVehicleParams } from './protocols';
import { created, serverError, unprocessable } from '../helpers';
import { HttpRequest, HttpResponse, IController } from '../protocols';
import { CreateVehicleService } from '@/src/domain/services/vehicle/create-vehicle-service';

export class CreateVehicleController implements IController {
  constructor(private readonly createVehicleService: CreateVehicleService) {}

  async handle(
    httpRequest: HttpRequest<IVehicleParams>
  ): Promise<HttpResponse<string>> {
    try {
      const requiredFields = ['model', 'plate', 'color', 'type', 'userId'];

      for (const field of requiredFields) {
        if (!httpRequest.body?.[field as keyof IVehicleParams]?.length) {
          return unprocessable(`Field {${field}} is required`);
        }
      }

      const vehicle = await this.createVehicleService.execute(
        httpRequest.body!
      );

      return created(vehicle);
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === 'A vehicle with this plate is already registered')
          return unprocessable('Um veículo com esta placa já está cadastrado');
      }

      return serverError();
    }
  }
}
