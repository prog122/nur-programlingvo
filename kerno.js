import { verkiloDeKodoobjektoj } from './verkilo-de-kodoobjektoj.js';
import fs from 'fs';

const vera = true, malvera = false;

//const verkiloDeKodoobjektoj = require('verkilo-de-kodoobjektoj.js').verkiloDeKodoobjektoj;

const simbolojDeBloko = [
  ['(', ')'],
  ['{', '}'],
  ['<', '>'],
  ['"', '"', {
    postproceso: (ĉeno) => {
      return ĉeno.slice(1, -1);
    }
  }],
  ["'", "'"]
];

const estasKomencoDeBloko = (ĉeno, i) => {
  return ĉeno[i] != ' ';
};

const estasFinoDeBloko = (ĉeno, i, komencoIndekso, komencoDatumo, serĉanteInfanojn) => {
  if (komencoDatumo.finaSymbolo) {
    if (komencoDatumo.finasSymbolo == ĉeno[i]) {
      return true;
    }
  }

  let estasFinita = i == ĉeno.length - 1;
  if (!estasFinita && serĉanteInfanojn) {
    return ĉeno[i + 1] == ' ';
  }

  return estasFinita;
};

const finoDeBlokoDatumo = (ĉeno, i, komencoIndekso, komencoDatumo) => {
  return {
    ĉeno: ĉeno.slice(komencoIndekso, i + 1),
    komencoIndekso: komencoIndekso,
    finoIndekso: i + 1,
    komencoDatumo: komencoDatumo
  };
}

const ekstraktiLaSekvanKodajPeco = (ĉeno, serĉanteInfanojn = false) => {
  let komencoIndekso = -1;
  let komencoDatumo = {};
  
  for (let i=0;i < ĉeno.length;i++) {
    if (komencoIndekso == -1 && estasKomencoDeBloko(ĉeno, i)) {
      komencoIndekso = i;
      komencoDatumo = {
        finaSymbolo: null
      };
      simbolojDeBloko.map((datumo) => {
        let [komencoS, finoS] = datumo;

        if (ĉeno[i] == komencoS) {
          komencoDatumo.finaSymbolo = finoS
        }
      });
    }

    if (estasFinoDeBloko(ĉeno, i, komencoIndekso, komencoDatumo, serĉanteInfanojn)) {
      let datumo = finoDeBlokoDatumo(ĉeno, i, komencoIndekso, komencoDatumo);
      return datumo;
    }
  }
};

const komencoFinoLegFunkcio = (ĉeno, serĉanteInfanojn = false, gepatro = {}) => {
  ĉeno = ĉeno.trim();

  let finita = ĉeno.length == 0;
  let indekso = 0;

  const kodajPecoj = [];
  let kodajPeco = null;

  while (!finita) {
    kodajPeco = ekstraktiLaSekvanKodajPeco(ĉeno.slice(indekso), serĉanteInfanojn, gepatro);
    kodajPecoj.push(kodajPeco);

    indekso += kodajPeco.finoIndekso;
    indekso ++;

    finita = typeof(ĉeno[indekso]) == 'undefined';
  }

  return kodajPecoj;
};

const postproceso = (kodajPeco) => {
  if (kodajPeco.komencoDatumo.finaSymbolo) {
    let finaSymboloEl = simbolojDeBloko.find((el) => {
      return el[0] == kodajPeco.komencoDatumo.finaSymbolo;
    });

    if (finaSymboloEl[2] && finaSymboloEl[2].postproceso) {
      kodajPeco.ĉeno = finaSymboloEl[2].postproceso(kodajPeco.ĉeno);
    }
  }

  if (kodajPeco.infanojn) {
    kodajPeco.infanojn = kodajPeco.infanojn.map(postproceso);
  }

  return kodajPeco;
};

const kodopecoEnObjekto = (kodopeco) => {
  if (kodopeco.infanojn) {
    return {
      'tipo': 'listo',
      'infanojn': kodopeco.infanojn.map(kodopecoEnObjekto)
    }
  }

  return {
    'tipo': 'datumo',
    'valoro': kodopeco.ĉeno
  };
};

const legFunkcio = (ĉeno) => {
  let kodajPecoj = komencoFinoLegFunkcio(ĉeno);
  kodajPecoj.map(kodajPeco => {
    kodajPeco.infanojn = komencoFinoLegFunkcio(kodajPeco.ĉeno, true, kodajPeco);
  });

  kodajPecoj = kodajPecoj.map(postproceso);

  kodajPecoj = kodajPecoj.map(kodopecoEnObjekto);
  
  return kodajPecoj;
}

const transformiKodonEnInstrukciojn = (kodajPecoj, npilTabelo = {}) => {
  const instrukcioj = kodajPecoj.map(verkiloDeKodoobjektoj);

  instrukcioj.push(['revena']);

  return instrukcioj.map(instrukcio => {
    if (npilTabelo[instrukcio[0]]) {
      instrukcio[0] = npilTabelo[instrukcio[0]];
    }

    return instrukcio;
  });
}

const legiLaTabelonNPL = (dosiero) => {
  let tabelo = {};

  try {
    let datumoj = fs.readFileSync(dosiero, "utf8").trim();
    datumoj.split("\n").map(linio => {
      let [valoro, ŝlosilo] = linio.trim().split(" ");
      tabelo[ŝlosilo] = valoro;
    });
  } catch(eraro) {
    if (eraro) {
      console.error("Eraro ĉe legado de dosiero:", eraro);
      return null;
    }
  }

  return tabelo;
};

const legiLaTabelonNPIL = (dosiero) => {
  let tabelo = {};

  try {
    let datumoj = fs.readFileSync(dosiero, "utf8").trim();
    datumoj.split("\n").map(linio => {
      let [ŝlosilo, valoro] = linio.trim().split(" ");
      tabelo[ŝlosilo] = valoro;
    });
  } catch(eraro) {
    if (eraro) {
      console.error("Eraro ĉe legado de dosiero:", eraro);
      return null;
    }
  }

  return tabelo;
};

const tradukiKomandojn = (komandojn, npl) => {
  if (!npl) {
    return komandojn;
  }

  return komandojn.map(komando => {
    if (komando.tipo == 'listo') {
      komando.infanojn = tradukiKomandojn(komando.infanojn, npl);
      if (npl[komando.infanojn[0].valoro]) {
        komando.infanojn[0].valoro = npl[komando.infanojn[0].valoro];
      }
    }

    return komando;
  });
};

export { legFunkcio, transformiKodonEnInstrukciojn, legiLaTabelonNPL, legiLaTabelonNPIL, tradukiKomandojn };
