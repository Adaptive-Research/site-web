<?php



class Ville_API
{
  public $id ;
  public $CodePostal ;
  public $VilleMinu ;
  public $PopulationTotale ;
}




//echo "ID= ".$id."\n" ;

include __DIR__.'/../PHP/config.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}
$conn->set_charset('utf8');


$sql = "select * from Villes where CodePostal = \"".$CodePostal."\"  order by PopulationTotale desc" ;

//echo $sql ;

$arr = [] ;

$result = $conn->query($sql);
if ($result->num_rows > 0)
{
  while($row = $result->fetch_assoc())
  {
    $objV = new Ville_API ;
    $objV->id = $row['id'] ;
    $objV->VilleMinu = $row['VilleMinu'] ;
    $objV->CodePostal = $row['CodePostal'] ;
    $objV->PopulationTotale = $row['PopulationTotale'] ;
    array_push($arr,$objV) ;
  }
}
echo json_encode($arr) ;


?>
