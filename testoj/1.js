// Ni plenumas malplenan dosieron
const helpanto = require('./helpanto.cjs');
process.stdout.write("Ruligante teston 1\n");
helpanto.asertiLaEligonDeLaIDVM("testoj/1/1.np", "revena\n");
helpanto.asertiLaEligonDeLaKodoobjektoj("testoj/1/1.np", "[]");
helpanto.asertiLaEligonDeLaProgramo("testoj/1/1.np", "");
