$(document).ready(() => {

    fetchTodos();

    alertify.set('notifier', 'position', 'top-center');
    alertify.success('All is OK');

    $('#datepicker').datetimepicker({
        uiLibrary: 'bootstrap4',
        footer: true,
        showRightIcon: false
    });

    $('#form-save-todo').keypress(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        console.log(code);
        if (code == 13) {
            e.preventDefault();
            saveTodo();
            fetchTodos();
        }
    });

    $('#input-todo').on('keypress', function () {
        $('#form-date-time').collapse('show');
    });

    $('#btn-form-save-todo').click(function () {
        $('#form-date-time').collapse('toggle');
    });

    $(document).on('keypress', '#input-edit-todo', function (e) {
        let code = (e.KeyCode ? e.KeyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            let element = $(this)[0].parentElement.parentElement.parentElement.parentElement;
            let id = $(element).attr('todo-id');
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

        $.post('./php/check_todo.php', {
            ID: ID
        }, function (response) {
            console.log(response);
            fetchTodos();
        });
    });

    $('#todos').on('click', '#btn-edit-todo', function () {
        let element = $(this)[0].parentElement.parentElement.parentElement;
        let ID = $(element).attr('todo-id');

        $('#input-edit-date-' + ID).datetimepicker({
            uiLibrary: 'bootstrap4',
            footer: true,
            showRightIcon: false,
            format: 'h:MM TT yyyy-mm-dd',
            value: getCurrentDateTime()
        });
    });

    console.log(getUserTodo(3));

});

function getCurrentDateTime() {
    return dateFormat(new Date(), "h:MM TT yyyy-mm-dd");
}

function getUserTodo(ID) {
    $.post('./php/fetch_one_todo.php', {
        ID: ID
    }, function (response) {
        let todo = JSON.parse(response);
        //TODO: Continuar con la creacion de un metodo para retornar la fecha del usuario
        getUserDateTime(todo);
    });
}

function getUserDateTime(todo) {
    return todo;
}

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
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <span>${todo.Todo}</span>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-12 d-flex">
                                                        <span class="badge badge-primary badge-pill align-self-start"><i
                                                                class="far fa-calendar"></i> ${todo.Date}</span>
                                                        <span class="badge badge-primary badge-pill align-self-start ml-1"><i
                                                                class="far fa-clock"></i> ${todo.Date}</span>
                                                    </div>
                                                </div>
                                            </span>
                                            <span>
                                                <button class="btn btn-primary" id="btn-edit-todo" type="button"
                                                    data-toggle="collapse" data-target="#edit-menu-${todo.ID}"
                                                    aria-expanded="false" aria-controls="edit-menu-${todo.ID}">
                                                    <i class="far fa-edit"></i>
                                                </button>
                                                <button class="btn btn-success check-todo" id="check-todo">
                                                    <i class="far fa-check-square"></i>
                                                </button>
                                            </span>
                                        </div>
                                        <div class="collapse" id="edit-menu-${todo.ID}">
                                            <div class="row mt-3">
                                                <div class="col-md-12">
                                                    <div class="row d-flex justify-content-between m-auto">
                                                        <div class="col-md-6 pb-3">
                                                            <div class="input-group bg-dark">
                                                                <input class="form-control bg-white" type="text"
                                                                    id="input-edit-date-${todo.ID}" placeholder="Enter Due Date"
                                                                    autocomplete="off">
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 pb-3">
                                                            <div class="input-group d-flex">
                                                                <select class="form-control bg-white"
                                                                    name="todo_category" id="">
                                                                    <option value="One">One</option>
                                                                    <option value="One">Two</option>
                                                                    <option value="One">Three</option>
                                                                </select>
                                                                <div class="input-group-append">
                                                                    <button
                                                                        class="input-group-text d-flex bg-dark text-muted">
                                                                        <i class="far fa-folder"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
            `;
        });

        $('#todos').html(template);

    })
}