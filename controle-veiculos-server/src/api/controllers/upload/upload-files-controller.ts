import path from 'path';
import { IUploadFiles } from './protocols';
import { notFound, ok, serverError, unprocessable } from '../helpers';
import { HttpRequest, HttpResponse, IController } from '../protocols';
import { UploadService } from '@/src/domain/services/upload/upload-service';

export class UploadFilesController implements IController {
  constructor(private readonly uploadService: UploadService) {}

  async handle(
    httpRequest: HttpRequest<IUploadFiles>
  ): Promise<HttpResponse<unknown>> {
    try {
      const requiredFields = ['warName', 'rank', 'userId'];

      for (const field of requiredFields) {
        if (!httpRequest.body?.[field as keyof IUploadFiles]?.length) {
          return unprocessable(`Field {${field}} is required`);
        }
      }

      const filesPath = [] as string[];

      Array.prototype.forEach.call(httpRequest.files, function (file) {
        filesPath.push(
          path.resolve(
            `D:/controle-veiculos-selo/controle-veiculos-server/tmp/uploads/${
              String(httpRequest.body!.rank).replace(/\s/g, '') +
              '-' +
              String(httpRequest.body!.warName).replace(/\s/g, '')
            }/${
              String(httpRequest.body!.rank).replace(/\s/g, '') +
              '-' +
              String(httpRequest.body!.warName).replace(/\s/g, '') +
              '-' +
              String(file.originalname).replace(/\s/g, '')
            }`
          )
        );
      });

      await this.uploadService.execute(httpRequest.body!.userId, filesPath);

      return ok({
        userId: httpRequest.body!.userId,
        warName: httpRequest.body!.warName,
        rank: httpRequest.body!.rank,
        files: filesPath,
      });
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === 'Usuário não encontrado')
          return notFound(err.message);
      }
      return serverError();
    }
  }
}
