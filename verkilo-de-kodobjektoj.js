let registraNumbrilo = -1;
const sekvaRegistro = () => {
  registraNumbrilo++;
  return registraNumbrilo;
};

const verkiloDeKodobjektoj = (kodobjekto) => {
  if (kodobjekto.tipo == 'listo') {
    if (kodobjekto.infanoj.every(infano => { return infano.tipo == 'datumo'; })) {
      kodobjekto.kodobjektoj = [kodobjekto.infanoj.map(inf => {
        return inf.valoro;
      })];

      return kodobjekto;
    }

    if (kodobjekto.infanoj[0].tipo == 'datumo' && kodobjekto.infanoj[0].valoro == 'krei-funkcion') {
      const registro = sekvaRegistro();
      kodobjekto.infanoj = kodobjekto.infanoj.map(verkiloDeKodobjektoj)
      kodobjekto.registro = registro;
      kodobjekto.kodobjektoj = [['difini-fermaĵo', registro]];
      kodobjekto.infanoj.slice(1).map((ko) => {
        kodobjekto.kodobjektoj = kodobjekto.kodobjektoj.concat(ko.kodobjektoj);
      });
      kodobjekto.kodobjektoj = kodobjekto.kodobjektoj.concat([['fini-difinon-de-fermaĵo']]);

      return kodobjekto;
    }

    if (kodobjekto.infanoj[0].tipo == 'datumo' && kodobjekto.infanoj[0].valoro == 'voki-funkcion') {
      kodobjekto.infanoj = kodobjekto.infanoj.map(verkiloDeKodobjektoj)
      kodobjekto.kodobjektoj = kodobjekto.infanoj[1].kodobjektoj.concat([['voki', kodobjekto.infanoj[1].registro]]);
      return kodobjekto;
    }

    return kodobjekto.infanoj.map(verkiloDeKodobjektoj);
  }

  return kodobjekto;
};

export { verkiloDeKodobjektoj };
