<?php

if (isset($_POST['ID']) && is_numeric($_POST['ID'])) {
    require_once 'connection.php';

    $ID = mysqli_real_escape_string($connection, $_POST['ID']);

    $query = "SELECT * FROM todos WHERE ID = $ID";
    $result = mysqli_query($connection, $query);

    if (mysqli_num_rows($result) == 1) {
        $todo = mysqli_fetch_assoc($result);
        $jsonTodo = json_encode($todo);
        echo $jsonTodo;
    } else {
        echo 0;
    }
} else {
    echo 0;
}