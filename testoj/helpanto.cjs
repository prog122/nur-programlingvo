const assert = require('assert');
const { exec } = require("child_process");
const path = require('path');

const kunDosieroEligon = (dosiero, funkcio, nplDosiero) => {
  let komando = "node np-al-idvm.js -e " + dosiero;

  if (nplDosiero) {
    komando += " -l " + nplDosiero;
  }

  exec(komando, (error, stdout, stderr) => {
    if (error) {
      console.error(`Eraro: ${error.message}`);
      return;
    }

    funkcio(stdout);
  });
}

const asertiLaEligonDeLaIDVM = (dosierNomo, eligo, nplDosiero) => {
  kunDosieroEligon(dosierNomo, (ĉeno) => {
    if (ĉeno != eligo) {
      process.stdout.write("------\n")
      process.stdout.write(ĉeno);
      process.stdout.write("\n---\n")
      process.stdout.write(eligo)
      process.stdout.write("\n------\n")

      for (let i = 0;i < ĉeno.length;i++ ) {
        process.stdout.write("\\" + ĉeno.charCodeAt(i));
      }

      process.stdout.write("\n---\n")

      for (let i = 0;i < eligo.length;i++ ) {
        process.stdout.write("\\" + eligo.charCodeAt(i));
      }

      process.stdout.write("\n------\n")
    }

    assert.ok(ĉeno == eligo);
  }, nplDosiero)
};

const kunLaEligoDeLaKodoobjektoj = (dosiero, funkcio, nplDosiero) => {
  let komando = "node np-al-kodobjektoj.js " + dosiero;

  if (nplDosiero) {
    komando += " -l " + nplDosiero;
  }

  exec(komando, (error, stdout, stderr) => {
    if (error) {
      console.error(`Eraro: ${error.message}`);
      return;
    }

    funkcio(stdout.trim());
  });
}

const asertiLaEligonDeLaKodoobjektoj = (dosiero, eligo, nplDosiero) => {
  kunLaEligoDeLaKodoobjektoj(dosiero, (ĉeno) => {
    if (ĉeno != eligo) {
      process.stdout.write("------\n")
      process.stdout.write(ĉeno);
      process.stdout.write("\n---\n")
      process.stdout.write(eligo)
      process.stdout.write("\n------\n")

      for (let i = 0;i < ĉeno.length;i++ ) {
        process.stdout.write("\\" + ĉeno.charCodeAt(i));
      }

      process.stdout.write("\n---\n")

      for (let i = 0;i < eligo.length;i++ ) {
        process.stdout.write("\\" + eligo.charCodeAt(i));
      }

      process.stdout.write("\n------\n")
    }
    
    assert.ok(ĉeno == eligo);
  }, nplDosiero);
}

const kunLaEligoDeLaProgramo = (dosiero, funkcio, nplDosiero) => {
  let komando = "node np-interpretisto.js " + dosiero;

  if (nplDosiero) {
    komando += " -l " + nplDosiero;
  }

  exec(komando, (error, stdout, stderr) => {
    if (error) {
      console.error(`Eraro: ${error.message}`);
      return;
    }

    funkcio(stdout);
  });
}

const asertiLaEligonDeLaProgramo = (dosierNomo, eligo, nplDosiero) => {
  kunLaEligoDeLaProgramo(dosierNomo, (ĉeno) => {
    if (ĉeno != eligo) {
      process.stdout.write("---\n")
      process.stdout.write(ĉeno);
      process.stdout.write("\n---\n")
      process.stdout.write(eligo)
      process.stdout.write("\n---\n")
    }

    assert.ok(ĉeno == eligo);
  }, nplDosiero)
}

const aserti = assert.ok;

module.exports.asertiLaEligonDeLaIDVM = asertiLaEligonDeLaIDVM;
module.exports.asertiLaEligonDeLaProgramo = asertiLaEligonDeLaProgramo;
module.exports.asertiLaEligonDeLaKodoobjektoj = asertiLaEligonDeLaKodoobjektoj;
module.exports.aserti = assert.ok;
