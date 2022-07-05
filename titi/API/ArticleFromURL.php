<?php

$contenu = "" ;

include $baseREP.'/PHP/config.php';

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error)
    die("Connection failed: " . $conn->connect_error);
$conn->set_charset('utf8');

$sql = "select URL from PagesWeb where id = ".$id ;
$result = $conn->query($sql);

if ($result->num_rows > 0)
{
  $row = $result->fetch_assoc() ;
  //echo "<script>alert('".$row['URL']."');</script>";

  $contenu = file_get_contents($row['URL']) ;

  /*
  $url = $row['URL'] ;
  $ch=curl_init();
  $timeout=5;
  
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
  
  // Get URL content
  $contenu=curl_exec($ch);
  // close handle to release resources
  curl_close($ch);
  //output, you can also save it locally on the server
  */

}

$conn->close();





echo $contenu ;

?>
