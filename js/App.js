$(document).ready(() => {

    fetchTodos();

    $('#form-todo').keypress(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            saveTodo();
            fetchTodos();
        }
    });
    
});

function saveTodo() {
    const postTodo = {
        Todo: $('#input-todo').val()
    };

    $.post('./php/save_todo.php', postTodo, (response) => {
        $('#form-todo').trigger('reset');
        fetchTodos();
        console.log('Save todo: ' + response);
    });
}

function fetchTodos() {
    $.get('./php/fetch_todos.php', 'aplication/json', (response) => {
        let todos = JSON.parse(response);
        let template = '';

        todos.forEach(todo => {
            template +=
                `<div class="list-group-item bg-dark mb-1 d-flex justify-content-between align-items-center">
                ${todo.Todo} <span class="badge badge-primary badge-pill">${todo.Date}</span>
            </div>`;
        });

        $('#todos').html(template);
    })
}