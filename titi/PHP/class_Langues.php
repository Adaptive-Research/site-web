<?php

	// Author Daniel @2018

	namespace Langues;


	require_once $baseREP.'/PHP/class_database.php' ;

	use \Config\Database ;
	use \Config\DatabaseError ;


	class Langue
	{

		public $Langue ;
		public $Value ;


		private $db;



		public $ListOfLanguages ;






		public function __construct()
		{
			$this->db = new Database(01);
			$this->db->set_charset('utf8') ;
		}


		public function GetValueLangue($l)
		{
			$sql = "select Value from Langues where Langue = '".$l."'" ;
			$rows = $this->db->query($sql);
			$num_rows = $this->db->getRowCount() ;
			if( $num_rows >= 1)
					return $rows[0]->Value  ;
			return "" ;
		}

		public function GetLangueFromValueLangue($l)
		{
			$sql = "select Langue from Langues where Value = '".$l."'" ;
			$rows = $this->db->query($sql);
			$num_rows = $this->db->getRowCount() ;
			if( $num_rows >= 1)
					return $rows[0]->Langue ;
			return "" ;
		}


		public function LoadList($c)
		{
			$sql = "select Langue,Value from Langues" ;
			$rows = $this->db->query($sql);
			$num_rows = $this->db->getRowCount() ;
			if( $num_rows >= 1)
			{
				$this->ListOfLanguages = "" ;

				for ($i = 0 ; $i < $num_rows ; $i++)
				{
					if ($rows[$i]->Langue == $c)
						$this->ListOfLanguages = $this->ListOfLanguages."<option selected=\"selected\" value=\"".$rows[$i]->Langue."\">".$rows[$i]->Langue."</option>\n" ;
					else
						$this->ListOfLanguages = $this->ListOfLanguages."<option  value=\"".$rows[$i]->Langue."\">".$rows[$i]->Langue."</option>\n" ;
				}

				return true;
			}
			return false ;
		}


	} // fin de la classe
