const assert = require('assert');
const { exec } = require("child_process");
const path = require('path');

const kunDosieroEligon = (dosiero, funkcio) => {
  exec("node np-al-idvm.js -e " + dosiero, (error, stdout, stderr) => {
    if (error) {
      console.error(`Eraro: ${error.message}`);
      return;
    }

    funkcio(stdout);
  });
}

const asertiLaEligonDeLaIDVM = (dosierNomo, eligo) => {
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
  })
};

const kunLaEligoDeLaKodoobjektoj = (dosiero, funkcio) => {
  exec("node np-al-kodobjektoj.js " + dosiero, (error, stdout, stderr) => {
    if (error) {
      console.error(`Eraro: ${error.message}`);
      return;
    }

    funkcio(stdout.trim());
  });
}

const asertiLaEligonDeLaKodoobjektoj = (dosiero, eligo) => {
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
  });
}

const kunLaEligoDeLaProgramo = (dosiero, funkcio) => {
  exec("node np-interpretisto.js " + dosiero, (error, stdout, stderr) => {
    if (error) {
      console.error(`Eraro: ${error.message}`);
      return;
    }

    funkcio(stdout);
  });
}

const asertiLaEligonDeLaProgramo = (dosierNomo, eligo) => {
  kunLaEligoDeLaProgramo(dosierNomo, (ĉeno) => {
    if (ĉeno != eligo) {
      process.stdout.write("---\n")
      process.stdout.write(ĉeno);
      process.stdout.write("\n---\n")
      process.stdout.write(eligo)
      process.stdout.write("\n---\n")
    }

    assert.ok(ĉeno == eligo);
  })
}

const aserti = assert.ok;

module.exports.asertiLaEligonDeLaIDVM = asertiLaEligonDeLaIDVM;
module.exports.asertiLaEligonDeLaProgramo = asertiLaEligonDeLaProgramo;
module.exports.asertiLaEligonDeLaKodoobjektoj = asertiLaEligonDeLaKodoobjektoj;
module.exports.aserti = assert.ok;
