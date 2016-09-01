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

  // Checks for local storage and repopulates list or creates new list;
  if (supports_html5_storage()) {
    var supportsStorage = true;
    if (localStorage['listExists']) {
        var counter = 0;
        for (var prop in localStorage) {
          listo[counter].task = prop;
          listo[counter].id = localStorage[prop];
          counter++;
        }
    }
    else {
      localStorage['listo'] = listo;
      console.log(localStorage['listo']);
    }
  }

  var Task = function(task) {
    this.task = task;
    this.id = 'new';
  };

  // Adds task to list
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
      if (supportsStorage) {
        localStorage[task.task] = task.id;
        localStorage['listExists'] = "true";
      }
    };

  var advanceTask = function(task) {
    var modified = task.innerText.trim();
    for (var i = 0; i < listo.length; i++) {
      if (listo[i].task === modified) {
        if (listo[i].id = 'new') {
          listo[i].id = 'inProgress';
          localStorage[task.task] = "inProgress"
        }
        else if (listo[i].id = 'inProgress') {
          listo[i].id = 'archived';
          localStorage[task.task] = "archived";
        }
        else {
          listo.splice(i, 1);
        }
        break;
      }
    }
    task.remove();
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



});
