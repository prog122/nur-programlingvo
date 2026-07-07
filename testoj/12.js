// Ni plenumas iom pli kompleksan eligon de teksto uzante minimuman formon
const helpanto = require('./helpanto.cjs');
process.stdout.write("Ruligante teston 12\n");
helpanto.asertiLaEligonDeLaIDVM("testoj/12/12.np", 
`difini-fermaĵo 0
eligi 12
eligi 12-2
fini-difinon-de-fermaĵo
voki 0
revena
`);

helpanto.asertiLaEligonDeLaKodoobjektoj("testoj/12/12.np", `[
  {
    tipo: 'listo',
    infanojn: [
      { tipo: 'datumo', valoro: 'voki-funkcion' },
      {
        tipo: 'listo',
        infanojn: [
          { tipo: 'datumo', valoro: 'krei-funkcion' },
          {
            tipo: 'listo',
            infanojn: [
              { tipo: 'datumo', valoro: 'eligi' },
              { tipo: 'datumo', valoro: '12' }
            ]
          },
          {
            tipo: 'listo',
            infanojn: [
              { tipo: 'datumo', valoro: 'eligi' },
              { tipo: 'datumo', valoro: '12-2' }
            ]
          }
        ]
      }
    ]
  }
]`);
helpanto.asertiLaEligonDeLaProgramo("testoj/12/12.np", "1212-2");
