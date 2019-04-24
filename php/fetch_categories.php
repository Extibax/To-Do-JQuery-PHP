<?php
require_once 'connection.php';

if (isset($_SESSION['User'])) {

    $ID = $_SESSION['User']['ID'];

    $query = "
        SELECT *  
        FROM categories 
        WHERE User_id = ?
    ";

    $stms = $dbh->prepare($query);

    $stms->bindValue(1, $ID);

    echo $stms->execute() ? "" : "Error: " . $stms->errorInfo();

    $categories = $stms->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($categories);
}
