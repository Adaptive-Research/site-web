<?php

	// Author Daniel @2018

	namespace Log;


	require_once $baseREP.'/PHP/class_database.php' ;

	use \Config\Database ;
	use \Config\DatabaseError ;


	class LogPage
	{
		public $idSession;
		public $Page ;
		public $Method ;

		private $db;


		public function __construct()
		{
			$this->db = new Database(01);
			$this->db->set_charset("utf8");
			$this->idSession = "" ;
			$this->Page = "" ;
			$this->Method = "" ;
		}




		public function SetPage($ids,$p,$m)
		{
			$this->idSession = $ids ;
			$this->Page = $p ;
			$this->Method = $m ;
		}




		public function Save()
		{
				$p1 = strpos($this->Page, '.');

				if ($p1 == false)
				{
					$sql = "insert into LogPage (idSession,Page,Method) values('".$this->idSession."','".$this->Page."','".$this->Method."')" ;
					$stmt = $this->db->query($sql);
					if($stmt->affected_rows == 1)
							return 1;

					return -1 ;
				}
		}



		public function Load($ids)
		{
			$stmt = $this->db->query("select * from LogPage where idSession = '".$ids."'") ;
			if($this->db->getRowCount() >= 1)
			{
				$this->idSession = $ids ;
				$this->Page = $stmt[0]->Page ;
				$this->Method = $stmt[0]->Method ;

				return true;
			}
			return false ;
		}



	} // fin de la classe
