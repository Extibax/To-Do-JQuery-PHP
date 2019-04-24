<?php

require_once 'connection.php';

if (isset($_SESSION['User']) && isset($_POST['todo'])) {

    $ID = $_SESSION['User']['ID'];

    $todo = $_POST['todo'] ? $_POST['todo'] : false;
    $due_Date = $_POST['due_Date'] ? $_POST['due_Date'] : false;
    $category_ID = $_POST['category_ID'] ? $_POST['category_ID'] : false;

    if ($todo && !empty($todo) && !is_numeric($todo)) {

        $query = "INSERT INTO todos (User_id, Category_id, Todo, Due_date) VALUES (?, ?, ?, ?)";

        $result = $dbh->prepare($query);

        $result->bindValue(1, $ID);

        $result->bindValue(2, $category_ID);

        $result->bindValue(3, $todo);

        $result->bindValue(4, $due_Date ? $due_Date : null, PDO::PARAM_STR);

        echo $result->execute() ? "" : "Error: " . $result->infoError();

        if ($result->rowCount() > 0) {
            echo 1;
        } else {
            echo 0;
        }
    }
} else {
    echo "Todo POST not exists";
}