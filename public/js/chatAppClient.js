/** handle the event when user press submit
 * @param {Object} event : The submit event
 * @param {Object} input : The input field
 */
function handleSubmit(event, input) {
  event.preventDefault();

  if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
  }
}

/** adding the message from Yoda to the DOM
 * @param {Object} msg : The received message
 * @param {Object} messages : The HTML markup
 */
function addYodaMessageToHTML(msg, messages) {
  const itemUser = document.createElement('li');
  itemUser.textContent = msg['user'];
  messages.appendChild(itemUser);

  const item = document.createElement('li');
  item.textContent = msg['message'];
  messages.appendChild(item);
}
