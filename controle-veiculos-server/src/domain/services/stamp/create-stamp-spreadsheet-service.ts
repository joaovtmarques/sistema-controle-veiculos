import path from 'path';
import exceljs from 'exceljs';

import { ICreateStampSpreadsheetParams } from '@/src/api/controllers/stamp';

export class CreateStampSpreadsheetService {
  execute(data: ICreateStampSpreadsheetParams) {
    const workbook = new exceljs.Workbook();

    workbook.xlsx
      .readFile(path.resolve('./public/', 'controle-veiculos.xlsx'))
      .then(function () {
        const worksheet = workbook.getWorksheet('Controle Veículos');
        const lastRow = worksheet!.lastRow;
        // eslint-disable-next-line no-var
        var lastRowNum = lastRow?.number;
        const getRowInsert = worksheet!.getRow(++lastRowNum!);
        getRowInsert.getCell('A').value = data.number;
        getRowInsert.getCell('B').value = data.name.toUpperCase();
        getRowInsert.getCell('C').value = data.warName.toUpperCase();
        getRowInsert.getCell('D').value = data.rank.toUpperCase();
        getRowInsert.getCell('E').value = data.SU.toUpperCase();
        getRowInsert.getCell('F').value = data.phoneNumber.toUpperCase();
        getRowInsert.getCell('G').value = data.type.toUpperCase();
        getRowInsert.getCell('H').value = data.model.toUpperCase();
        getRowInsert.getCell('I').value = data.color.toUpperCase();
        getRowInsert.getCell('J').value = data.plate.toUpperCase();
        getRowInsert.getCell('K').value = data.lic.toUpperCase();
        getRowInsert.getCell('L').value = data.hab.toUpperCase();

        getRowInsert.getCell('A').style = {
          font: {
            bold: false,
          },
        };
        getRowInsert.getCell('B').style = {
          font: {
            bold: false,
          },
        };
        getRowInsert.getCell('C').style = {
          font: {
            bold: false,
          },
        };
        getRowInsert.getCell('D').style = {
          font: {
            bold: false,
          },
        };
        getRowInsert.getCell('E').style = {
          font: {
            bold: false,
          },
        };
        getRowInsert.getCell('F').style = {
          font: {
            bold: false,
          },
        };
        getRowInsert.getCell('G').style = {
          font: {
            bold: false,
          },
        };
        getRowInsert.getCell('H').style = {
          font: {
            bold: false,
          },
        };
        getRowInsert.getCell('I').style = {
          font: {
            bold: false,
          },
        };
        getRowInsert.getCell('J').style = {
          font: {
            bold: false,
          },
        };
        getRowInsert.getCell('K').style = {
          font: {
            bold: false,
          },
        };
        getRowInsert.getCell('L').style = {
          font: {
            bold: false,
          },
        };
        getRowInsert.commit();
        return workbook.xlsx.writeFile(
          path.resolve('./public/', 'controle-veiculos.xlsx')
        );
      });
  }

  create() {
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Controle Veículos');

    worksheet.columns = [
      {
        header: 'NÚMERO',
        key: '',
        style: {
          font: {
            bold: true,
          },
        },
      },
      {
        header: 'NOME COMPLETO',
        key: '',
        width: 25,
        style: {
          font: {
            bold: true,
          },
        },
      },
      {
        header: 'NOME DE GUERRA',
        key: '',
        width: 20,
        style: {
          font: {
            bold: true,
          },
        },
      },
      {
        header: 'GRADUAÇÃO',
        key: '',
        width: 15,
        style: {
          font: {
            bold: true,
          },
        },
      },
      {
        header: 'CIA',
        key: '',
        style: {
          font: {
            bold: true,
          },
        },
      },
      {
        header: 'TELEFONE',
        key: '',
        width: 15,
        style: {
          font: {
            bold: true,
          },
        },
      },
      {
        header: 'VEÍCULO',
        key: '',
        style: {
          font: {
            bold: true,
          },
        },
      },
      {
        header: 'MODELO',
        key: '',
        width: 25,
        style: {
          font: {
            bold: true,
          },
        },
      },
      {
        header: 'COR',
        key: '',
        width: 15,
        style: {
          font: {
            bold: true,
          },
        },
      },
      {
        header: 'PLACA',
        key: '',
        width: 15,
        style: {
          font: {
            bold: true,
          },
        },
      },
      {
        header: 'LIC.',
        key: '',
        style: {
          font: {
            bold: true,
          },
        },
      },
      {
        header: 'VENC. HAB.',
        key: '',
        width: 15,
        style: {
          font: {
            bold: true,
          },
        },
      },
    ];

    workbook.xlsx.writeFile(
      path.resolve('./public/', 'controle-veiculos.xlsx')
    );
  }
}
