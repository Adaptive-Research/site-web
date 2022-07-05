<?php


class ShowRunActivity_API
{
  public $id ;
  public $Secteur ;
  public $idActivity ;
  public $FirstIdKeywords_Run ;
  public $LastIdKeywords_Run ;
  public $DateRun ;
}


include $baseREP.'/PHP/config.php';

#echo "<script>alert('".$servername." ".$username." ".$dbname."');</script>";


$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error)
    die("Connection failed: " . $conn->connect_error);
$conn->set_charset('utf8');

if ($id > 0)
  $sql = "select ar.id, a.Secteur, ar.idActivity, ar.FirstIdKeywords_Run, ar.LastIdKeywords_Run, ar.DateRun from Activity_Run ar, Activity a where a.iscurrent = 1 and ar.iscurrent = 1 and a.id = ar.idActivity and ar.idActivity = ".$id." order by ar.id desc" ;
else
  $sql = "select a.id as idActivity, a.Secteur, Max(ar.id) as id,  Max(ar.FirstIdKeywords_Run) as FirstIdKeywords_Run, Max(ar.LastIdKeywords_Run)as LastIdKeywords_Run, Max(ar.DateRun) as DateRun from Activity_Run ar, Activity a where a.iscurrent = 1 and ar.iscurrent = 1 and a.id = ar.idActivity group by a.id, a.Secteur order by DateRun desc" ;




$arr = [] ;
$result = $conn->query($sql);
if ($result->num_rows > 0)
{
  while($row = $result->fetch_assoc())
  {
    $objK = new ShowRunActivity_API ;
    $objK->id = $row['id'] ;
    $objK->Secteur = $row['Secteur'] ;
    $objK->idActivity = $row['idActivity'] ;
    $objK->FirstIdKeywords_Run = $row['FirstIdKeywords_Run'] ;
    $objK->LastIdKeywords_Run = $row['LastIdKeywords_Run'] ;
    $objK->DateRun = $row['DateRun'] ;
    array_push($arr,$objK) ;
  }
}
echo json_encode($arr) ;


?>
