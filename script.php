<?php

require __DIR__ . '/vendor/autoload.php';

echo "Hello World";

/* $dotenv = new Dotenv\Dotenv(__DIR__); */
$dotenv = Dotenv\Dotenv::create(__DIR__);
$dotenv->load();

echo "Hello Again";
echo getenv('NAME');
echo $_ENV['NAME'];

var_dump($_SERVER);