<?php

	// Author Daniel @2018

	namespace Entreprise;


	require_once $baseREP.'/PHP/class_database.php' ;

	use \Config\Database ;
	use \Config\DatabaseError ;


	class ProfessionRun
	{

		public $ListOfRuns ;

		private $db;


		public function __construct()
		{
			$this->db = new Database(01);
			$this->db->set_charset("utf8");
		}

		public function LoadList($idProfession,$idRun)
		{
			if ($idProfession >= 0) 
				$sql = "select * from Profession_Run where idProfession = ".$idProfession." order by DateRun desc" ;

			$rows = $this->db->query($sql);
			$num_rows = $this->db->getRowCount() ;
			if( $num_rows >= 1)
			{
				$this->ListOfRuns = "" ;

				for ($i = 0 ; $i < $num_rows ; $i++)
				{
					
					if ($rows[$i]->id == $idRun)
						$this->ListOfRuns = $this->ListOfRuns."<option selected=\"selected\" value=\"".$rows[$i]->id."\">".$rows[$i]->Ville." ".$rows[$i]->DateRun."</option>\n" ;
					else
						$this->ListOfRuns = $this->ListOfRuns."<option  value=\"".$rows[$i]->id."\">".$rows[$i]->Ville." ".$rows[$i]->DateRun."</option>\n" ;
					


				}
				return true;
			}
			return false ;
		}




	} // fin de la classe
