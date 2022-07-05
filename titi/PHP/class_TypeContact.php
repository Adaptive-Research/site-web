<?php

	// Author Daniel @2018

	namespace Contacts;


	require_once $baseREP.'/PHP/class_database.php' ;

	use \Config\Database ;
	use \Config\DatabaseError ;


	class TypeContact
	{
		private $db;

		public $ListOfTypes ;






		public function __construct()
		{
			$this->db = new Database(01);
			$this->db->set_charset('utf8') ;
		}




		public function LoadList($c)
		{
			$sql = "select id, Type from TypeContact" ;
			$rows = $this->db->query($sql);
			$num_rows = $this->db->getRowCount() ;
			if( $num_rows >= 1)
			{
				$this->ListOfTypes = "" ;

				for ($i = 0 ; $i < $num_rows ; $i++)
				{
					if ($rows[$i]->Type == $c)
						$this->ListOfTypes = $this->ListOfTypes."<option selected=\"selected\" value=\"".$rows[$i]->id."\">".$rows[$i]->Type."</option>\n" ;
					else
						$this->ListOfTypes = $this->ListOfTypes."<option  value=\"".$rows[$i]->id."\">".$rows[$i]->Type."</option>\n" ;
				}

				return true;
			}
			return false ;
		}


	} // fin de la classe
