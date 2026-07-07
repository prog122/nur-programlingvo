// Ni plenumas iom pli kompleksan eligon de teksto uzante minimuman formon
const helpanto = require('./helpanto.cjs');
process.stdout.write("Ruligante teston 10\n");
helpanto.asertiLaEligonDeLaIDVM("testoj/10/10.np", "eligi 10 10\nrevena\n");
helpanto.asertiLaEligonDeLaKodoobjektoj("testoj/10/10.np", `[
  {
    tipo: 'listo',
    infanoj: [
      { tipo: 'datumo', valoro: 'eligi' },
      { tipo: 'datumo', valoro: '10 10' }
    ]
  }
]`);
helpanto.asertiLaEligonDeLaProgramo("testoj/10/10.np", "10 10");
