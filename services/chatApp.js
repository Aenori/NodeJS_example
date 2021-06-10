const YODA_CITATIONS = [
  'Difficile à voir. Toujours en mouvement est l’avenir.',
  'Le côté obscur de la Force, redouter tu dois.',
  'Fais le ou ne le fais pas. Il n’y a pas d’essai.',
  'Bonnes relations avec les Wookies, j’entretiens.',
  'Un grand guerrier ? Personne par la guerre ne devient grand.',
  'Un Jedi utilise la Force pour la connaissance et la défense,' +
' jamais pour l’attaque.',
  'Quand 900 ans comme moi tu auras, moins en forme tu seras.',
  'Je ne peux rien lui apprendre, cet enfant n’a aucune patience.' +
    ' Trop de colère en lui, comme son père, il n’est pas prêt.',
  'Robuste je suis grâce à la Force, mais pas à ce point là.' +
    ' Le crépuscule m’envahi et bientôt, la nuit va tomber. Humm.' +
    ' Ainsi vont les choses. Ainsi va la Force.',
  'La peur est le chemin vers le côté obscur : la peur mène à la colère,' +
    ' la colère mène à la haine, la haine … mène à la souffrance.',
  'Toujours par deux ils vont. Ni plus, ni moins. Le maître et son apprenti.',
  'A vos intuitions vous fier, il faut.',
  'La taille importe peu … Regarde moi : est-ce par la taille que tu peux' +
    ' me juger ? Et bien tu ne le dois pas.',
];

/** Renvoit une citation aléatoire de yoda
 * @return {string} une citation aléatoire de yoda
 */
function getYodaCitation() {
  return YODA_CITATIONS[Math.floor((Math.random()*YODA_CITATIONS.length))];
}

exports.handleSocketIo = (io) => {
  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
      socket.emit('Yoda message', {message: getYodaCitation()});
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};
