<?php


require_once $baseREP.'/PHP/class_access.php' ;
require_once $baseREP.'/PHP/lang.php' ;

use \Page\Access ;


require_once $baseREP.'/PHP/class_ProfessionEntreprise.php' ;
use \Entreprise\Profession_Entreprises ;


require_once $baseREP.'/PHP/class_Ville.php' ;
use \Entreprise\Ville ;



if (isset($_GET['SessionID']))
    session_id($_GET['SessionID']) ;

if (session_status() == PHP_SESSION_NONE)
	session_start();


// on vérifie que l'on a les droits pour accéder à la page
// si on n'a pas les droits, on est redirigé vers la page index.php
if ( isset($_SESSION['current_user']) )
{
  $objAC = new Access ;
  if (! $objAC->IsVisibleBy('./Activity_showall.php',$_SESSION['current_user']->group_name))
  {
    header('Location) /') ;
    exit() ;
  }
}
else
{
  header('Location) /') ;
  exit() ;
}



#echo $servername." ".$username." ".$password." ".$dbname."\n" ;


$MyError = "" ;



function GetNombreEmployes($s)
{
  $res = "Inconnu" ;
  if ($s == "NN")
    $res = "Non Employeur" ;
  if ($s == "00")
    $res = "0 salarié" ;
  if ($s == "01")
    $res = "1 ou 2 salariés" ;
  if ($s == "02")
    $res = "3 à 5 salariés" ;
  if ($s == "03")
    $res = "6 à 9 salariés" ;
  if ($s == "11")
    $res = "10 à 19 salariés" ;
  if ($s == "12")
    $res = "20 à 49 salariés" ;
  if ($s == "21")
    $res = "50 à 99 salariés" ;
  if ($s == "22")
    $res = "100 à 199 salariés" ;
  if ($s == "31")
    $res = "200 à 249 salariés" ;
  if ($s == "32")
    $res = "250 à 499 salariés" ;
  if ($s == "41")
      $res = "500 à 999 salariés" ;
  if ($s == "42")
    $res = "1000 à 1999 salariés" ;
  if ($s == "42")
    $res = "1000 à 1999 salariés" ;
  if ($s == "51")
      $res = "2000 à 4999 salariés" ;
  if ($s == "52")
      $res = "5000 à 9999 salariés" ;
  if ($s == "53")
      $res = "> 10 000 salariés" ;

  return $res ;
}                              






// définition des fichiers à lire
$fheader = $baseREP."/templates/header.html" ;
$contenu = file_get_contents($fheader) ;

$fichier = $baseREP."/templates/SelectCodePostal2.html" ;
$contenu = $contenu.file_get_contents($fichier) ;



$CodePostal = "77140" ;
$TypeStructure = "" ;
$sDate1 = "" ;
if ( isset($_POST['Submit']) )
{
  $CodePostal = $_POST['CodePostal'] ;
  $TypeStructure = $_POST['TypeStructure'] ;

  if (empty($_POST['sDate1']) == false)
  {
    $sDate1 = NettoyerDate($_POST['sDate1']) ;

    $date = new DateTime($sDate1); // Y-m-d
    $date->add(new DateInterval('P30D'));
    $sDate2 = $date->format('Y-m-d') ;  
  }


}


$contenu = str_replace('[CODE_POSTAL]',$CodePostal,$contenu) ;
$contenu = str_replace('[SERVEUR_WEB]',$ServeurWeb,$contenu) ;







require_once $baseREP.'/MenuFooter.php' ;





use \Footer\Footer ;
$objF = new Footer ;
$objF->baseREP = $baseREP ;
$contenu = $contenu.$objF->getFooterForGroup($group) ;



include $baseREP.'/ManageCouleurServeurs.php';











include $baseREP.'/PHP/config.php';



