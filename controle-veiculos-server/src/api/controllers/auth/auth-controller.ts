import { AuthRequest } from './protocols';
import { ok, serverError, unprocessable } from '../helpers';
import { AuthService } from '@/src/domain/services/auth/auth-service';
import { HttpRequest, HttpResponse, IController } from '../protocols';

export class AuthController implements IController {
  constructor(private readonly authService: AuthService) {}

  async handle(
    httpRequest: HttpRequest<AuthRequest>
  ): Promise<HttpResponse<unknown>> {
    try {
      const requiredFields = ['email', 'password'];

      for (const field of requiredFields) {
        if (!httpRequest.body?.[field as keyof AuthRequest]?.length) {
          return unprocessable(`Field {${field}} is required`);
        }
      }

      const token = await this.authService.execute(httpRequest.body!);

      return ok(token);
    } catch (err) {
      if (err instanceof Error) {
        return unprocessable('E-mail ou senha incorretos');
      }

      return serverError();
    }
  }
}
