<?php

    $db_serwer = "localhost";
    $db_user = "root";
    $db_pass = "";
    $db_name = "guitartuner";
    $conn = "";

    try{
            $conn = mysqli_connect($db_serwer, $db_user, $db_pass, $db_name);
    }
    catch(mysqli_sql_exception){
        echo"Could not connect! <br>";
    }
?>