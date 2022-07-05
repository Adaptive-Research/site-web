<?php


class ShowAds_API
{
  public $idActivity ;
  public $idRun ;
  public $DateRun ;
  public $Keywords ;
  public $NombreAnnonces ;
}


include __DIR__.'/../PHP/config.php';

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error)
    die("Connection failed: " . $conn->connect_error);
$conn->set_charset('utf8');


if ($idActivity > 0)
{
  $sql = "select k.Keywords, kru.id as idRun, kru.DateRun as DateRun ,count(*) as NombreAnnonces from Keywords_Ranking kra, Keywords_Run kru, Keywords k where " ;
  $sql = $sql." kra.idKeywords_Run = kru.id " ;
  $sql = $sql." and kru.idKeywords = k.id and k.id in (select ka.idKeywords from Keywords_Activity ka where " ;
  $sql = $sql." ka.idActivity = ".$idActivity." and ka.iscurrent = 1) " ;
  $sql = $sql." and kra.iscurrent = 1 and kru.iscurrent = 1 and k.iscurrent = 1 and kra.TypeURL = 'Annonce' " ;
  $sql = $sql." group by  k.Keywords, kra.idKeywords_Run order by k.Keywords, kra.idKeywords_Run " ;
}
else
{
  $sql = "select k.Keywords, kru.id as idRun, kru.DateRun as 'DateRun',count(*) as 'NombreAnnonces' from Keywords_Ranking kra, Keywords_Run kru, Keywords k where " ;
  $sql = $sql." kra.idKeywords_Run = kru.id " ;
  $sql = $sql." and kru.idKeywords = k.id " ;
  $sql = $sql." and kra.iscurrent = 1 and kru.iscurrent = 1 and k.iscurrent = 1 and kra.TypeURL = 'Annonce' " ;
  $sql = $sql." group by  k.Keywords, kra.idKeywords_Run order by k.Keywords, kra.idKeywords_Run " ;
}



$arr = [] ;
$result = $conn->query($sql);
if ($result->num_rows > 0)
{
  while($row = $result->fetch_assoc())
  {
    $objK = new ShowAds_API ;

    $objK->idActivity = $idActivity ;
    $objK->idRun = $row['idRun'] ;
    $objK->DateRun = $row['DateRun'] ;
    $objK->Keywords = $row['Keywords'] ;
    $objK->NombreAnnonces = $row['NombreAnnonces'] ;
    array_push($arr,$objK) ;
  }
}
echo json_encode($arr) ;


?>
