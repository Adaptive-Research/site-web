<?php

	// Author Daniel @2022

	namespace Entreprise;


	require_once $baseREP.'/PHP/class_database.php' ;

	use \Config\Database ;
	use \Config\DatabaseError ;


	class Ville
	{

		public $ListeVilles ;
		public $ListeTypes ;

		private $db;




		public function __construct()
		{
			$this->db = new Database(01);
			$this->db->set_charset("utf8");
		}


		public function LoadZonesGeo($CodePostal)
		{
			$sql = "select id, CodePostal, VilleMinu, PopulationTotale from Villes where VillePrincipale =1 order by VilleMinu" ;

			$rows = $this->db->query($sql);
			$num_rows = $this->db->getRowCount() ;
			if( $num_rows >= 1)
			{
				$this->ListeVilles = "" ;
				for ($i = 0 ; $i < $num_rows ; $i++)
				{
					if ($rows[$i]->CodePostal == $CodePostal)
						$this->ListeVilles = $this->ListeVilles."<option selected=\"selected\" value=\"".$rows[$i]->CodePostal."\">".$rows[$i]->VilleMinu." (". $rows[$i]->PopulationTotale. ") </option>\n" ;
					else
						$this->ListeVilles = $this->ListeVilles."<option  value=\"".$rows[$i]->CodePostal."\">".$rows[$i]->VilleMinu." (". $rows[$i]->PopulationTotale. ") </option>\n" ;
				}
				return true;
			}
			return false ;
		}



		public function LoadVilles($CodePostal,$idVille)
		{

			$sql = "select CodePostal, VilleMinu, PopulationTotale from Villes where CodePostal = \"".$CodePostal."\" order by PopulationTotale desc" ;

			$rows = $this->db->query($sql);
			$num_rows = $this->db->getRowCount() ;
			if( $num_rows >= 1)
			{
				$this->ListeVilles = "" ;
				for ($i = 0 ; $i < $num_rows ; $i++)
				{
					if ($rows[$i]->VilleMinu == $idVille)
						$this->ListeVilles = $this->ListeVilles."<option selected=\"selected\" value=\"".$rows[$i]->VilleMinu."\">".$rows[$i]->VilleMinu." </option>\n" ;
					else
						$this->ListeVilles = $this->ListeVilles."<option  value=\"".$rows[$i]->VilleMinu."\">".$rows[$i]->VilleMinu." </option>\n" ;
				}
				return true;
			}
			return false ;
		}




	} // fin de la classe
