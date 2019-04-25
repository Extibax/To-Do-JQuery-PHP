<?php

session_start();

if (isset($_SESSION['User'])) {
    unset($_SESSION['User']);
    session_destroy();
    echo '1';
} else {
    echo '0';
}
