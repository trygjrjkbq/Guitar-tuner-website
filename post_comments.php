<?php
session_start();
include("database.php");
if (empty($_SESSION['user_id'])) { header('Location: LogIn.php'); exit; }
$uid = $_SESSION['user_id'];
$content = trim($_POST['content'] ?? '');
if ($content === '') { header('Location: comments.php'); exit; }

// ograniczenie długości i bezpieczne wstawienie
if (mb_strlen($content) > 2000) $content = mb_substr($content,0,2000);

$stmt = mysqli_prepare($conn, "INSERT INTO comments (user_id, content) VALUES (?, ?)");
mysqli_stmt_bind_param($stmt, "is", $uid, $content);
mysqli_stmt_execute($stmt);
mysqli_stmt_close($stmt);

header('Location: comments.php');
exit;