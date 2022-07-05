<?php

	// Author Daniel @2018

	namespace Entreprise;


	require_once $baseREP.'/PHP/class_database.php' ;

	use \Config\Database ;
	use \Config\DatabaseError ;


	class Domaine
	{

		public $ListOfDomains ;

		private $db;


		public function __construct()
		{
			$this->db = new Database(01);
			$this->db->set_charset("utf8");
		}

		public function LoadList($idActivityRun, $Domaine)
		{
			if ($idActivity >= 0) 
				$sql = "select * from SiteWeb_Ranking where iscurrent = 1 and idActivityRun = ".$idActivityRun." order by TotalOrganicRanking asc" ;

			$rows = $this->db->query($sql);
			$num_rows = $this->db->getRowCount() ;
			if( $num_rows >= 1)
			{
				$this->ListOfDomains = "<option  value=\"\"> </option>\n" ;

				for ($i = 0 ; $i < $num_rows ; $i++)
				{
					if ($rows[$i]->Domaine == $Domaine)
						$this->ListOfDomains = $this->ListOfDomains."<option selected=\"selected\" value=\"".$rows[$i]->Domaine."\">".$rows[$i]->Domaine."</option>\n" ;
					else
						$this->ListOfDomains = $this->ListOfDomains."<option  value=\"".$rows[$i]->Domaine."\">".$rows[$i]->Domaine."</option>\n" ;
				}
				return true;
			}
			return false ;
		}




	} // fin de la classe
