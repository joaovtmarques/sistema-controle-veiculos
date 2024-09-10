import fs from 'fs';
import path from 'path';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

import { ICreateFormParams } from './protocols';

export class CreateFormService {
  execute(data: ICreateFormParams) {
    const content = fs.readFileSync(
      path.resolve('./public/', 'formulario-controle.docx'),
      'binary'
    );

    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {});

    doc.render({
      name: data.name.toUpperCase(),
      phoneNumber: data.phoneNumber,
      rank: data.rank,
      warName: data.warName.toUpperCase(),
      SU: data.SU.toUpperCase(),
      vehicle: data.vehicle.toUpperCase(),
      model: data.model.toUpperCase(),
      plate: data.plate.toUpperCase(),
      color: data.color.toUpperCase(),
    });

    const buf = doc.getZip().generate({
      type: 'nodebuffer',
      compression: 'DEFLATE',
    });

    fs.writeFileSync(
      path.resolve(
        `./tmp/uploads/${
          String(data.rank).replace(/\s/g, '') +
          '-' +
          String(data.warName).replace(/\s/g, '')
        }`,
        `formulario-controle-${
          String(data.rank).replace(/\s/g, '') +
          '-' +
          String(data.warName).replace(/\s/g, '') +
          Math.random()
        }.docx`
      ),
      buf
    );
  }
}
