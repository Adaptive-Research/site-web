<?php


include $baseREP.'/PHP/config.php';

$fheader = $PW."/pw-".$id."-links.txt" ;

$contenu = file_get_contents($fheader) ;
$contenu = str_replace("\n","<br>",$contenu) ;

echo $contenu ;

?>
