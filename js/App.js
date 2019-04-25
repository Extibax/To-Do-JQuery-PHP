$(document).ready(() => {

    isLoggedIn();
    fetchTodos($('#select_categories').val());
    listCategories();

    $('#new_category').submit((e) => {
        $('#form_new_category').modal('hide');
        e.preventDefault();
        newCategory();
        $('#select_categories').html('<option value="all">all</option>');
        listCategories();
    });

    $('#select_categories').change(() => {
        fetchTodos($('#select_categories option:selected').text());
    });

    $('#button-closesession').click(() => {
        closeSession();
    });

    $('#datepicker').datetimepicker({
        uiLibrary: 'bootstrap4',
        modal: true,
        footer: true,
        showRightIcon: false,
        format: 'h:MM TT yyyy-mm-dd'
    });

    $('#form-save-todo').keypress(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            saveTodo();
            fetchTodos();
            clearFormTodo();
        }
    });

    $('#btn_save_todo').click(function (e) {
        e.preventDefault();
        saveTodo();
        fetchTodos();
        clearFormTodo();
    });

    $('#input-todo').on('keypress', function () {
        $('#form_new_todo_date').collapse('show');
    });

    $('#btn_show_new_todo_form').click(function () {
        $('#form_new_todo_date').collapse('toggle');
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
                    fetchTodos($('#select_categories option:selected').text());
                    console.log('Edit todo: ' + response);
                } else {
                    //TODO: Show message here
                }
            });
        }
    });

    $('#todos').on('click', '#check-todo', function () {
        if (confirm('¿Are you sure?')) {
            let element = $(this)[0].parentElement.parentElement.parentElement;
            let ID = $(element).attr('todo-id');

            $.post('./php/check_todo.php', {
                ID: ID
            }, function () {
                fetchTodos();
            });
        }
    });

    $('#todos').on('click', '#btn-show-edit-todo', function () {
        let element = $(this)[0].parentElement.parentElement.parentElement;
        let ID = $(element).attr('todo-id');

        $.post('./php/fetch_one_todo.php', {
            ID: ID
        }, function (response) {

            let todo = JSON.parse(response);
            let date = null;
            let dateFormated = {};
            if (todo.Due_date) {
                date = new Date(todo.Due_date);
                dateFormated = dateFormat(date, 'h:MM TT yyyy-mm-dd');
            }

            $('#input_edit_date_' + ID).datetimepicker({
                uiLibrary: 'bootstrap4',
                modal: true,
                footer: true,
                showRightIcon: false,
                format: 'h:MM TT yyyy-mm-dd',
                value: date ? dateFormated : null
            });
        });
    });

    $('#todos').on('click', '#btn_save_changes_todo', function () {
        let buttonRoot = $(this)[0];

        let element_id = $(buttonRoot).parents('#todo-container');
        let ID = $(element_id).attr('todo-id');

        let edit_menu_elements = $(buttonRoot).parents('#edit-menu-' + ID)

        let todo = $(edit_menu_elements).find('input#input_edit_todo').val();

        let due_Date = $(edit_menu_elements).find('input#input_edit_date_' + ID).val();

        let date = null;
        let dateFormated = {};

        if (due_Date) {
            date = new Date(due_Date);
            dateFormated = dateFormat(date, 'yyyy-mm-dd HH:MM:ss');
        }

        let category_ID = $(edit_menu_elements).find('#input_edit_category').find(':selected').val();

        let updatedValues = {
            id: ID,
            todo: todo,
            date: date ? dateFormated : null,
            category_ID: category_ID
        }

        $.post('./php/edit_todo.php', updatedValues, (res) => {
            if (res == 1) {
                fetchTodos($('#select_categories option:selected').text());
            } else {

            }
        });

    });

});

function newCategory() {
    let newCategory = {
        category_name: $('#category_name').val()
    }

    $.post('./php/save_category.php', newCategory, (res) => {
        if (res == 1) {
            console.log(res);
            swal('¡Category created successfully!', {
                icon: 'success'
            })
        } else {
            swal('¡Oh no!', 'Something is wrong when saving category', 'error');
        }
    });
}

function closeSession() {
    $.get('./php/close_session.php', function (res) {
        if (res == 1) {
            swal('Good Bye', 'Session closed correctly', 'success').then(() => {
                window.location = './views/login/signin.html';
            });
        } else if(res == 0) {
            swal('¡Oh no!', 'Something is wrong when closing the session', 'error')
        }
    });
}

function isLoggedIn () {
    $.get('./php/isLoggedIn.php', function(res) {
        if (res == "01") {
            return;
        } else {
            window.location = './views/login/signin.html';
        }
    });
}

function getCurrentDateTime() {
    return dateFormat(new Date(), "h:MM TT yyyy-mm-dd");
}

function clearFormTodo() {
    $('#input-todo').val('');
    $('#datepicker').val('');
    $('#input-select-category').val(1);
    $('#form_new_todo_date').collapse('hide');
}

