$(document).ready(function() {

  $('#newTaskForm').hide();
  function supports_html5_storage() {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
  }
  var listo = [];
  if (supports_html5_storage()) {
    var supports = true;
    if (localStorage['listo']) {
      var savedList = localStorage['listo'];
      for (var i = 0; i < savedList.length; i++) {
        listo[i] = savedList[i];
      }
    }
  }
  // Come back here and add saved list to listo on restart
  var Task = function(task) {
    this.task = task;
    this.id = 'new';
  };
  var advanceTask = function(task) {
    var modified = task.innerText.trim();
    for (var i = 0; i < listo.length; i++) {
      if (listo[i].task === modified) {
        if (listo[i].id = 'new') {
          listo[i].id = 'inProgress';
        }
        else if (listo[i].id = 'inProgress') {
          listo[i].id = 'archived';
        }
        else {
          listo.splice(i, 1);
        }
        break;
      }
    }
    task.remove();
  };
  var addTask = function(task) {
    if(task) {
      task = new Task(task);
      listo.push(task);
      $('#newItemInput').val('');
      $('#newList').append(
        '<a href="#finish" class="" id="item">' +
        '<li class="list-group-item">' +
        '<h3>' + task.task + '</h3>' +
        '<span class="arrow pull-right">' +
        '<i class="glyphicon glyphicon-arrow-right">' +
        '</span></li></a>');
    }
    $('#newTaskForm').slideToggle('fast', 'linear');
    if (supports_html5_storage()) {debugger;
      localStorage['listo'].push({'task': task, 'id': '#item'});
      console.log(localStorage['listo']);
    }
  };
  $('#saveNewItem').on('click', function(e) {
    e.preventDefault();
    var task = $('#newItemInput').val().trim();
    addTask(task);
  });
  $('#add-todo').on('click', function() {
    $('#newTaskForm').fadeToggle('fast', 'linear');
  });
  $('#cancel').on('click', function(e) {
    e.preventDefault();
    $('#newTaskForm').fadeToggle('fast', 'linear');
  });
  $(document).on('click', '#item', function(e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
    this.id = 'inProgress';
    $('#currentList').append(this.outerHTML);
  });
  $(document).on('click', '#inProgress', function(e) {
    e.preventDefault();
    var task = this;
    task.id = 'archived';
    var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
    advanceTask(task);
    $('#archivedList').append(changeIcon);
  });
  $(document).on('click', '#archived', function(e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
  });
  function supports_html5_storage() {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
  }
  if (supports_html5_storage()) {

  }

});
