// Ni plenumas simplan eligon de teksto
const helpanto = require('./helpanto.cjs');
process.stdout.write("Ruligante teston 2\n");
helpanto.asertiLaEligonDeLaIDVM("testoj/2/2.np", "eligi 2\nrevena\n");
helpanto.asertiLaEligonDeLaKodoobjektoj("testoj/2/2.np", `[
  {
    tipo: 'listo',
    infanojn: [
      { tipo: 'datumo', valoro: 'eligi' },
      { tipo: 'datumo', valoro: '2' }
    ]
  }
]`);
helpanto.asertiLaEligonDeLaProgramo("testoj/2/2.np", "2");
