<?php

require 'connection.php';

if (isset($_SESSION['User']) && isset($_POST['category_name'])) {

    $user_id = $_SESSION['User']['ID'];

    $category_name = $_POST['category_name'];
    
    $save_category = $dbh->prepare("INSERT INTO categories VALUES (null, :category_name, :user_id)");

    $save_category->bindValue(':category_name', $category_name, PDO::PARAM_STR);

    $save_category->bindValue(':user_id', $user_id, PDO::PARAM_INT);

    echo $save_category->execute() ? "" : "Error: " . $save_category->infoError();

    if ($save_category->rowCount() > 0) {
        echo 1;
    } else {
        echo 0;
    }

} else {
    echo "Session not exists";
}