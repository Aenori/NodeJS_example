async function coucou1() {
  setTimeout(() => console.log('coucou 1.1' + process.hrtime()), 200);
  setTimeout(() => console.log('coucou 1.2' + process.hrtime()), 100);
  await setTimeout(() => console.log('coucou 1.3' + process.hrtime()), 300);
  console.log('fin de coucou 1' + process.hrtime());
}

function coucou2() {
  coucou1();
  console.log('coucou 2' + process.hrtime());
}

coucou2();
