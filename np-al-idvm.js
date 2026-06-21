const fs = require("fs");
const path = require('path');
const kerno = require('./kerno.js');

const argumentoj = process.argv.slice(2);
const dosieroj = [];

let eligi = false;

for( let i=0;i < argumentoj.length;i++ ) {
  if (argumentoj[i] == '-e') {
    eligi = true;
  } else {
    dosieroj.push(argumentoj[i]);
  }
}

if (dosieroj.length == 0) {
  process.stdout.write("Uzado: node np-al-idvm.js <vojo al dosiero>")
  process.stdout.write("\npor konverti np-dosieron al koda dosiero .idvm")
  process.stdout.write("\n\nnode np-al-idvm.js -e <vojo al dosiero>\npor eligi instrukcioj")
  process.exit();
}

const translaciDosieron = (dosiero) => {
  fs.readFile(dosiero, "utf8", (eraro, datumoj) => {
    if (eraro) {
      console.error("Eraro ĉe legado de dosiero:", eraro);
      return;
    }

    let eligo = "";

    const kodajPecoj = kerno.legFunkcio(datumoj);
    const instrukcioj = kerno.transformiKodonEnInstrukciojn(kodajPecoj);

    instrukcioj.map((instrukcio) => {
      eligo += instrukcio.join(" ") + "\n";
    });

    if (eligi) {
      process.stdout.write(eligo);
    } else {
      const parsita = path.parse(dosiero);

      if (parsita.ext != '.np') {
        throw 'Nur .np dosieroj estas subtenataj';
      }

      const novaDosiero = parsita.dir + path.sep + parsita.name + ".idvm";

      process.stdout.write('Ni elsendas ' + novaDosiero);

      fs.writeFile(novaDosiero, eligo, (eraro) => {
        if (eraro) {
          console.error("Eraro:", eraro);
          return;
        }
      });
    }
  });
}

translaciDosieron(dosieroj[0]);
