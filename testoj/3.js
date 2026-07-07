// Ni plenumas simplan eligon de teksto
const helpanto = require('./helpanto.cjs');
process.stdout.write("Ruligante teston 3\n");
helpanto.asertiLaEligonDeLaIDVM("testoj/3/3.np", "eligi 3\nrevena\n");
helpanto.asertiLaEligonDeLaKodoobjektoj("testoj/3/3.np", `[
  {
    tipo: 'listo',
    infanoj: [
      { tipo: 'datumo', valoro: 'eligi' },
      { tipo: 'datumo', valoro: '3' }
    ]
  }
]`);
helpanto.asertiLaEligonDeLaProgramo("testoj/3/3.np", "3");
