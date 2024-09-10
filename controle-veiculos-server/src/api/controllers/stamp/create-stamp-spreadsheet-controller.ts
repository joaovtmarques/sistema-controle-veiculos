import { CreateStampSpreadsheetService } from '@/src/domain/services/stamp/create-stamp-spreadsheet-service';

export class CreateStampSpreadsheetController {
  constructor(
    private readonly createStampSpreadsheetService: CreateStampSpreadsheetService
  ) {}

  handle() {
    this.createStampSpreadsheetService.create();
  }
}
