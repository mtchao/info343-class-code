Parse.initialize("WNXEX0T4obOEG6zEHQYGwdyJFA4R7Xm6rzA0pvCy", "J2UFcc6Ohoh5oWkCKUa9ExGziX2J2LoYqzZfm6AZ");

$(function () {
    'use strict';

    // new Task class for parse
    var Task = Parse.Object.extend('Task');

    // new query that will return all tasks ordered by createAt
    var tasksQuery = new Parse.Query(Task);
    tasksQuery.ascending('createdAt');

    // reference to the task list element
    var tasksList = $('#tasks-list');

    // reference to the error message alert
    var errorMessage = $('#error-message');

    // current set of tasks
    var tasks = [];

    // error message
    function displayError(err) {
        errorMessage.text(err.message);
        errorMessage.fadeIn();
    }
    function clearError() {
        errorMessage.hide();
    }

    // spinner
    function showSpinner() {
        $('.fa-spin').show();
    }
    function hideSpinner() {
        $('.fa-spin').hide();
    }

    function fetchTasks() {
        showSpinner();
        tasksQuery.find().then(onData, displayError).always(hideSpinner);
    }

    function onData(results) {
        tasks = results;
        renderTasks();
    }

    function renderTasks() {
        tasksList.empty();
        tasks.forEach(function (task) {
            $(document.createElement('li')).text(task.get('title')).appendTo(tasksList);
        })
    }

    // when the user submits the new task form...
    $('#new-task-form').submit(function(evt) {
        evt.preventDefault();

        var titleInput = $(this).find('[name="title"]');
        var title = titleInput.val();
        var task = new Task();
        task.set('title', title);
        task.save().then(fetchTasks, displayError).then(function () {
            titleInput.val('');
        });

        return false;
    });

    // go and fetch tasks
    fetchTasks();

    // window.setInterval(fetchTasks, 3000);
});