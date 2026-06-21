const fs = require("fs");
const path = require('path');
const kerno = require('./kerno.js');
const vmKerno = require('./vm/virtmaŝ/kerno.js');

const argumentoj = process.argv.slice(2);
const dosieroj = argumentoj;

if (dosieroj.length == 0) {
  process.stdout.write("Uzado: node np-interpretisto.js <vojo al dosiero>")
  process.stdout.write("\npor por lanĉi dosieron")
  process.exit();
}

const plenumiDosieron = (dosiero) => {
  fs.readFile(dosiero, "utf8", (eraro, datumoj) => {
    if (eraro) {
      console.error("Eraro ĉe legado de dosiero:", eraro);
      return;
    }

    const kodajPecoj = kerno.legFunkcio(datumoj);
    const instrukcioj = kerno.transformiKodonEnInstrukciojn(kodajPecoj);

    vmKerno.plenumiOperaciojn2(instrukcioj);
  });
}

plenumiDosieron(dosieroj[0]);
