// Ni plenumas simplan eligon de teksto uzante normalan vokadan notacion
const helpanto = require('./helpanto.cjs');
process.stdout.write("Ruligante teston 7\n");
helpanto.asertiLaEligonDeLaIDVM("testoj/7/7.np", "eligi 7\nrevena\n");
helpanto.asertiLaEligonDeLaKodoobjektoj("testoj/7/7.np", `[
  {
    tipo: 'listo',
    infanojn: [
      { tipo: 'datumo', valoro: 'eligi' },
      { tipo: 'datumo', valoro: '7' }
    ]
  }
]`);
helpanto.asertiLaEligonDeLaProgramo("testoj/7/7.np", "7");
