const verkiloDeKodoobjektoj = (kodobjekto) => {
  if (kodobjekto.tipo == 'listo') {
    return kodobjekto.infanojn.map(inf => {
      return inf.valoro;
    });
  }
};

export { verkiloDeKodoobjektoj };
