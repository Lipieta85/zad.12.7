// KLASA KANBAN CARD
function Card(id, name) {
  var self = this;

  this.id = id;
  this.name = name || 'No name given';
  this.element = generateTemplate('card-template', { description: this.name }, 'li');

  this.element.querySelector('.card').addEventListener('click', function (event) {
    event.stopPropagation();
    /* var self = this;
    var Name = prompt("Enter the name of the card");

    fetch(baseUrl + '/card/' + self.id, {
      method: 'PUT',
      headers: myHeaders,
      body: Name,
    })
      .then(function (resp) {
        return resp.json();
      })
    .then(function (resp) {
      var name = new name(resp.id, cardName);
    })
    */
    if (event.target.classList.contains('btn-delete')) {
      self.removeCard();
    }
  });
}
Card.prototype = {
  removeCard: function () {
    var self = this;

    fetch(baseUrl + '/card/' + self.id, { method: 'DELETE', headers: myHeaders })
      .then(function (resp) {
        return resp.json();
      })
      .then(function (resp) {
        self.element.parentNode.removeChild(self.element);
      })
  }
}