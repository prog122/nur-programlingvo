const fs = require("fs");
const path = require('path');
const kerno = require('./kerno.js');
const vmKerno = require('./vm/virtmaŝ/kerno.js');

const argumentoj = process.argv.slice(2);
const dosieroj = [];
let npl = null, nplIndekso = -1, npil = null, npilIndekso = -1;

for( let i=0;i < argumentoj.length;i++ ) {
  if (argumentoj[i] == '-l' && argumentoj[i + 1]) {
    npl = argumentoj[i + 1];
    nplIndekso = i;
  } else if (argumentoj[i] == '-npil' && argumentoj[i+1]) {
    npil = argumentoj[i + 1];
    nplIndekso = i;
  }
}

for( let i=0;i < argumentoj.length;i++ ) {
  if ((nplIndekso == -1 || (i != nplIndekso && i != nplIndekso + 1)) && (npilIndekso == -1 || (i != npilIndeksoe && i != npilIndekso + 1))) {
    dosieroj.push(argumentoj[i]);
  }
}

if (dosieroj.length == 0) {
  process.stdout.write("Uzado: node np-interpretisto.js <vojo al dosiero>")
  process.stdout.write("\npor por lanĉi dosieron")
  process.stdout.write("\n\nnode np-interpretisto.js -l <vojo al NPL dosiero> <vojo al dosiero>\npor eligi tradukita instrukcioj (NPL)")
  process.stdout.write("\n\nnode np-interpretisto.js -npil <vojo al NPIL dosiero> <vojo al dosiero>\npor eligi tradukita instrukcioj (NPIL)")
  process.exit();
}

const plenumiDosieron = (dosiero) => {
  fs.readFile(dosiero, "utf8", (eraro, datumoj) => {
    if (eraro) {
      console.error("Eraro ĉe legado de dosiero:", eraro);
      return;
    }

    const nplTabelo = npl ? kerno.legiLaTabelonNPL(npl) : null;
    const npilTabelo = npil ? kerno.legiLaTabelonNPIL(npil) : {};
    const kodajPecoj = kerno.legFunkcio(datumoj);
    const instrukcioj = kerno.transformiKodonEnInstrukciojn(kerno.tradukiKomandojn(kodajPecoj, nplTabelo), npilTabelo);

    vmKerno.plenumiOperaciojn2(instrukcioj, npilTabelo);
  });
}

plenumiDosieron(dosieroj[0]);
