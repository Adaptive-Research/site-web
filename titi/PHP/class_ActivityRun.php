<?php

	// Author Daniel @2018

	namespace Entreprise;


	require_once $baseREP.'/PHP/class_database.php' ;

	use \Config\Database ;
	use \Config\DatabaseError ;


	class ActivityRun
	{

		public $ListOfRuns ;

		private $db;


		public function __construct()
		{
			$this->db = new Database(01);
			$this->db->set_charset("utf8");
		}

		public function LoadList($idActivity,$id)
		{
			if ($idActivity >= 0) 
				$sql = "select * from Activity_Run where iscurrent = 1 and idActivity = ".$idActivity." order by DateRun desc" ;

			$rows = $this->db->query($sql);
			$num_rows = $this->db->getRowCount() ;
			if( $num_rows >= 1)
			{
				$this->ListOfRuns = "" ;

				for ($i = 0 ; $i < $num_rows ; $i++)
				{
					if ($rows[$i]->id == $id)
						$this->ListOfRuns = $this->ListOfRuns."<option selected=\"selected\" value=\"".$rows[$i]->id."\">".$rows[$i]->DateRun."</option>\n" ;
					else
						$this->ListOfRuns = $this->ListOfRuns."<option  value=\"".$rows[$i]->id."\">".$rows[$i]->DateRun."</option>\n" ;
				}
				return true;
			}
			return false ;
		}




	} // fin de la classe
