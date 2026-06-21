// Ni rulas kodon uzante NPL
const helpanto = require('./helpanto.cjs');
process.stdout.write("Ruligante teston 4\n");
helpanto.asertiLaEligonDeLaIDVM("testoj/4/4.np", "eligi 4\nrevena\n", "alia-Esperanto.npl");
helpanto.asertiLaEligonDeLaKodoobjektoj("testoj/4/4.np", `[
  {
    tipo: 'listo',
    infanojn: [
      { tipo: 'datumo', valoro: 'eligi' },
      { tipo: 'datumo', valoro: '4' }
    ]
  }
]`, "alia-Esperanto.npl");
helpanto.asertiLaEligonDeLaProgramo("testoj/4/4.np", "4", "alia-Esperanto.npl");
