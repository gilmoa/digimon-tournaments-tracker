<?php
  $pwd = $_GET['pwd'];

  if($pwd != "6484") {
    echo("Wrong code.");
    return 1;
  }

  $datas = json_encode(json_decode($_GET['datas']));
  $file = fopen("api.json", "w") or die ("Error while saving.");
  fwrite($file, $datas);
  fclose($file);

  echo("Saved.");
?>
