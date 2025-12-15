<?php
session_start();
include("database.php");

function escape($s){ return htmlspecialchars($s, ENT_QUOTES|ENT_SUBSTITUTE, 'UTF-8'); }

// fetch comments
$res = mysqli_query($conn, "SELECT c.content, c.created_at, u.username FROM comments c JOIN users u ON c.user_id = u.id ORDER BY c.created_at DESC");
$rows = mysqli_fetch_all($res, MYSQLI_ASSOC);
?>
<!doctype html>
<html><head><meta charset="utf-8"><title>Komentarze</title></head><body>
  <h1>Komentarze</h1>
  <?php if (!empty($_SESSION['user_id'])): ?>
    <form method="post" action="post_comment.php">
      <textarea name="content" required rows="4" cols="50"></textarea><br>
      <button type="submit">Dodaj komentarz</button>
    </form>
    <p><a href="dashboard.php">Powrót do panelu</a></p>
  <?php else: ?>
    <p><a href="LogIn.php">Zaloguj się</a>, aby dodać komentarz.</p>
  <?php endif; ?>

  <hr>
  <?php foreach ($rows as $r): ?>
    <div style="border:1px solid #ddd; padding:8px; margin-bottom:6px;">
      <strong><?php echo escape($r['username']); ?></strong>
      <small><?php echo escape($r['created_at']); ?></small>
      <p><?php echo nl2br(escape($r['content'])); ?></p>
    </div>
  <?php endforeach; ?>

</body></html>