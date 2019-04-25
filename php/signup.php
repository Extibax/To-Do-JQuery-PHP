<?php

if (isset($_POST['name']) && isset($_POST['username']) && isset($_POST['password'])) {

    require 'connection.php';

    $name = $_POST['name'];
    $username = $_POST['username'];

    $usernameDB = $dbh->prepare("SELECT username FROM users WHERE username = :username");
    $usernameDB->bindValue(':username', $username);
    echo $usernameDB->execute() ? "" : "Error: " . $usernameDB->errorInfo();

    if ($usernameDB->rowCount() > 0) {
        echo 2;
        die();
    }

    if ($name && $username && $_POST['password']) {

        $encrypted_password = password_hash($_POST['password'], PASSWORD_BCRYPT, ['cost' => 8]);

        $signup = $dbh->prepare("INSERT INTO users VALUES (null, :username, :password, null, :name)");

        $signup->bindValue(':username', $username, PDO::PARAM_STR);

        $signup->bindValue(':password', $encrypted_password, PDO::PARAM_STR);

        $signup->bindValue(':name', $name, PDO::PARAM_STR);

        echo $signup->execute() ? "" : "Error: " . $signup->infoError();

        $newUserID = $dbh->lastInsertId();

        $default_category = $dbh->prepare("INSERT INTO categories VALUES (null, 'inbox', ?)");

        $default_category->bindValue(1, $newUserID);

        $default_category->execute() ? "" : "Error: " . $default_category->infoError();
        
        if ($signup->rowCount() > 0) {
            echo 1;
        } else {
            echo 0;
        }
    } else {
        echo "All inputs are necessary";
    }

} else {
    echo 'Params not fulfilled';
}
