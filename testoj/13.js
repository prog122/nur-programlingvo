// Ni plenumas iom pli kompleksan eligon de teksto uzante minimuman formon
const helpanto = require('./helpanto.cjs');
process.stdout.write("Ruligante teston 13\n");
helpanto.asertiLaEligonDeLaIDVM("testoj/13/13.np", 
`difini-fermaĵo 0
eligi 13
eligi 13-2
fini-difinon-de-fermaĵo
voki 0
revena
`);

helpanto.asertiLaEligonDeLaKodoobjektoj("testoj/13/13.np", `[
  {
    tipo: 'listo',
    infanoj: [
      { tipo: 'datumo', valoro: 'voki-funkcion' },
      {
        tipo: 'listo',
        infanoj: [
          { tipo: 'datumo', valoro: 'krei-funkcion' },
          {
            tipo: 'listo',
            infanoj: [
              { tipo: 'datumo', valoro: 'eligi' },
              { tipo: 'datumo', valoro: '13' }
            ]
          },
          {
            tipo: 'listo',
            infanoj: [
              { tipo: 'datumo', valoro: 'eligi' },
              { tipo: 'datumo', valoro: '13-2' }
            ]
          }
        ]
      }
    ]
  }
]`);
helpanto.asertiLaEligonDeLaProgramo("testoj/13/13.np", "1313-2");
