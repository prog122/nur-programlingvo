// Ni plenumas iom pli kompleksan eligon de teksto uzante normalan vokadan notacion
const helpanto = require('./helpanto.cjs');
process.stdout.write("Ruligante teston 8\n");
helpanto.asertiLaEligonDeLaIDVM("testoj/8/8.np", "eligi 8 8\nrevena\n");
helpanto.asertiLaEligonDeLaKodoobjektoj("testoj/8/8.np", `[
  {
    tipo: 'listo',
    infanoj: [
      { tipo: 'datumo', valoro: 'eligi' },
      { tipo: 'datumo', valoro: '8 8' }
    ]
  }
]`);
helpanto.asertiLaEligonDeLaProgramo("testoj/8/8.np", "8 8");