// la requête pour récupérer les infos
if ($CodePostal != "")
{

  $sDateJour = date("Y-m-d") ;
  $dDateJour = new DateTime($sDateJour);


  // Create connection
  $conn = new mysqli($servername, $username, $password, $dbname);
  // Check connection
  if ($conn->connect_error)
  {
      die("Connection failed) " . $conn->connect_error);
  }
  $conn->set_charset('utf8');


  $sql = "select temp.*, siu.Dirigeants FROM (SELECT se.siren, siret, dateCreationEtablissement, se.dateDebut, sigleUniteLegale,prenomUsuelUniteLegale,nomUniteLegale,denominationUniteLegale, " ;
  $sql = $sql." denominationUsuelleEtablissement,denominationUsuelle1UniteLegale, numeroVoieEtablissement,typeVoieEtablissement,libelleVoieEtablissement, " ;
  $sql = $sql." codePostalEtablissement,libelleCommuneEtablissement,categorieJuridiqueUniteLegale,cj.libelle,etatAdministratifEtablissement,trancheEffectifsEtablissement,
  anneeEffectifsEtablissement, " ;
  $sql = $sql." sn.libelle as libelleActivite  FROM SIRENE_StockUniteLegale su,  SIRENE_StockEtablissement se, SIRENE_CategorieJuridique cj , SIRENE_NAF sn " ;
  $sql = $sql." WHERE se.codePostalEtablissement = \"".$CodePostal."\" " ;

  if ($TypeStructure == "Entrepreneur individuel")
    $sql = $sql." and su.categorieJuridiqueUniteLegale = 1000  " ;
  else {
    if ($TypeStructure == "SCI")
      $sql = $sql." and su.categorieJuridiqueUniteLegale in (6539,6540)  " ;
    else {
      if ($TypeStructure == "SA")
        $sql = $sql."  and su.categorieJuridiqueUniteLegale in (3220,5202,5499,5599,5699,5710)  " ;
      else{
        if ($TypeStructure == "Syndic")
          $sql = $sql." and su.categorieJuridiqueUniteLegale = 9110  " ;
        else{
          if ($TypeStructure == "Syndicat de salariés")
            $sql = $sql." and su.categorieJuridiqueUniteLegale = 8410  " ;
          else{
            if ($TypeStructure == "Comité d'entreprise")
              $sql = $sql." and su.categorieJuridiqueUniteLegale = 8310  " ;
            else{
              if ($TypeStructure == "Syndicat patronal")
                $sql = $sql." and su.categorieJuridiqueUniteLegale = 8420  " ;
              else{
                if ($TypeStructure == "Association")
                  $sql = $sql." and su.categorieJuridiqueUniteLegale >= 9000 and su.categorieJuridiqueUniteLegale <> 9110 " ;
                else
                {
                  if ($TypeStructure == "Administration")
                    $sql = $sql." and su.categorieJuridiqueUniteLegale >= 7000  and su.categorieJuridiqueUniteLegale < 9000 and su.categorieJuridiqueUniteLegale not in (8410,8310,8420)  " ;
                }
              }
            }
          }
        }
      }
    }
  }

  if (empty($sDate1) == false)
  {
    $sql = $sql." and se.dateDebut >= \"".$sDate1."\" " ;
    $sql = $sql." and se.dateCreationEtablissement >= \"".$sDate1."\" " ;
    $sql = $sql." and su.dateDebut >= \"".$sDate1."\" " ;
    $sql = $sql." and su.dateCreationUniteLegale >= \"".$sDate1."\" " ;

    if (empty($CodePostal) == true)
    {
      $sql = $sql." and  se.dateDebut <= \"".$sDate2."\" "  ;
      $sql = $sql." and se.dateCreationEtablissement <= \"".$sDate2."\" " ;
      $sql = $sql." and su.dateDebut <= \"".$sDate2."\"  " ;
      $sql = $sql." and su.dateCreationUniteLegale <= \"".$sDate2."\"  " ;
    }

  }
  

  $sql = $sql." and su.statutDiffusionUniteLegale = 'O' " ;
  $sql = $sql." and se.siren = su.siren " ;
  $sql = $sql." and su.activitePrincipaleUniteLegale = sn.code " ;
  $sql = $sql." and su.categorieJuridiqueUniteLegale = cj.code) as temp " ;

  $sql = $sql." left outer join SIRENE_Infos_UniteLegale siu  " ;
  $sql = $sql." on temp.siren = siu.siren " ;

  $sql = $sql." order by temp.libelleActivite, temp.siret" ;

  #$contenu = $contenu."<br><br><br>" ;
  #$contenu = $contenu.$sql."<br>" ;
  
  $result = $conn->query($sql);



  $contenu = $contenu."<br>" ;
  $contenu = $contenu."<b style=\"margin-left:1%\">".$result->num_rows." résultats</b><br>" ;
  $contenu = $contenu."<br>" ;



  $contenu = $contenu."<div  class=\"table-responsive\" style=\"margin-left:1%;margin-right:1%\">\n" ;
  $contenu = $contenu."<table id=\"TableResults\" class=\"table table-bordered table-striped\" style=\"background-color:#DDDDDD;border:solid #0000FF\" >\n" ;


  $contenu = $contenu."<thead style=\"background-color)#AAAAAA\" >  <th>Numéro</th>  <th>Siren</th> <th>Siret</th> <th>Statut</th>  <th>Nombre Années existence</th>  <th>Sigle</th> <th>Prénom</th> <th>Nom</th> <th>Dénomination</th>  <th>Numéro rue</th> <th>Rue</th> <th>Code Postal</th> <th>Commune</th> <th>Dirigeant</th>  <th>Effectif</th> <th>Structure Juridique</th> <th>Activité</th> " ;
  //$contenu = $contenu." <th>Ligne</th> "; 
  $contenu = $contenu." </thead>\n";
  $contenu = $contenu."<tbody>" ;

  echo $contenu ;
  $contenu = "" ;


  if ($result->num_rows > 0)
  {

    // output data of each row
    $i = 1 ;
    while($row = $result->fetch_assoc())
    {
      $contenu = $contenu."<tr>" ;

      $contenu = $contenu."<td>".$i."</td>" ;

      $contenu = $contenu."<td>".$row['siren']."</td>" ;
      $contenu = $contenu."<td>".$row['siret']."</td>" ;

      $contenu = $contenu."<td>".$row['etatAdministratifEtablissement']."</td>" ;



      if ($row['dateCreationEtablissement'] == "1900-01-01")
        $sDateCreation = $row['dateDebut'] ;
      else
        $sDateCreation = $row['dateCreationEtablissement'] ;

      $dDateCreation = new DateTime($sDateCreation);
      $difference = $dDateJour->diff($dDateCreation);
      $contenu = $contenu."<td>".$difference->y."</td>" ;

      
       
      
      $contenu = $contenu."<td>".$row['sigleUniteLegale']."</td>" ;
      $contenu = $contenu."<td>".$row['prenomUsuelUniteLegale']."</td>" ;
      $contenu = $contenu."<td>".$row['nomUniteLegale']."</td>" ;

      if ( empty($row['denominationUniteLegale']) == false)
        $Denomination = $row['denominationUniteLegale'] ;
      else
      {
        if ( empty($row['denominationUsuelleEtablissement']) == false)  
          $Denomination = $row['denominationUsuelleEtablissement'] ;
        else{
          $Denomination = $row['denominationUsuelle1UniteLegale'] ;
        }
      }

      $contenu = $contenu."<td>".$Denomination."</td>" ;

      $contenu = $contenu."<td>".$row['numeroVoieEtablissement']."</td>" ;

      $contenu = $contenu."<td>".$row['typeVoieEtablissement']." ".$row['libelleVoieEtablissement']."</td>" ;
      $contenu = $contenu."<td>".$row['codePostalEtablissement']."</td>" ;
      $contenu = $contenu."<td>".$row['libelleCommuneEtablissement']."</td>" ;

      $contenu = $contenu."<td>".$row['Dirigeants']."</td>" ;
      $contenu = $contenu."<td>".GetNombreEmployes($row['trancheEffectifsEtablissement'])."</td>" ;

      $contenu = $contenu."<td>".$row['libelle']."</td>" ;
      $contenu = $contenu."<td>".$row['libelleActivite']."</td>" ;
      //$contenu = $contenu."<td>".$row['Ligne']."</td>" ;
    
      

      $contenu = $contenu."</tr>\n" ;

      $c2 = $i / 500 ;
      $c3 = round($c2,0) ;
      if ($c2 == $c3)
      {
        echo $contenu ;
        $contenu = "" ;
      }



      $i = $i+1 ;
    }


  }


  $contenu = $contenu."</tbody>" ;
  $contenu = $contenu."</table>\n" ;
  $contenu = $contenu."</div>" ;

  // on ferme la connection à la base
  $conn->close();
}


$contenu = $contenu."<br><br><br>" ;




// ajout des scripts js
$contenu = $contenu."\n<script>" ;
$trijs =   $baseREP.'/js/tri.js' ;
$contenu = $contenu.file_get_contents($trijs) ;
$contenu = $contenu."</script>\n" ;







echo $contenu ;



?>
