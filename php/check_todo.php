<?php

require_once 'connection.php';

if (isset($_SESSION['User']) && isset($_POST['ID'])) {
    $ID = $_POST['ID'];

    if (!empty($ID) && is_numeric($ID)) {
        $result = $dbh->prepare("DELETE FROM todos WHERE ID = ?");

        $result->bindValue(1, $ID);

        echo $result->execute() ? "" : "Error: " . $result->infoError();

        if ($result->rowCount() > 0) {
            echo 1;
        } else {
            echo 0;
        }
    } else {
        echo 0;
    }
} else {
    echo 0;
}