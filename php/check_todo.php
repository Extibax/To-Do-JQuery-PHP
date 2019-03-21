<?php

require_once 'connection.php';

if (isset($_POST['ID'])) {
    $ID = mysqli_real_escape_string($connection, $_POST['ID']);

    if (!empty($ID) && is_numeric($ID)) {
        $query = "DELETE FROM todos WHERE ID = $ID";
        $result = mysqli_query($connection, $query);

        if ($result) {
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