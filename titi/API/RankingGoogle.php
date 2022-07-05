<?php

require $baseREP."/PHP/config.php" ;


$fheader = $RG."/Rgoogle".$id.".txt" ;
$contenu = file_get_contents($fheader) ;

$tableau = "Run: ".$id."<br>" ;
$tableau = $tableau."<br>" ;
$tableau = $tableau."<table style=\"border: 1px solid black\">" ;
$tableau = $tableau."<thead style=\"background-color:#AAAAAA\" >  <th style=\"width:5%\">Ranking</th>  <th style=\"width:15%\">Type</th>  <th>URL</th> </thead>\n";


$lignes = explode("\n", $contenu);
for ($i = 0 ; $i < sizeof($lignes)-1 ;$i++)
{
  $tableau = $tableau."<tr>" ;

  $tableau = $tableau."<td style=\"border: 1px solid black\">" ;
  $tableau = $tableau.($i+1) ;
  $tableau = $tableau."</td>" ;

  $ListeChamps = explode(";",$lignes[$i]) ;
  for ($j = 0 ; $j < sizeof($ListeChamps) ; $j++)
  {
    $tableau = $tableau."<td style=\"border: 1px solid black\">" ;
    $tableau = $tableau.$ListeChamps[$j] ;
    $tableau = $tableau."</td>" ;
  }
  $tableau = $tableau."</tr>" ;

}

$tableau = $tableau."</table>" ;

//echo $contenu ;
echo $tableau ;

?>
