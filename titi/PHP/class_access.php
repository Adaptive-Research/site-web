<?php

	// Author Daniel @2018

	namespace Page;


	require_once $baseREP.'/PHP/class_database.php' ;

	use \Config\Database ;
	use \Config\DatabaseError ;




	class Access
	{

		public $Page ;
		public $Group ;


		private $db;



		public function __construct()
		{
			$this->db = new Database(01);
			$this->db->set_charset("utf8");
		}



		public function IsVisibleBy($p,$g)
		{
			$sql = "select * from pages_visibleby where page_name = '".$p."' and visibleby = '".$g."'" ;
			$stmt = $this->db->query($sql) ;
			if($this->db->getRowCount() >= 1)
			{
				return true;
			}
			return false ;
		}


	} // fin de la classe
