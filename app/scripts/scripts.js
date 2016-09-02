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
  var localList = [];

  // Checks for local storage and repopulates list or creates new list;
  if (supports_html5_storage()) {
    var supportsStorage = true;
    var listItemHTML;
    if (localStorage['listExists']) {
      var local = JSON.parse(localStorage['listo']);
      for (var i = 0; i < local.length; i++) {
        listo.push(local[i]);
        if (local[i].id === 'new') {
          $('#newList').append(
            '<a href="#finish" class="" id="item">' +
            '<li class="list-group-item">' +
            '<h3>' + local[i].task + '</h3>' +
            '<span class="arrow pull-right"></span></li></a>'
          );
        }
        else if (local[i].id === 'inProgress') {
          $('#currentList').append(
            '<a href="#finish" class="" id="inProgress">' +
            '<li class="list-group-item">' +
            '<h3>' + local[i].task + '</h3>' +
            '<span class="arrow pull-right"></span></li></a>'
          );
        }
        else if (local[i].id === 'archived') {
          $('#archivedList').append(
            '<a href="#finish" class="" id="archived">' +
            '<li class="list-group-item">' +
            '<h3>' + local[i].task + '</h3>' +
            '<span class="arrow pull-right"></span></li></a>'

          );
        }
        // listGroup.append(
      }
    }
  };
  var Task = function(task) {
    this.task = task;
    this.id = 'new';
  };

//  Adds task to list
  var addTask = function(task) {
    if(task) {
      task = new Task(task);
      listo.push(task);
      localStorage.setItem('listo', JSON.stringify(listo));
      localStorage.setItem('listExists', 'true');
      $('#newItemInput').val('');
      $('#newList').append(
        '<a href="#finish" class="" id="item">' +
        '<li class="list-group-item">' +
        '<h3>' + task.task + '</h3>' +
        '<span class="arrow pull-right"></span></li></a>'
      );
      $('#newTaskForm').slideToggle('fast', 'linear');
    }
  };
  var advanceTask = function(task) {
    var modified = task.innerText.trim().toLowerCase();
    for (var i = 0; i < listo.length; i++) {
      if (listo[i].task.toLowerCase() === modified) {
        if (listo[i].id === 'new') {
          listo[i].id = 'inProgress';
          localStorage.setItem('listo', JSON.stringify(listo));
        }
        else if (listo[i].id === 'inProgress') {
          listo[i].id = 'archived';
          localStorage.setItem('listo', JSON.stringify(listo));
        }
        else {
          listo.splice(i, 1);
          localStorage.setItem('listo', JSON.stringify(listo));
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
    advanceTask(task);
    this.id = 'archived';
    var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
    $('#archivedList').append(changeIcon);
  });

  $(document).on('click', '#archived', function(e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
  });



});
