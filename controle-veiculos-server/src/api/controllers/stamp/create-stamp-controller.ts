import { ICreateStampParams } from './protocols';
import { HttpRequest, HttpResponse, IController } from '../protocols';
import { created, notFound, serverError, unprocessable } from '../helpers';
import { CreateStampService } from '@/src/domain/services/stamp/create-stamp-service';
import { CreateStampSpreadsheetService } from '@/src/domain/services/stamp/create-stamp-spreadsheet-service';
// import { Sta } from '@/src/domain/services/stamp/stamp';

export class CreateStampController implements IController {
  constructor(
    private readonly createStampService: CreateStampService,
    private readonly createStampSpreadsheetService: CreateStampSpreadsheetService
  ) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<unknown>> {
    try {
      const requiredFields = ['userId', 'vencHab', 'lic', 'vehicleId'];

      for (const field of requiredFields) {
        if (!httpRequest.body?.[field as keyof ICreateStampParams]?.length) {
          return unprocessable(`Field {${field}} is required`);
        }
      }

      const stamp = await this.createStampService.execute(httpRequest.body);

      this.createStampSpreadsheetService.execute({
        number: stamp.number,
        name: stamp.user!.name,
        rank: stamp.user!.rank,
        warName: stamp.user!.warName,
        SU: stamp.user!.SU,
        phoneNumber: stamp.user!.phoneNumber,
        type: stamp.vehicle!.type,
        model: stamp.vehicle!.model,
        color: stamp.vehicle!.color,
        plate: stamp.vehicle!.plate,
        lic: httpRequest.body.lic,
        hab: httpRequest.body.vencHab,
      });

      return created(stamp);
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === 'User not found')
          return notFound('Usuário não encontrado');
        if (err.message === 'A stamp with this plate is already registered')
          return unprocessable('Um selo para este veículo já está cadastrado');
        if (err.message === 'Vehicle not found')
          return notFound('O veículo não foi encontrado');
      }
      return serverError();
    }

    // const file = new Sta();
    // file.execute();

    // return created('ok');
  }
}
