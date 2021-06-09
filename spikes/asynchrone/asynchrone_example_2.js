function coucou1() {
  setTimeout(() => console.log('coucou 1'), 200);
  console.log('fin de coucou 1');
}

function coucou2() {
  coucou1();
  console.log('coucou 2');
}

coucou2();
