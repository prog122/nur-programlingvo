// Ni plenumas simplan elskribon de teksto uzante prefiksan formon
const helpanto = require('./helpanto.cjs');
process.stdout.write("Ruligante teston 6\n");
helpanto.asertiLaEligonDeLaIDVM("testoj/6/6.np", "eligi 6\nrevena\n");
helpanto.asertiLaEligonDeLaKodoobjektoj("testoj/6/6.np", `[
  {
    tipo: 'listo',
    infanoj: [
      { tipo: 'datumo', valoro: 'eligi' },
      { tipo: 'datumo', valoro: '6' }
    ]
  }
]`);
helpanto.asertiLaEligonDeLaProgramo("testoj/6/6.np", "6");
