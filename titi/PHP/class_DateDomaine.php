<?php

	// Author Daniel @2018

	namespace Entreprise;


	require_once $baseREP.'/PHP/class_database.php' ;

	use \Config\Database ;
	use \Config\DatabaseError ;


	class DateDomaine
	{

		public $ID ;
		public $ListOfDates ;

		private $db;




		public function __construct()
		{
			$this->db = new Database(01);
			$this->db->set_charset("utf8");
			$this->ID = 0 ;
			$this->Secteur = "" ;
		}

		public function Load($idDomaine,$idDate)
		{
			$sql = "select id, sdate from SiteWeb_DatesDomaines where idDomaine = ".$idDomaine." order by id desc" ;
			$rows = $this->db->query($sql);
			$num_rows = $this->db->getRowCount() ;
			if( $num_rows >= 1)
			{

				for ($i = 0 ; $i < $num_rows ; $i++)
				{
					if ($rows[$i]->id == $idDate)
						$this->ListOfDates = $this->ListOfDates."<option selected=\"selected\" value=\"".$rows[$i]->id."\">".$rows[$i]->sdate."  </option>\n" ;
					else
						$this->ListOfDates = $this->ListOfDates."<option  value=\"".$rows[$i]->id."\">".$rows[$i]->sdate."</option>\n" ;
				}
				return true;
			}
			return false ;
		}





	} // fin de la classe
