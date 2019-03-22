<?php

require dirname(__DIR__) . '/vendor/autoload.php';

$main_path = dirname(__DIR__);

$dotenv = Dotenv\Dotenv::create($main_path);
$dotenv->load();

echo $_ENV['NAME'];

$HOST = "localhost";
$USER = "root";
$PASS = "";
$DB = "to_do_extibaxinc";

$connection = mysqli_connect(
    $HOST,
    $USER,
    $PASS,
    $DB
);

?>