function saveTodo() {

    let todo = $('#input-todo').val();

    let due_Date = $('#datepicker').val();
    let due_Date_Formated = dateFormat(due_Date, 'yyyy-mm-dd HH:MM:ss');

    let category_ID = $('#input-select-category').val();

    const newTodo = {
        todo: todo,
        due_Date: due_Date ? due_Date_Formated : null,
        category_ID: category_ID
    };

    $.post('./php/save_todo.php', newTodo, (res) => {
        fetchTodos($('#select_categories option:selected').text());
        $('#form-save-todo').trigger('reset');
    });
}

function editTodo(ID) {
    $.post('')
}

function showSelectCategories() {
    let previus_template = $('#select-categories').html();

    $.get('')
}

function fetchUserCategories(allUserCategories, todoCategory) {
    let template = '';
    allUserCategories.forEach(allUserCategories => {
        if (allUserCategories.Name == todoCategory) {
            template += `<option value="${allUserCategories.ID}" selected>${allUserCategories.Name}</option>`;
        } else {
            template += `<option value="${allUserCategories.ID}">${allUserCategories.Name}</option>`;
        }
    });
    return template;
}

function listCategories() {
    $.get('./php/fetch_categories.php', 'aplication/json', (response) => {
        try {
            let categories = JSON.parse(response);

            let new_template = '';

            categories.forEach(category => {
                new_template += `<option value="${category.ID}">${category.Name}</option>`;
            });

            $('#input-select-category').html(new_template);

            let previus_template = $('#select_categories').html();

            $('#select_categories').html(previus_template + new_template);

        } catch (error) {
            console.log(error + ' ' + response);
        }
    });
}

function fetchTodos(whichCategory) {

    whichCategory = whichCategory ? whichCategory : 'all';

    $.get('./php/fetch_todos.php?category=' + whichCategory, 'aplication/json', (response) => {

        try {
            
            let todos_categories = JSON.parse(response);

            let todos = JSON.parse(todos_categories[0]);

            let categories = JSON.parse(todos_categories[1]);

            let template = '';

            todos.forEach(todo => {

                if (todo.Due_date == "0000-00-00 00:00:00") {
                    return;
                }

                let due_Date_Array = [];

                if (todo.Due_date) {
                    let due_Date = dateFormat(new Date(todo.Due_date), "yyyy-mm-dd,hh:MM TT");
                    due_Date_Array = due_Date.split(",");
                }

                template +=
                    `
                <div class="list-group-item bg-dark-lux mb-1" id="todo-container" todo-id="${todo.ID}">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <span class="d-flex flex-column">
                                                <div class="row">
                                                    <div class="col-md-12 todo_content">
                                                        <span>${todo.Todo}</span>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-12 badge-container">
                                                        <span class="badge badge-primary badge-pill align-self-start"><i
                                                                class="far fa-calendar"></i> ${due_Date_Array[0] ? due_Date_Array[0] : "Without date"}</span>
                                                        <span class="badge badge-primary badge-pill align-self-start ml-1"><i
                                                                class="far fa-clock"></i> ${due_Date_Array[1] ? due_Date_Array[1] : "Without hour"}</span>
                                                        <span class="badge badge-success badge-pill align-self-start ml-1"><i
                                                                class="fas fa-layer-group"></i> ${todo.Category_name}</span>
                                                    </div>
                                                </div>
                                            </span>
                                            <span>
                                                <button class="btn btn-primary" id="btn-show-edit-todo" type="button"
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
                                            <div class="row mt-4">
                                                <div class="col-md-12">
                                                    <input class="form-control" id="input_edit_todo" type="text" value="${todo.Todo}" placeholder="Edit your todo here"/>
                                                </div>
                                            </div>
                                            <div class="row mt-4">
                                                <div class="col-md-12">
                                                    <div class="row d-flex justify-content-between m-auto">
                                                        <div class="col-md-6 pb-3">
                                                            <div class="input-group bg-dark-lux">
                                                                <input class="form-control bg-white" type="text"
                                                                    id="input_edit_date_${todo.ID}" placeholder="Edit your Due Date here"
                                                                    autocomplete="off">
                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 pb-3">
                                                            <div class="input-group d-flex">
                                                                <select class="form-control bg-white" name="todo_category" id="input_edit_category">
                                                                     ${fetchUserCategories(categories, todo.Category_name)}
                                                                </select>
                                                                <div class="input-group-append">
                                                                    <button
                                                                        class="input-group-text d-flex bg-dark-lux text-muted">
                                                                        <i class="far fa-folder"></i>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-12">
                                                            <button class="btn btn-block btn-light form-control" id="btn_save_changes_todo">
                                                                <i class="far fa-save"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
            `;
            });

            $('#todos').html(template);
        } catch (error) {
            console.log(error + ' ' + response);
        }

    })
}