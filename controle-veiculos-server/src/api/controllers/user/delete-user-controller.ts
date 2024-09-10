import { IDeleteUserParams } from './protocols';
import { DeleteUserService } from '@/src/domain/services/user';
import { ok, serverError, notFound, unprocessable } from '../helpers';
import { HttpRequest, HttpResponse, IController } from '../protocols';

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserService: DeleteUserService) {}

  async handle(
    httpRequest: HttpRequest<IDeleteUserParams>
  ): Promise<HttpResponse<string>> {
    try {
      const requiredFields = ['userId'];

      for (const field of requiredFields) {
        if (!httpRequest.body?.[field as keyof IDeleteUserParams]?.length) {
          return unprocessable(`Field {${field}} is required`);
        }
      }

      await this.deleteUserService.execute(httpRequest.body!.userId);

      return ok({});
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === 'User not found')
          return notFound('Usuário não encontrado');
      }

      return serverError();
    }
  }
}
