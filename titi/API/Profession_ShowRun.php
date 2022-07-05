<?php


class ShowRunProfession_API
{
  public $id ;
  public $idProfession ;
  public $Profession ;
  public $Ville ;
  public $CodePostal;
  public $DateRun ;
}


include $baseREP.'/PHP/config.php';

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error)
    die("Connection failed: " . $conn->connect_error);
$conn->set_charset('utf8');

if ($id > 0)
  $sql = "select pr.id, pr.idProfession, p.Profession, pr.Ville, pr.CodePostal, pr.DateRun from Profession_Run pr, Profession p where p.id = pr.idProfession and pr.idProfession = ".$id." order by pr.id desc" ;
else
  $sql = "select pr.id, pr.idProfession, p.Profession, pr.Ville, pr.CodePostal, pr.DateRun from Profession_Run pr, Profession p where p.id = pr.idProfession order by pr.id desc" ;





$arr = [] ;
$result = $conn->query($sql);
if ($result->num_rows > 0)
{
  while($row = $result->fetch_assoc())
  {
    $objK = new ShowRunProfession_API ;
    $objK->id = $row['id'] ;
    $objK->Secteur = $row['Profession'] ;
    $objK->idProfession = $row['idProfession'] ;
    $objK->Ville = $row['Ville'] ;
    $objK->CodePostal = $row['CodePostal'] ;
    $objK->DateRun = $row['DateRun'] ;
    array_push($arr,$objK) ;
  }
}
echo json_encode($arr) ;


?>
