// On définit 4 fonctions f1, f2, f3, f4 avec un comportement synchrone
// , asynchrone et les Promise
function f1Sync(x) {
  return x + 1;
}
f2Sync = f3Sync = f4Sync = f1Sync

async function f1Async(x, callback) {
  callback(x + 1);
}
f2Async = f3Async = f4Async = f1Async

function f1Prom(x) {
  return new Promise( (resolve) => resolve(x + 1) );
}
f2Prom = f3Prom = f4Prom = f1Prom

// Dans les 4 fonctions suivantes, on appelle successivement f1, puis f2, puis f3 puis f4
function appelSynchrone1(x) {
  let y = f1Sync(x);
  y = f2Sync(y);
  y = f3Sync(y);
  y = f4Sync(y);
  console.log("Y synchrone 1 => " + y);
}

function appelSynchrone2(x) {
  let y = f4Sync( f3Sync( f2Sync( f1Sync(x) ) ) );
  console.log("Y synchrone 2 => " + y);
}

function appelAsynchrone(x) {
  f1Async(
    x, 
    (x) => f2Async(
      x,
      (x) => f3Async(
        x,
        (x) => f4Async(
          x,
          (x) => console.log("Y asynchrone => " + x)
        )
      )
    )
  );
}

function appelPromise(x) {
  f1Prom(x)
    .then(f2Prom)
    .then(f3Prom)
    .then(f4Prom)
    .then((x) => console.log("Y promise => " + x));
}

appelSynchrone1(1)
appelSynchrone2(1)
appelAsynchrone(1)
appelPromise(1)


