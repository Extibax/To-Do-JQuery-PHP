<?php

if (isset($_POST['ID']) && isset($_POST['Todo'])) {
    require_once 'connection.php';

    $id = mysqli_real_escape_string($connection, $_POST['ID']);
    $todo = mysqli_real_escape_string($connection, $_POST['Todo']);

    $edit_errors = array();

    if (empty($id) || !is_numeric($id)) {
        $edit_errors['ID'] = "Esta vacio o contiene caracteres no numericos";
    }

    if (empty($todo) || is_numeric($todo)) {
        $edit_errors['Todo'] = "Esta vacio o no contiene letras";
    }

    if (count($edit_errors) == 0) {
        $query = "UPDATE todos SET Todo = '$todo' WHERE ID = $id";
        $result = mysqli_query($connection, $query);

        if ($result) {
            echo 1;
        } else {
            echo 0;
        }
    } else {
        $edit_errors_json = json_encode($edit_errors);
        echo $edit_errors_json;
    }

} else {
    echo 0;
}