<?php


class ShowDomaines_API
{
  public $id ;
  public $idActivityRun ;
  public $idActivity ;
  public $Domaine ;
  public $isRelevant ;
  public $TotalScoring ;
  public $TotalOrganicRanking ;
  public $date ;
}


include $baseREP.'/PHP/config.php';

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error)
    die("Connection failed: " . $conn->connect_error);
$conn->set_charset('utf8');

$sql = "select * from SiteWeb_Ranking sr where sr.iscurrent = 1 and sr.idActivityRun = ".$idActivityRun." order by TotalOrganicRanking asc " ;


$arr = [] ;
$result = $conn->query($sql);
if ($result->num_rows > 0)
{
  while($row = $result->fetch_assoc())
  {
    $objK = new ShowDomaines_API ;
    $objK->id = $row['id'] ;
    $objK->idActivityRun = $row['idActivityRun'] ;
    $objK->idActivity = $row['idActivity'] ;
    $objK->Domaine = $row['Domaine'] ;
    $objK->isRelevant = $row['isRelevant'] ;
    $objK->TotalScoring = $row['TotalScoring'] ;
    $objK->TotalOrganicRanking = $row['TotalOrganicRanking'] ;
    $objK->date = $row['date'] ;

    array_push($arr,$objK) ;
  }
}
echo json_encode($arr) ;


?>
