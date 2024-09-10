import { serverError, ok } from '../helpers';
import { FindAllUsersService } from '@/src/domain/services/user';
import { HttpRequest, HttpResponse, IController } from '../protocols';

export class FindAllUsersController implements IController {
  constructor(private readonly findAllUsersService: FindAllUsersService) {}

  async handle(
    httpRequest: HttpRequest<unknown>
  ): Promise<HttpResponse<string>> {
    try {
      const users = await this.findAllUsersService.execute();

      return ok(users);
    } catch (err) {
      return serverError();
    }
  }
}
