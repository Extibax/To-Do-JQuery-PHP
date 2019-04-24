<?php

require_once 'connection.php';

if (isset($_SESSION['User']) && isset($_POST['id']) && isset($_POST['todo']) && isset($_POST['category_ID'])) {

    $id = $_POST['id'];
    $todo = $_POST['todo'];
    $date = $_POST['date'];
    $category_ID = $_POST['category_ID'];

    if ($id) {
        $query = "UPDATE todos SET Category_id = :category_ID, Todo = :todo, Due_date = :due_Date WHERE ID = :id";

        $result = $dbh->prepare($query);

        $result->bindValue(':category_ID', $category_ID);

        $result->bindValue(':todo', $todo);

        $result->bindValue(':due_Date', $date ? $date : null, PDO::PARAM_STR);

        $result->bindValue(':id', $id);

        echo $result->execute() ? "" : "Error: " . $result->infoError();

        if ($result->rowCount() > 0) {
            echo 1;
        } else {
            echo 0;
        }
    }

} else {
    echo "Outside: 0";
}
