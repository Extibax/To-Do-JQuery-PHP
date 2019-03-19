<?php

if (isset($_POST['Todo'])) {
    require_once 'connection.php';
    $Todo = mysqli_real_escape_string($connection, $_POST['Todo']);

    if (!empty($Todo) || !is_numeric($Todo)) {
        $query = "INSERT INTO todos (User_id, Category_id, Todo) VALUES (1, 1, '$Todo')";
        $result = mysqli_query($connection, $query);

        if ($result) {
            echo 1;
        } else {
            echo mysqli_error($connection);
        }
    }
} else {
    echo "Not isset Todo POST";
}