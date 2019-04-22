<?php

if (isset($_POST['ID']) && is_numeric($_POST['ID'])) {
    require_once 'connection.php';

    $ID = $_POST['ID'];

    $rows = $dbh->prepare("SELECT COUNT(*) FROM todos WHERE ID = ?");

    $rows->bindValue(1, $ID);

    $rows->execute() ? "" : "Error: " . $rows->infoError();

    if ($rows->fetchColumn() > 0) {
        $result = $dbh->prepare("SELECT * FROM todos WHERE ID = ?");

        $result->bindValue(1, $ID);

        $result->execute() ? "" : "Error: " . $result->infoError();

        $todo = $result->fetch(PDO::FETCH_ASSOC);

        $todo_json = json_encode($todo);

        echo $todo_json;
    } else {
        echo 0;
    }

    
} else {
    echo 0;
}
