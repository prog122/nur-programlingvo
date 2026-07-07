// Ni plenumas iom pli kompleksan eligon de teksto uzante minimuman formon
const helpanto = require('./helpanto.cjs');
process.stdout.write("Ruligante teston 11\n");
helpanto.asertiLaEligonDeLaIDVM("testoj/11/11.np", 
`difini-fermaĵo 0
eligi 11
fini-difinon-de-fermaĵo
voki 0
revena
`);

helpanto.asertiLaEligonDeLaKodoobjektoj("testoj/11/11.np", `[
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
              { tipo: 'datumo', valoro: '11' }
            ]
          }
        ]
      }
    ]
  }
]`);
helpanto.asertiLaEligonDeLaProgramo("testoj/11/11.np", "11");
