import { ok, serverError } from '../helpers';
import { HttpRequest, HttpResponse, IController } from '../protocols';
import { FindAllVehiclesService } from '@/src/domain/services/vehicle/find-all-vehicles-service';
import * as sinesp from 'sinesp-nodejs'

export class FindAllVehiclesController implements IController {
  constructor(
    private readonly findAllVehiclesService: FindAllVehiclesService
  ) {}

  async handle(
    httpRequest: HttpRequest<unknown>
  ): Promise<HttpResponse<string>> {
    try {
      // const vehicles = await this.findAllVehiclesService.execute();

      // return ok(vehicles);

      return ok(await sinesp.consultaPlaca('GOL3405'))
    } catch (err) {
      return serverError();
    }
  }
}
