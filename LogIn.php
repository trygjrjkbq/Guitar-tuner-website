<?php
session_start();
include("database.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Website</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="header">
            
        <h1 id="welcomeHeader">Log In!</h1>
            
        <nav class="navbar">
            <ul>
                <div class="lang" id="lang" onclick="langSwitchCheck()"><img id="langIcon" src="images/LanguagePolish.jpg"></div>
                <li><a id="Log" href="LogIn.php">Log in!</a></li>
            </ul>
            <ul id = "u2" class="u2">
                <li><a id="Nav1" href="website.html">Home Page</a></li>
                <li><a id="Nav2"href="https://platforma.polsl.pl/rau1/">PZE site</a></li>
                <li><a id="Nav3"href="components.html">Used components</a></li>
                <li><a id="Nav4"href="tutorials.html">Tutorials</a></li>
                <li><a id="Nav5" href="https://lemon.aei.polsl.pl/tiwordpress2025/su52/">Contact Us</a></li>
            </ul>
        </nav>
        <hr>
    </header>

    <main>
        <div class="info" id="info">
            <h2>Guitar Tuner</h2>
            <p>You can make your account to use your tuner and write comments. <br> When you already have account, log in and your saved settings will be set on. </p>
        </div>
        <br>

        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
            <h3>Log in!</h3>
            username:<br>
            <input class="logIns" type="text" name="username"><br><br>
            password:<br>
            <input class="logIns" type="password" name="password"><br><br>

            <!-- Two przyciski do wyboru akcji -->
            <button class="buttonstyleplay" type="submit" name="action" value="register">register</button>
            <button class="buttonstyleplay" type="submit" name="action" value="login">login</button>
            <br><br>

            <?php
            if($_SERVER["REQUEST_METHOD"] == "POST"){
                $action = $_POST['action'] ?? '';

                $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_SPECIAL_CHARS);
                $password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_SPECIAL_CHARS);

                if(empty($username)){
                    echo"Please enter a username";
                }
                elseif(empty($password)){
                    echo"Please enter a password";
                }
                elseif (mb_strlen($username) > 100 || mb_strlen($password) < 6){
                    echo"Username too long or password too short (min 6)";
                }
                else{

                    /*
                     *  =======================
                     *       REGISTER
                     *  =======================
                     */
                    if($action === 'register') {

                        $hash = password_hash($password, PASSWORD_DEFAULT);

                        $sql = "INSERT INTO users (username, password_hash)
                                VALUES (?, ?)";

                        $stmt = mysqli_prepare($conn, $sql);
                        mysqli_stmt_bind_param($stmt, "ss", $username, $hash);

                        try {
                            mysqli_stmt_execute($stmt);
                            echo "You are now registered!";
                        }
                        catch(mysqli_sql_exception){
                            echo "That username is taken";
                        }

                        mysqli_stmt_close($stmt);
                    }

                    /*
                     *  ====================
                     *        LOGIN
                     *  ====================
                     */
                    elseif ($action === 'login') {

                        $sql = "SELECT id, password_hash FROM users WHERE username = ?";
                        $stmt = mysqli_prepare($conn, $sql);
                        mysqli_stmt_bind_param($stmt, "s", $username);
                        mysqli_stmt_execute($stmt);
                        $result = mysqli_stmt_get_result($stmt);

                        if ($row = mysqli_fetch_assoc($result)) {

                            if (password_verify($password, $row['password_hash'])) {

                                // sukces logowania
                                $_SESSION['user_id'] = $row['id'];
                                $_SESSION['username'] = $username;

                                echo "Logged in! Redirecting...";

                                header("Refresh: 1; URL=website.html");
                                exit;
                            }
                            else {
                                echo "Wrong password!";
                            }

                        } else {
                            echo "User does not exist!";
                        }

                        mysqli_stmt_close($stmt);
                    }
                }
            }
            ?>
        </form>
    </main>

    <script src="language.js"></script>
    <script src="langpolish.js"></script>
    <script src="index.js"></script>

    <br>
    <footer style="background-color: rgb(95, 8, 8)">
        <hr>
        Authors: Filip Duda and Jakub Garus</br>
        &copy; 2025 copyright reserved<br>
        <small><a href="mailto:Ja@fake.com">Ja@fake.com</a>
    </footer>
</body>
</html>