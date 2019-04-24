<?php

$_SESSION['User']['ID'] = 1;

if (isset($_SESSION['User']['ID'])) {

    require_once 'connection.php';

    $ID = $_SESSION['User']['ID'];

    $rows = $dbh->prepare("SELECT COUNT(*) FROM todos WHERE User_id = ?");

    $rows->bindValue(1, $ID);

    $rows->execute();

    if ($rows->fetchColumn() > 0) {

        $query = "
            SELECT t.*, c.Name AS 'Category_name' 
            FROM todos t 
            INNER JOIN categories c ON t.Category_id = c.ID 
            WHERE t.User_id = ? ORDER BY t.ID DESC
        ";

        $result_todos = $dbh->prepare($query);

        $result_todos->bindValue(1, $ID);

        echo $result_todos->execute() ? "" : "Error: " . $result_todos->infoError();

        $todos = array();

        while ($todo = $result_todos->fetch(PDO::FETCH_ASSOC)) {
            $todos[] = $todo;
        }

        $todos_json = json_encode($todos);

        echo $todos_json;
    }
}
