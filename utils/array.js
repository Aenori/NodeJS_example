/**
 * Renvoit un élément aléatoire d'une listeFonction getRandom
 * @param {Array} list : une liste dont on veut extraire un élément aléatoire
 * @return {unknow} un élément aléatoire de la liste
 */
function getRandom(list) {
  return list[Math.floor((Math.random()*list.length))];
}

// eslint-disable-next-line no-extend-native
Array.prototype.getRandomElement = function() {
  return getRandom(this);
};
