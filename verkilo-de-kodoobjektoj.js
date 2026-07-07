let registraNumbrilo = -1;
const sekvaRegistro = () => {
  registraNumbrilo++;
  return registraNumbrilo;
};

const verkiloDeKodoobjektoj = (kodobjekto) => {
  if (kodobjekto.tipo == 'listo') {
    if (kodobjekto.infanojn.every(infano => { return infano.tipo == 'datumo'; })) {
      kodobjekto.kodobjektoj = [kodobjekto.infanojn.map(inf => {
        return inf.valoro;
      })];

      return kodobjekto;
    }

    if (kodobjekto.infanojn[0].tipo == 'datumo' && kodobjekto.infanojn[0].valoro == 'krei-funkcion') {
      const registro = sekvaRegistro();
      kodobjekto.infanojn = kodobjekto.infanojn.map(verkiloDeKodoobjektoj)
      kodobjekto.registro = registro;
      kodobjekto.kodobjektoj = [['difini-fermaĵo', registro]];
      kodobjekto.infanojn.slice(1).map((ko) => {
        kodobjekto.kodobjektoj = kodobjekto.kodobjektoj.concat(ko.kodobjektoj);
      });
      kodobjekto.kodobjektoj = kodobjekto.kodobjektoj.concat([['fini-difinon-de-fermaĵo']]);

      return kodobjekto;
    }

    if (kodobjekto.infanojn[0].tipo == 'datumo' && kodobjekto.infanojn[0].valoro == 'voki-funkcion') {
      kodobjekto.infanojn = kodobjekto.infanojn.map(verkiloDeKodoobjektoj)
      kodobjekto.kodobjektoj = kodobjekto.infanojn[1].kodobjektoj.concat([['voki', kodobjekto.infanojn[1].registro]]);
      return kodobjekto;
    }

    return kodobjekto.infanojn.map(verkiloDeKodoobjektoj);
  }

  return kodobjekto;
};

export { verkiloDeKodoobjektoj };
