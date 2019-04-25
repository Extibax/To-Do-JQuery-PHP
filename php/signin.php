<?php

if (isset($_POST['username']) && isset($_POST['password'])) {

    require 'connection.php';

    $username = $_POST['username'];

    if ($_POST['password']) {

        $rows = $dbh->prepare("SELECT COUNT(*) FROM users WHERE Username = ?");

        $rows->bindValue(1, $username);

        echo $rows->execute() ? "" : "Error: " . $rows->infoError();

        $num_rows = $rows->fetchColumn();

        if ($num_rows > 0) {

            $userDB = $dbh->prepare("SELECT * FROM users WHERE Username = ?");

            $userDB->bindValue(1, $username, PDO::PARAM_STR);

            echo $userDB->execute() ? "" : "Error: " . $userDB->infoError();

            $userDBFetch = $userDB->fetch(PDO::FETCH_ASSOC);

            if (password_verify($_POST['password'], $userDBFetch['Password'])) {
                $_SESSION['User'] = $userDBFetch;
                echo 1;
            } else {
                echo 0;
            }
        } else {
            echo 0;
            die();
        }
    }
}
