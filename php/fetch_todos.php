<?php

require_once 'connection.php';

$query = "SELECT * FROM todos ORDER BY ID DESC";
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