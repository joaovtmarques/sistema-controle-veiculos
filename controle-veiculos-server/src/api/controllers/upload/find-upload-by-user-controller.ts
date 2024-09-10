import { HttpRequest, HttpResponse, IController } from '../protocols';
import { notFound, ok, serverError, unprocessable } from '../helpers';
import { FindUploadByUserService } from '@/src/domain/services/upload/find-upload-by-user-service';

interface IFindUpload {
  userId?: string;
}

export class FindUploadByUserController implements IController {
  constructor(
    private readonly findUploadByUserIdService: FindUploadByUserService
  ) {}

  async handle(
    httpRequest: HttpRequest<IFindUpload>
  ): Promise<HttpResponse<unknown>> {
    try {
      if (!httpRequest.body!.userId) {
        return unprocessable('O campo {userId} é necessário');
      }

      return ok(
        await this.findUploadByUserIdService.execute(httpRequest.body!.userId)
      );
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === 'Usuário não encontrado')
          return notFound(err.message);
      }
      return serverError();
    }
  }
}
