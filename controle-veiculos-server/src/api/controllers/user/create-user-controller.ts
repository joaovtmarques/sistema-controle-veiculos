import { ICreateUserParams } from './protocols';
import { created, serverError, unprocessable } from '../helpers';
import { HttpRequest, HttpResponse, IController } from '../protocols';
import { CreateUserService } from '@/src/domain/services/user/create-user-service';

export class CreateUserController implements IController {
  constructor(private readonly createUserService: CreateUserService) {}

  async handle(
    httpRequest: HttpRequest<ICreateUserParams>
  ): Promise<HttpResponse<string>> {
    try {
      const requiredFields = ['name', 'warName', 'rank', 'phoneNumber', 'SU'];

      for (const field of requiredFields) {
        if (!httpRequest.body?.[field as keyof ICreateUserParams]?.length) {
          return unprocessable(`Field {${field}} is required`);
        }
      }

      const user = await this.createUserService.execute(httpRequest.body!);

      return created(user);
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === 'User is already registered')
          return unprocessable('Usuário já cadastrado');
      }
      return serverError();
    }
  }
}
