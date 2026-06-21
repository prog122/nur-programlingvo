const fs = require("fs");
const path = require('path');
const kerno = require('./kerno.js');
const vmKerno = require('./vm/virtmaŝ/kerno.js');

const argumentoj = process.argv.slice(2);
const dosieroj = [];
let npl = null, nplIndekso = -1;

for( let i=0;i < argumentoj.length;i++ ) {
  if (argumentoj[i] == '-l' && argumentoj[i + 1]) {
    npl = argumentoj[i + 1];
    nplIndekso = i;
  } else if (nplIndekso == -1 || i != nplIndekso + 1) {
    dosieroj.push(argumentoj[i]);
  }
}

if (dosieroj.length == 0) {
  process.stdout.write("Uzado: node np-kodoobjektoj.js <vojo al dosiero>")
  process.stdout.write("\npor eligo de kodo kiel objekto")
  process.stdout.write("\n\nnode np-al-kodoobjektoj.js -l <vojo al NPL dosiero> <vojo al dosiero>\npor eligi tradukita instrukcioj")
  process.exit();
}

const plenumiDosieron = (dosiero) => {
  fs.readFile(dosiero, "utf8", (eraro, datumoj) => {
    if (eraro) {
      console.error("Eraro ĉe legado de dosiero:", eraro);
      return;
    }

    const nplTabelo = npl ? kerno.legiLaTabelonNPL(npl) : null;
    const kodajPecoj = kerno.tradukiKomandojn(kerno.legFunkcio(datumoj), nplTabelo);
    console.dir(kodajPecoj, { depth: null });
  });
}

plenumiDosieron(dosieroj[0]);
