import { ok, serverError } from '../helpers';
import { FindAllStampsService } from '@/src/domain/services/stamp';
import { HttpRequest, HttpResponse, IController } from '../protocols';

export class FindAllStampsController implements IController {
  constructor(private readonly findAllStampsService: FindAllStampsService) {}

  async handle(
    httpRequest: HttpRequest<unknown>
  ): Promise<HttpResponse<string>> {
    try {
      const stamps = await this.findAllStampsService.execute();

      return ok(stamps);
    } catch (err) {
      return serverError();
    }
  }
}
