import { verkiloDeKodoobjektoj } from './verkilo-de-kodoobjektoj.js';
import fs from 'fs';

const vera = true, malvera = false;

const simbolojDeBloko = [
  ['(', ')', {
    estasKodbloko: true,
    postproceso: (ĉeno) => {
      return ĉeno.slice(1, -1);
    }
  }],
  ['{', '}', {
    estasKodbloko: true
  }],
  ['<', '>', {
    estasKodbloko: true
  }],
  ['"', '"', {
    postproceso: (ĉeno) => {
      return ĉeno.slice(1, -1);
    }
  }],
  ["'", "'"]
];

// @g
// Kontrolo ĉu objekto estas malplena en JavaScript
function estasMalplena(objekto) {
  return Object.keys(objekto).length === 0;
}

const estasKomencoDeBloko = (ĉeno, i) => {
  return ĉeno[i] != ' ';
};

const estasFinoDeBloko = (ĉeno, i, komencoIndekso, komencoDatumo, serĉanteInfanojn, antaŭaPecoDeKodo) => {
  if (i != komencoIndekso && komencoDatumo.finaSymbolo) {
    if (komencoDatumo.finaSymbolo == ĉeno[i]) {
      return true;
    }
  }

  let estasFinita = i == ĉeno.length - 1;
  if (!estasFinita && serĉanteInfanojn) {
    estasFinita = ((estasMalplena(antaŭaPecoDeKodo) || antaŭaPecoDeKodo.kodoKomenciĝis) && ĉeno[i + 1] == ' ' && !komencoDatumo.finaSymbolo)
      || ((ĉeno[i] != ' ')
          && !!simbolojDeBloko.find((tabelo) => {
            return tabelo[2] && tabelo[2].estasKodbloko && tabelo[0] == ĉeno[i + 1];
          }));
  }

  return estasFinita;
};

const finoDeBlokoDatumo = (ĉeno, i, komencoIndekso, komencoDatumo, antaŭaPecoDeKodo) => {
  let normalaVokadaNotacio = !!simbolojDeBloko.find((tabelo) => {
    return tabelo[2] && tabelo[2].estasKodbloko && tabelo[0] == ĉeno[i + 1];
  });

  const rezultaĈeno = ĉeno.slice(komencoIndekso, i + 1);
  return {
    ĉeno: rezultaĈeno,
    komencoIndekso: komencoIndekso,
    finoIndekso: i + 1,
    komencoDatumo: komencoDatumo,
    normalaVokadaNotacio: normalaVokadaNotacio,
    estasKomencaElemento: estasMalplena(antaŭaPecoDeKodo),
    kodoKomenciĝis: antaŭaPecoDeKodo.kodoKomenciĝis || ĉeno[komencoIndekso] == '"',
    estasAtomara:
      antaŭaPecoDeKodo.normalaVokadaNotacio
        ? (rezultaĈeno[0] == '(' && rezultaĈeno[rezultaĈeno.length - 1] == ')' && rezultaĈeno.slice(1, -1).indexOf('(') == -1)
        : (estasMalplena(antaŭaPecoDeKodo) ? rezultaĈeno.indexOf(' ') == -1 && rezultaĈeno.indexOf('(') == -1 :  rezultaĈeno.indexOf('(') == -1)
  };
}

