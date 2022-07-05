<?php

$contenu = "" ;

include $baseREP.'/PHP/config.php';

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error)
    die("Connection failed: " . $conn->connect_error);
$conn->set_charset('utf8');

$sql = "select URL from Keywords_Ranking where id = ".$id ;
$result = $conn->query($sql);

if ($result->num_rows > 0)
{
  $row = $result->fetch_assoc() ;
  $contenu = file_get_contents($row['URL']) ;
}

$conn->close();





echo $contenu ;

?>
