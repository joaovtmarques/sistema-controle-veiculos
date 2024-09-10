import { IUpdateUserParams } from './protocols';
import { UpdateUserService } from '@/src/domain/services/user';
import { HttpRequest, HttpResponse, IController } from '../protocols';
import { notFound, ok, serverError, unprocessable } from '../helpers';

export class UpdateUserController implements IController {
  constructor(private readonly updateUserService: UpdateUserService) {}

  async handle(
    httpRequest: HttpRequest<IUpdateUserParams>
  ): Promise<HttpResponse<string>> {
    try {
      const requiredFields = [
        'userId',
        'name',
        'warName',
        'rank',
        'phoneNumber',
        'SU',
      ];

      for (const field of requiredFields) {
        if (!httpRequest.body?.[field as keyof IUpdateUserParams]?.length) {
          return unprocessable(`Field {${field}} is required`);
        }
      }

      const updatedUser = await this.updateUserService.execute(
        httpRequest.body!
      );

      return ok(updatedUser);
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === 'User not found')
          return notFound('Usuário não encontrado');
      }

      return serverError();
    }
  }
}
