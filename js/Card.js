// KLASA KANBAN CARD
function Card(id, name, columnId) {
  var self = this;

  this.id = id;
  this.name = name || 'No name given';
  this.columnId = columnId;
  this.element = generateTemplate('card-template', { description: this.name }, 'li');

  this.element.querySelector('.card').addEventListener('click', function (event) {
    event.stopPropagation();
     var self = this;
     if (event.target.classList.contains('btn-delete')) {
      self.removeCard();
      return false
    }
    var data = new FormData();
    var Name = prompt("Enter the name of the card");
    data.append('name', Name);
    data.append('bootcamp_kanban_column_id', self.columnId);
    fetch(baseUrl + '/card/' + self.id, {
      method: 'PUT',
      headers: myHeaders,
      body: data
    })
      .then(function (resp) {
        return resp.json();
      })
    .then(function (resp) {
      console.log(resp);
    })
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