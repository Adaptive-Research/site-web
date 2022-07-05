<?php


class DatesDomaines_API
{
  public $id ;
  public $idDomaine ;
  public $sdate ;
}


include $baseREP.'/PHP/config.php';

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error)
    die("Connection failed: " . $conn->connect_error);
$conn->set_charset('utf8');

if ($idDomaine >= 0)
  $sql = "select * from SiteWeb_DatesDomaines where idDomaine = ".$idDomaine." order by id desc" ;




$arr = [] ;
$result = $conn->query($sql);
if ($result->num_rows > 0)
{
  while($row = $result->fetch_assoc())
  {
    $objK = new DatesDomaines_API ;
    $objK->id = $row['id'] ;
    $objK->idDomaine = $row['idDomaine'] ;
    $objK->sdate = $row['sdate'] ;
    array_push($arr,$objK) ;
  }
}
echo json_encode($arr) ;


?>
