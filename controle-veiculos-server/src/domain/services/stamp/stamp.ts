import fs from 'fs';
import path from 'path';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

export class Sta {
  execute() {
    for (let i = 0; i < 101; ) {
      const content = fs.readFileSync(
        path.resolve('./public/selos', 'CRACHA-VISITANTE-VEICULO.docx'),
        'binary'
      );

      const zip = new PizZip(content);

      const doc = new Docxtemplater(zip, {});

      doc.render({
        number0: i + 1,
        number1: i + 2,
        number2: i + 3,
        number3: i + 4,
      });

      const buf = doc.getZip().generate({
        type: 'nodebuffer',
        compression: 'DEFLATE',
      });

      fs.writeFileSync(
        path.resolve(`./tmp/uploads/crachas`, `cracha-visitante-${i}.docx`),
        buf
      );

      i = i + 4;
    }
  }
}
