// Ni rulas kodon uzante NPL
const helpanto = require('./helpanto.cjs');
process.stdout.write("Ruligante teston 5\n");
helpanto.asertiLaEligonDeLaIDVM("testoj/5/5.np", "montri 5\nrevena\n", " -npil alia-Esperanto.npil");
helpanto.asertiLaEligonDeLaKodoobjektoj("testoj/5/5.np", `[
  {
    tipo: 'listo',
    infanojn: [
      { tipo: 'datumo', valoro: 'eligi' },
      { tipo: 'datumo', valoro: '5' }
    ]
  }
]`, " -npil alia-Esperanto.npil");
helpanto.asertiLaEligonDeLaProgramo("testoj/5/5.np", "5", " -npil alia-Esperanto.npil");
