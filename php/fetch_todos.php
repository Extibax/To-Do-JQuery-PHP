<?php

$_SESSION['User']['ID'] = 1;

if (isset($_SESSION['User']['ID'])) {

    require_once 'connection.php';

    $ID = $_SESSION['User']['ID'];

    $query = "SELECT * FROM todos WHERE User_id = $ID ORDER BY ID DESC";

    $result = mysqli_query($connection, $query);

    if (!$result) {
        die('Query show todos failed: ' . mysqli_error($connection));
    }

    if (mysqli_num_rows($result) > 0) {
        $todos = array();

        while ($todo = mysqli_fetch_assoc($result)) {
            $todos[] = $todo;
        }

        $todos_json = json_encode($todos);

        echo $todos_json;
    }
}
