<?php

require_once $baseREP.'/PHP/class_access.php' ;

use \Page\Access ;


// on lance une session si cela n'existe pas
if (session_status() == PHP_SESSION_NONE)
	session_start();



  // on vérifie que l'on a les droits pour accéder à la page
  // si on n'a pas les droits, on est redirigé vers la page index.php
  if ( isset($_SESSION['current_user']) )
  {
  	$objAC = new Access ;
  	if (! $objAC->IsVisibleBy('./JobGenerateFiles.php',$_SESSION['current_user']->group_name))
  	{
  		header('Location: ./') ;
  		exit() ;
  	}
  }
  else
  {
  	header('Location: ./') ;
  	exit() ;
  }




include $baseREP.'/PHP/config.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}
$conn->set_charset('utf8');






// on peut commencer le traitement des fichiers
$repertoireTemplates = $baseREP."/LANG/ALL/" ;


	// on récupère tous les items à changer et on fait toutes les modifications
$sql1 = "select distinct parameter from Config" ;
echo "sql: ".$sql1."<br>" ;
$result1 = $conn->query($sql1);
if ($result1->num_rows > 0)
{

  // output data of each row
  while($row1 = $result1->fetch_assoc())
  {

  	// on récupère la langue
		$lang = $row1['parameter'] ;
		$repertoireCible = $baseREP."/LANG/".$lang."/" ;


		// on efface tous les fichiers du répertoire pour la langue sélectionnée
		$rep=opendir($repertoireCible);
		while($file = readdir($rep))
		{
			if($file != '..' && $file !='.' && $file !='' && $file!='.htaccess')
			{
				unlink($repertoireCible.$file);
			}
		}



		// Pour chaque fichier du répertoire ALL, il faut générer un fichier dans le répertoire de la langue sélectionnée
		$rep=opendir($repertoireTemplates);
		while($file = readdir($rep))
		{
			if($file != '..' && $file !='.' && $file !='' && $file!='.htaccess'  && $file !='.DS_Store')
			{
				$fichierSource = $repertoireTemplates.$file ;
				echo "Fichier source:  ".$fichierSource."<br>" ;
				$fichierCible = $repertoireCible.$file ;
				echo "Fichier cible:  ".$fichierCible."<br><br>" ;


				// on ouvre le fichier source
				$contenu = file_get_contents($fichierSource) ;


				// on récupère tous les items à changer et on fait toutes les modifications
				$sql = "select * from Config where typeitem like '[%]' and parameter = '".$lang."'" ;
				echo "sql: ".$sql."<br>" ;
				$result = $conn->query($sql);
				if ($result->num_rows > 0)
				{

				  while($row = $result->fetch_assoc())
				  {
				  	echo "on remplace ".$row['typeitem']." par ".$row['item']."<br>" ;
				  	$contenu = str_replace($row['typeitem'],$row['item'],$contenu) ;
				  }

				  echo "<br><br><br>" ;
				}


				// on écrit dans le fichier cible
				$myfile = fopen($fichierCible, "w") or die("Unable to open file: ".$fichierCible);
				fwrite($myfile, $contenu);
				fclose($myfile);
			}
		}

	}

}



$conn->close();
?>
