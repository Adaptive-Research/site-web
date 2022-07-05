<?php

	// Author Daniel @2022

	namespace Entreprise;


	require_once $baseREP.'/PHP/class_database.php' ;

	use \Config\Database ;
	use \Config\DatabaseError ;


	class Profession_Entreprises
	{

		public $ListeVilles ;
		public $ListeTypes ;

		private $db;




		public function __construct()
		{
			$this->db = new Database(01);
			$this->db->set_charset("utf8");
		}

		public function LoadTypes($id)
		{
			$sql = "select distinct TypeEntreprise from Profession_Entreprises where TypeEntreprise is not null order by TypeEntreprise" ;

			$rows = $this->db->query($sql);
			$num_rows = $this->db->getRowCount() ;
			if( $num_rows >= 1)
			{
				$this->ListeTypes = "" ;
				for ($i = 0 ; $i < $num_rows ; $i++)
				{
					if ($rows[$i]->TypeEntreprise == $id)
						$this->ListeTypes = $this->ListeTypes."<option selected=\"selected\" value=\"".$rows[$i]->TypeEntreprise."\">".$rows[$i]->TypeEntreprise." </option>\n" ;
					else
						$this->ListeTypes = $this->ListeTypes."<option  value=\"".$rows[$i]->TypeEntreprise."\">".$rows[$i]->TypeEntreprise." </option>\n" ;
				}
				return true;
			}
			return false ;
		}




		public function LoadVilles($id)
		{
			$sql = "select distinct VilleMinu from Profession_Entreprises where VilleMinu is not null order by VilleMinu" ;

			$rows = $this->db->query($sql);
			$num_rows = $this->db->getRowCount() ;
			if( $num_rows >= 1)
			{
				$this->ListeVilles = "" ;
				for ($i = 0 ; $i < $num_rows ; $i++)
				{
					if ($rows[$i]->VilleMinu == $id)
						$this->ListeVilles = $this->ListeVilles."<option selected=\"selected\" value=\"".$rows[$i]->VilleMinu."\">".$rows[$i]->VilleMinu." </option>\n" ;
					else
						$this->ListeVilles = $this->ListeVilles."<option  value=\"".$rows[$i]->VilleMinu."\">".$rows[$i]->VilleMinu." </option>\n" ;
				}
				return true;
			}
			return false ;
		}




	} // fin de la classe
