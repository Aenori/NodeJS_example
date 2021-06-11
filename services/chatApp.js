require('../utils/array');

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

const DARTH_VADER_CITATIONS = [
  'I find your lack of faith disturbing.',
  'No…, I am your Father…',
  'Don’t be too proud of this technological terror you’ve constructed.' +
    ' The ability to destroy a planet is insignificant next to the power' +
    ' of the Force.',
  'When I left you, I was but the learner. Now I am the master.',
  'You have controlled your fear. Now, release your anger. Only your hatred' +
    ' can destroy me.',
  'Be careful not to choke on your aspirations.',
  'I am altering the deal. Pray I don’t alter it any further.',
  'This will be a day long remembered. It has seen the end of Kenobi. ' +
    'It will soon see the end of the Rebellion.',
  'You don’t know the power of the dark side! I must obey my master.',
  'He’s as clumsy as he is stupid.',
  'The circle is now complete',
];

const CITATIONS = {Yoda: YODA_CITATIONS, Darth_Vader: DARTH_VADER_CITATIONS};

/** Renvoit une citation aléatoire d'un utilisateur donné
 * @param {string} user : un utilisateur (doit correspondre à un clé de
 *  CITATIONS)
 * @return {string} une citation aléatoire d'un utilisateur
 */
function getRandomCitation(user) {
  console.log('Citation from : ' + user);
  return CITATIONS[user].getRandomElement();
}

/** Renvoit une citation aléatoire de yoda
 * @return {string} une citation aléatoire de yoda
 */
function getRandomUser() {
  return Object.keys(CITATIONS).getRandomElement();
}

exports.handleSocketIo = (io) => {
  io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
      const user = getRandomUser();
      socket.emit(
          'Yoda message',
          {message: getRandomCitation(user), user: user});
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};
