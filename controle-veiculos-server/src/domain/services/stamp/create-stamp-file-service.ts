import fs from 'fs';
import path from 'path';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

interface ICreateStampFileParams {
  number: number;
  rank: string;
  warName: string;
  SU: string;
  plate: string;
  type: string;
}

export class CreateStampFileService {
  execute(data: ICreateStampFileParams) {
    let content: any;

    if (data.type === 'Carro') {
      switch (data.SU) {
        case '6ºBIL':
          content = fs.readFileSync(
            path.resolve('./public/selos/carro', 'selo_carro_6bil_2024.docx'),
            'binary'
          );
          break;
        case 'Cia Cmdo':
          content = fs.readFileSync(
            path.resolve(
              './public/selos/carro',
              'selo_carro_ciacmdo_2024.docx'
            ),
            'binary'
          );
          break;
        case '12º Pel PE':
          content = fs.readFileSync(
            path.resolve(
              './public/selos/carro',
              'selo_carro_12pelpe_2024.docx'
            ),
            'binary'
          );
          break;
        case '12º Cia Com L':
          content = fs.readFileSync(
            path.resolve(
              './public/selos/carro',
              'selo_carro_12ciacom_2024.docx'
            ),
            'binary'
          );
          break;
        case 'Base':
          content = fs.readFileSync(
            path.resolve(
              './public/selos/carro',
              'selo_carro_ciacmdo_2024.docx'
            ),
            'binary'
          );
          break;
      }
    } else if (data.type === 'Moto') {
      switch (data.SU) {
        case '6ºBIL':
          content = fs.readFileSync(
            path.resolve('./public/selos/moto', 'selo_moto_6bil_2024.docx'),
            'binary'
          );
          break;
        case 'Cia Cmdo':
          content = fs.readFileSync(
            path.resolve('./public/selos/moto', 'selo_moto_ciacmdo_2024.docx'),
            'binary'
          );
          break;
        case '12º Pel PE':
          content = fs.readFileSync(
            path.resolve('./public/selos/moto', 'selo_moto_12pelpe_2024.docx'),
            'binary'
          );
          break;
        case '12º Cia Com L':
          content = fs.readFileSync(
            path.resolve('./public/selos/moto', 'selo_moto_12ciacom_2024.docx'),
            'binary'
          );
          break;
        case 'Base':
          content = fs.readFileSync(
            path.resolve('./public/selos/moto', 'selo_moto_ciacmdo_2024.docx'),
            'binary'
          );
          break;
      }
    } else {
      throw new Error('Tipo de veículo não identificado');
    }

    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {});

    doc.render({
      number: data.number.toString(),
      rank: data.rank,
      warName: data.warName.toUpperCase(),
      SU: data.SU.toUpperCase(),
      plate: data.plate.toUpperCase(),
    });

    const buf = doc.getZip().generate({
      type: 'nodebuffer',
      compression: 'DEFLATE',
    });

    if (data.type === 'Carro') {
      fs.writeFileSync(
        path.resolve(
          `./tmp/uploads/${
            String(data.rank).replace(/\s/g, '') +
            '-' +
            String(data.warName).replace(/\s/g, '')
          }`,
          `selo-carro-${
            data.number +
            '-' +
            String(data.rank).replace(/\s/g, '') +
            '-' +
            String(data.warName).replace(/\s/g, '')
          }.docx`
        ),
        buf
      );
    } else {
      fs.writeFileSync(
        path.resolve(
          `./tmp/uploads/${
            String(data.rank).replace(/\s/g, '') +
            '-' +
            String(data.warName).replace(/\s/g, '')
          }`,
          `selo-moto-${
            data.number +
            '-' +
            String(data.rank).replace(/\s/g, '') +
            '-' +
            String(data.warName).replace(/\s/g, '')
          }.docx`
        ),
        buf
      );
    }
  }
}
