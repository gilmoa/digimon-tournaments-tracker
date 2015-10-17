<?php
  $datas = $_GET['datas'];
  $file = fopen("api.json", "w") or die ("Impossibile aprire il file.");
  fwrite($file, $datas);
  fclose($file);

  echo("Saved.");
?>
