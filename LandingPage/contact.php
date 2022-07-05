<?php
    

// définition des fichiers à lire
$fheader = $baseLP."/templates/header.html" ;
$fichier = $baseLP."/contact.html" ;
$footer = $baseLP."/templates/footer.html" ;


// récupération du contenu
$contenu = file_get_contents($fheader) ;
$contenu = $contenu.file_get_contents($fichier) ;
$contenu = $contenu.file_get_contents($footer) ;

echo $contenu ;

?>