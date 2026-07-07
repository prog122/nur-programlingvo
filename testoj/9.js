// Ni plenumas iom pli kompleksan eligon de teksto uzante minimuman formon
const helpanto = require('./helpanto.cjs');
process.stdout.write("Ruligante teston 9\n");
helpanto.asertiLaEligonDeLaIDVM("testoj/9/9.np", "eligi 9 9\nrevena\n");
helpanto.asertiLaEligonDeLaKodoobjektoj("testoj/9/9.np", `[
  {
    tipo: 'listo',
    infanoj: [
      { tipo: 'datumo', valoro: 'eligi' },
      { tipo: 'datumo', valoro: '9 9' }
    ]
  }
]`);
helpanto.asertiLaEligonDeLaProgramo("testoj/9/9.np", "9 9");
