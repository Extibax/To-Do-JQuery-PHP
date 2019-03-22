$(document).ready(() => {

    /* fetchTodos(); */
    
    alertify.set('notifier','position', 'top-center');
    alertify.success('All is OK');

    /* TODO: Continuar con el Date Picker */
    /* $('#input-date').datepicker({
        uiLibrary: 'bootstrap4'
    }); */

    /* $('#input-date').timepicker(); */

    $('#input-date').datetimepicker({ footer: true, modal: true });

    $('#form-save-todo').keypress(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        console.log(code);
        if (code == 13) {
            e.preventDefault();
            saveTodo();
            fetchTodos();
        }
    });

    $(document).on('keypress', '#input-edit-todo', function (e) {
        let code = (e.KeyCode ? e.KeyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            let element = $(this)[0].parentElement.parentElement.parentElement.parentElement;
            let id = $(element).attr($('#input-date').timepicker();'todo-id');
            let input_edit = $(this)[0];
            let input_edit_value = $(input_edit).val();

            postEditTodo = {
                ID: id,
                Todo: input_edit_value
            };

            $.post('./php/edit_todo.php', postEditTodo, (response) => {
                if (response == 1) {
                    fetchTodos();
                    console.log('Edit todo: ' + response);
                } else {
                    alertify.error('Something is wrong :(');
                    /* TODO: Crear una funcion para mostrar los errores al cliente */
                }
            });
        }
    });

    $('#todos').on('click', '#check-todo', function () {
        let element = $(this)[0].parentElement.parentElement.parentElement;
        let ID = $(element).attr('todo-id');

        $.post('./php/check_todo.php', { ID }, function(response) {
            console.log(response);
            fetchTodos();
        });
    });

});

function saveTodo() {
    const postSaveTodo = {
        Todo: $('#input-todo').val()
    };

    $.post('./php/save_todo.php', postSaveTodo, (response) => {
        $('#form-save-todo').trigger('reset');
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
                `
                <div class="list-group-item bg-dark mb-1" id="todo-container" todo-id="${todo.ID}">
                <div class="d-flex justify-content-between align-items-center">
                    <span class="d-flex flex-column">
                        <span>${todo.Todo}</span>
                        <span class="badge badge-primary badge-pill">${todo.Date}</span>
                    </span>
                    <span>
                        <input type="text" class="datePickerID-${todo.ID}" id="dueDatePicker">
                        <button class="btn btn-secondary" id="btnSelectDate">
                            <i class="far fa-calendar-check"></i>
                        </button>
                        <button class="btn btn-primary" id="btn-edit-todo" type="button" data-toggle="collapse"
                            data-target="#edit-menu-${todo.ID}" aria-expanded="false" aria-controls="edit-menu-${todo.ID}">
                            <i class="far fa-edit"></i>
                        </button>
                        <button class="btn btn-success check-todo" id="check-todo">
                            <i class="far fa-check-square"></i>
                        </button>
                    </span>
                </div>
                <div class="collapse" id="edit-menu-${todo.ID}">
                    <form class="form-inline form-group w-100 mx-0 my-2" id="form-edit-todo">
                        <div class="input-group w-100">
                            <input class="form-control bg-dark border-primary w-100 text-white" id="input-edit-todo"
                                value='${todo.Todo}' type="text" placeholder="Edit your todo here">
                        </div>
                    </form>
                </div>
            </div>
            `;
        });

        $('#todos').html(template);

    })
}