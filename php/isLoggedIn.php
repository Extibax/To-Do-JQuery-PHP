<?php

if (!$_SESSION) {
    session_start();
}

if (isset($_SESSION['User'])) {
    echo "01";
} else {
    echo "00";
}