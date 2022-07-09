<?php
    


// définition des fichiers à lire
$fheader = $baseLP."/templates/header.html" ;
$fichier = $baseLP."/templates/index.html" ;
$footer = $baseLP."/templates/footer.html" ;


// récupération du contenu
$contenu = file_get_contents($fheader) ;
$contenu = $contenu.file_get_contents($fichier) ;


// script pour effacer les cookies de session PHP 
$contenu = $contenu.'
<script>
     document.cookie = "PHPSESSID=;Path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
</script>
' ;

$contenu = $contenu.file_get_contents($footer) ;

echo $contenu ;

?>