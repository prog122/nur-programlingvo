const fs = require("fs");
const path = require('path');
const kerno = require('./kerno.js');

const argumentoj = process.argv.slice(2);
const dosieroj = [];

let eligi = false, npl = null, nplIndekso = -1, npil = null, npilIndekso = -1;

for( let i=0;i < argumentoj.length;i++ ) {
  if (argumentoj[i] == '-l' && argumentoj[i + 1]) {
    npl = argumentoj[i + 1];
    nplIndekso = i;
  } else if (argumentoj[i] == '-npil') {
    npil = argumentoj[i + 1];
    npilIndekso = i;
  }
}

for( let i=0;i < argumentoj.length;i++ ) {
  if (argumentoj[i] == '-e') {
    eligi = true;
  } else if ((nplIndekso == -1 || i != nplIndekso && i != nplIndekso + 1) && (npilIndekso == -1 || i != npilIndekso && i != npilIndekso + 1)) {
    dosieroj.push(argumentoj[i]);
  }
}

if (dosieroj.length == 0) {
  process.stdout.write("Uzado: node np-al-idvm.js <vojo al dosiero>")
  process.stdout.write("\npor konverti np-dosieron al koda dosiero .idvm")
  process.stdout.write("\n\nnode np-al-idvm.js -e <vojo al dosiero>\npor eligi instrukcioj")
  process.stdout.write("\n\nnode np-al-idvm.js -l <vojo al NPL dosiero> <vojo al dosiero>\npor eligi tradukita instrukcioj (NPL)")
  process.stdout.write("\n\nnode np-al-idvm.js -npil <vojo al NPIL dosiero> <vojo al dosiero>\npor eligi tradukita instrukcioj (NPIL)")
  process.exit();
}

const translaciDosieron = (dosiero) => {
  fs.readFile(dosiero, "utf8", (eraro, datumoj) => {
    if (eraro) {
      console.error("Eraro ĉe legado de dosiero:", eraro);
      return;
    }

    const nplTabelo = npl ? kerno.legiLaTabelonNPL(npl) : null;
    const npilTabelo = npil ? kerno.legiLaTabelonNPIL(npil) : {};
    let eligo = "";

    const kodajPecoj = kerno.tradukiKomandojn(kerno.legFunkcio(datumoj), nplTabelo);
    const instrukcioj = kerno.transformiKodonEnInstrukciojn(kodajPecoj, npilTabelo);

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
