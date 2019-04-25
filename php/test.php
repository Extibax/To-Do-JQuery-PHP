<?php

echo 'Welcome';

require 'connection.php';

try {

    $category = 'weekend';

    $query = "
        SELECT t.*, c.Name AS 'Category_name' 
        FROM todos t 
        INNER JOIN categories c ON t.Category_id = c.ID 
        WHERE t.User_id = :userID AND c.Name = :selectedCategory ORDER BY t.ID DESC
    ";

    $result = $dbh->prepare($query);

    $result->bindValue(':userID', 1);
    $result->bindValue(':selectedCategory', $category);

    echo $result->execute() ? "<br>Success<br>" : "Error: " . $result->infoError();

    $rows = $result->fetchAll(PDO::FETCH_ASSOC);

    var_dump($rows);
} catch (PDOException $e) {
    echo $e;
}
