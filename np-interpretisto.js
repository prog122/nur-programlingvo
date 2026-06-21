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
  process.stdout.write("Uzado: node np-interpretisto.js <vojo al dosiero>")
  process.stdout.write("\npor por lanĉi dosieron")
  process.stdout.write("\n\nnode np-interpretisto.js -l <vojo al NPL dosiero> <vojo al dosiero>\npor eligi tradukita instrukcioj")
  process.exit();
}

const plenumiDosieron = (dosiero) => {
  fs.readFile(dosiero, "utf8", (eraro, datumoj) => {
    if (eraro) {
      console.error("Eraro ĉe legado de dosiero:", eraro);
      return;
    }

    const nplTabelo = npl ? kerno.legiLaTabelonNPL(npl) : null;
    const kodajPecoj = kerno.legFunkcio(datumoj);
    const instrukcioj = kerno.transformiKodonEnInstrukciojn(kerno.tradukiKomandojn(kodajPecoj, nplTabelo));

    vmKerno.plenumiOperaciojn2(instrukcioj);
  });
}

plenumiDosieron(dosieroj[0]);
