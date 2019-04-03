<?php

require_once 'connection.php';

$query = 
"SELECT todo.*, category.Name AS 'Category_name'
FROM users user
INNER JOIN categories category ON user.ID = category.User_id
INNER JOIN todos todo ON user.ID = todo.User_id
ORDER BY todo.ID DESC";
$result = mysqli_query($connection, $query);

if (!$result) {
    die('Query show todos failed: '.mysqli_error($connection));
}

$todos = array();

while($todo = mysqli_fetch_array($result))
{
    $todos[] = $todo;
}

$todos_json = json_encode($todos);

echo $todos_json;