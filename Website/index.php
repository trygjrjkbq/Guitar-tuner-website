<?php
    include("database.php");

    /*$username = "Patrick";
    $password = "rock3";
    $hash = password_hash($password, PASSWORD_DEFAULT);

    /*$sql = "INSERT INTO users (user, password)
            VALUES ('$username', '$hash')";

    $sql = "SELECT * FROM users";

    try{
        $result = mysqli_query($conn, $sql);
        //echo"User is now registered";
    }
    catch(mysqli_sql_exception){
        echo"Could not register user";
    }

    if(mysqli_num_rows($result) > 0){
        while($row = mysqli_fetch_assoc($result)){
        echo $row["id"]. "<br>";
        echo $row["user"]. "<br>";
        echo $row["reg_date"]. "<br>";
        };
    }
    else{
        echo"No user found";
    }

    mysqli_close($conn);*/
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>
</head>
<body>
                <form action="<?php htmlspecialchars($_SERVER["PHP_SELF"]) ?>" method="post">
            <h3>Log in!</h3>
            username:<br>
            <input class="logIns" type="text" name="username"><br><br>
            password:<br>
            <input class="logIns" type="password" name="password"><br><br>
            <input id="logBtn" class="buttonstyleplay" type="submit" name="submit" value="register">
        </form>            
</body>
</html>
<?php
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_SPECIAL_CHARS);
        $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_SPECIAL_CHARS);

        if(empty($username)){
            echo"Please enter a username";
        }
        elseif(empty($password)){
            echo"Please enter a password";
        }
    }

    mysqli_close($conn);
?>