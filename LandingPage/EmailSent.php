<?php
   




// définition des fichiers à lire
$fheader = $baseLP."/templates/header.html" ;
$fichier = $baseLP."/templates/EmailSent.html" ;
$footer = $baseLP."/templates/footer2.html" ;



// récupération du contenu
$contenu = file_get_contents($fheader) ;
$contenu = $contenu.file_get_contents($fichier) ;
$contenu = $contenu.file_get_contents($footer) ;



echo $contenu ;

?>