<?php



class Keyword_API
{
  public $id ;
  public $Keywords ;
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


$sql = "select * from Keywords_Activity ka, Keywords k where ka.iscurrent = 1 and ka.idActivity = ".$id." and k.id = ka.idKeywords and k.iscurrent = 1 order by k.Keywords" ;

//echo $sql ;

$arr = [] ;

$result = $conn->query($sql);
if ($result->num_rows > 0)
{
  while($row = $result->fetch_assoc())
  {
    $objK = new Keyword_API ;
    $objK->id = $row['idKeywords'] ;
    $objK->Keywords = $row['Keywords'] ;
    array_push($arr,$objK) ;
  }
}
echo json_encode($arr) ;


?>
