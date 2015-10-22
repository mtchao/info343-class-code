Parse.initialize("WNXEX0T4obOEG6zEHQYGwdyJFA4R7Xm6rzA0pvCy", "J2UFcc6Ohoh5oWkCKUa9ExGziX2J2LoYqzZfm6AZ");

$(function () {
    'use strict';

    // new Task class for parse
    var Task = Parse.Object.extend('Task');

    // new query that will return all tasks ordered by createAt
    var tasksQuery = new Parse.Query(Task);
    tasksQuery.ascending('createdAt');
    tasksQuery.notEqualTo('done', true);

    // reference to the task list element
    var tasksList = $('#tasks-list');

    // reference to the error message alert
    var errorMessage = $('#error-message');

    // current set of tasks
    var tasks = [];

    // reference to rating element
    var ratingElem = $('#rating');

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
            var li = $(document.createElement('li'))
                .text(task.get('title') + ' ')
                .addClass(task.get('done') ? 'completed-task' : '')
                .appendTo(tasksList)
                .click(function () {
                    task.set('done', !task.get('done'));
                    task.save().then(renderTasks, displayError);
            });

            $(document.createElement('span'))
                .raty({
                    readOnly: true,
                    score: (task.get('rating') || 0),
                    hints: ['terrible','bad','good','great','fantastic']})
                .appendTo(li);
        })
    }

    function showMessage(message) {
        message = message || 'Hello';
        alert(message);
    }

    // when the user submits the new task form...
    $('#new-task-form').submit(function(evt) {
        // tell the browser not to do its default behavior
        evt.preventDefault();

        // find the input element in this form with name attribute set to "title"
        var titleInput = $(this).find('[name="title"]');

        // get current value
        var title = titleInput.val();

        // create new Task and set the title
        var task = new Task();
        task.set('title', title);
        task.set('rating', ratingElem.raty('score'));

        // save new task to Parse database
        task.save()
            .then(fetchTasks, displayError)
            .then(function () {
                titleInput.val('');
                ratingElem.raty('set', {});
            });

        return false;
    });

    // go and fetch tasks
    fetchTasks();

    // enable rating user interface element
    ratingElem.raty();

    // refetch tasks
    window.setInterval(fetchTasks, 5000);
});