const ekstraktiLaSekvanKodajPeco = (ĉeno, serĉanteInfanojn = false, gepatro = {}, antaŭaPecoDeKodo = {}) => {
  let komencoIndekso = -1;
  let komencoDatumo = {};
  let internaBloknombro = 0;

  for (let i=0;i < ĉeno.length;i++) {
    if (komencoIndekso == -1 && estasKomencoDeBloko(ĉeno, i)) {
      komencoIndekso = i;
      komencoDatumo = {
        komencaSimbolo: null,
        finaSymbolo: null
      };

      // Eblas optimumigi, haltigante la map ĉe la unua kongruo
      simbolojDeBloko.map((datumo) => {
        let [komencoS, finoS, opcioj] = datumo;

        if (ĉeno[i] == komencoS) {
          komencoDatumo.komencaSimbolo = komencoS;
          komencoDatumo.finaSymbolo = finoS

          if (opcioj.estasKodbloko) {
            internaBloknombro++;
          }
        }
      });
    } else if(komencoIndekso != -1) {
      // Eblas optimumigi, haltigante la map ĉe la unua kongruo
      simbolojDeBloko.map((datumo) => {
        let [komencoS, finoS, opcioj] = datumo;

        if (!opcioj || !opcioj.estasKodbloko) {
          return;
        }

        if (ĉeno[i] == komencoS) {
          internaBloknombro++;
        } else if (ĉeno[i] == finoS) {
          internaBloknombro--;
        }
      });
    }

    if (internaBloknombro == 0 && estasFinoDeBloko(ĉeno, i, komencoIndekso, komencoDatumo, serĉanteInfanojn, antaŭaPecoDeKodo)) {
      let datumo = finoDeBlokoDatumo(ĉeno, i, komencoIndekso, komencoDatumo, antaŭaPecoDeKodo);
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
    kodajPeco = ekstraktiLaSekvanKodajPeco(
      ĉeno.slice(indekso),
      serĉanteInfanojn,
      gepatro,
      kodajPecoj.length ? kodajPecoj[kodajPecoj.length - 1] : {}
    );

    kodajPecoj.push(kodajPeco);

    indekso += kodajPeco.finoIndekso;
    if (!kodajPeco.normalaVokadaNotacio) {
      indekso ++;
    }

    finita = typeof(ĉeno[indekso]) == 'undefined';
  }

  return kodajPecoj;
};

const postproceso = (kodajPeco) => {
  if (kodajPeco.komencoDatumo.finaSymbolo && !kodajPeco.postprocesaOkazis) {
    let finaSymboloEl = simbolojDeBloko.find((el) => {
      return el[1] == kodajPeco.komencoDatumo.finaSymbolo;
    });

    if (finaSymboloEl.length > 2 && finaSymboloEl[2].postproceso) {
      kodajPeco.originaĈeno = kodajPeco.ĉeno;
      kodajPeco.postprocesaOkazis = vera;
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
    'valoro': kodopeco.ĉeno,
    'normalaVokadaNotacio': kodopeco.normalaVokadaNotacio
  };
};

const ekstraktiKodpecoIdoj = (kodajPeco) => {
  let ĉeno = kodajPeco.ĉeno;

  if (!kodajPeco.estasAtomara) {
    kodajPeco.infanojn = komencoFinoLegFunkcio(ĉeno, true, kodajPeco);
    kodajPeco.infanojn.map(postproceso);
    kodajPeco.infanojn.map(ekstraktiKodpecoIdoj);
  }
};

const purigiMetadatenojn = (kodopeco) => {
  if (typeof(kodopeco.normalaVokadaNotacio) != 'undefined') {
    delete kodopeco.normalaVokadaNotacio;
  }

  if (kodopeco.infanojn) {
    kodopeco.infanojn = kodopeco.infanojn.map(purigiMetadatenojn);
  }

  return kodopeco;
}

const legFunkcio = (ĉeno) => {
  let kodajPecoj = komencoFinoLegFunkcio(ĉeno);
  kodajPecoj = kodajPecoj.map(postproceso);
  kodajPecoj.map(ekstraktiKodpecoIdoj);

  kodajPecoj = kodajPecoj.map(kodopecoEnObjekto);
  kodajPecoj = kodajPecoj.map(purigiMetadatenojn);
  
  return kodajPecoj;
}

const transformiKodonEnInstrukciojn = (kodajPecoj, npilTabelo = {}) => {
  let instrukcioj = [];
  kodajPecoj.map(verkiloDeKodoobjektoj).map(kodobjekto => {
    instrukcioj = instrukcioj.concat(kodobjekto.kodobjektoj);
  });

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
