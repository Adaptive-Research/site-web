<?php

	// Author Daniel @2018

	namespace Entreprise;


	require_once $baseREP.'/PHP/class_database.php' ;

	use \Config\Database ;
	use \Config\DatabaseError ;


	class DownloadedDomain
	{

		public $ID ;
		public $ListOfDomains ;

		private $db;




		public function __construct()
		{
			$this->db = new Database(01);
			$this->db->set_charset("utf8");
			$this->ID = 0 ;
			$this->Secteur = "" ;
		}

		public function Load($idDomaine)
		{
			$sql = "select id, Domaine from SiteWeb_Domaines order by Domaine" ;
			$rows = $this->db->query($sql);
			$num_rows = $this->db->getRowCount() ;
			if( $num_rows >= 1)
			{

				for ($i = 0 ; $i < $num_rows ; $i++)
				{
					if ($rows[$i]->id == $idDomaine)
						$this->ListOfDomains = $this->ListOfDomains."<option selected=\"selected\" value=\"".$rows[$i]->id."\">".$rows[$i]->Domaine."  </option>\n" ;
					else
						$this->ListOfDomains = $this->ListOfDomains."<option  value=\"".$rows[$i]->id."\">".$rows[$i]->Domaine."</option>\n" ;
				}
				return true;
			}
			return false ;
		}





	} // fin de la classe
