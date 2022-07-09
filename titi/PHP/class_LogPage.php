<?php

	// Author Daniel @2018

	namespace Log;


	require_once $baseREP.'/PHP/class_database.php' ;

	use \Config\Database ;
	use \Config\DatabaseError ;


	class LogPage
	{
		public $IP;
		public $Page ;
		public $Method ;

		private $db;


		public function __construct()
		{
			$this->db = new Database(01);
			$this->db->set_charset("utf8");
			$this->IP = "" ;
			$this->Page = "" ;
			$this->Method = "" ;
		}




		public function SetPage($ip,$p,$m)
		{
			$this->IP = $ip ;
			$this->Page = $p ;
			$this->Method = $m ;
		}




		public function Save()
		{
				$p1 = strpos($this->Page, '.');

				if ($p1 == false)
				{
					$sql = "insert into LogPage (IP,Page,Method) values('".$this->IP."','".$this->Page."','".$this->Method."')" ;
					$stmt = $this->db->query($sql);
					if($stmt->affected_rows == 1)
							return 1;

					return -1 ;
				}
		}





	} // fin de la classe
