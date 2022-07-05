<?php
	//Author: Henok Hailemariam @2017
	// Modified by Daniel @2018
	namespace User;

	require_once $baseREP.'/PHP/class_database.php' ;

	use \Config\Database ;
	use \Config\DatabaseError ;



	class Employees{

		private $db;

		public $ListOfEmployees;



		public function __construct(){
			$this->db = new Database(01);
			$this->db->set_charset("utf8");
			$this->ListOfEmployees = "test" ;
		}


		public function LoadAllEmployees($a)
		{
			$sql = "select id, Prenom, Nom from users where author = ".$a ;
			$rows = $this->db->query($sql);
			$num_rows = $this->db->getRowCount() ;
			if( $num_rows >= 1)
			{
				$this->ListOfEmployees = "" ;

				for ($i = 0 ; $i < $num_rows ; $i++)
					$this->ListOfEmployees = $this->ListOfEmployees."<option value=\"".$rows[$i]->id."\">".$rows[$i]->Prenom." ".$rows[$i]->Nom."</option>\n" ;

				return true;
			}
			return false ;
		}

		public function LoadEmployeesWithOrWithoutQuestion($a,$list,$flag)
		{
			$sql = "select id, Prenom, Nom from users where author = ".$a ;
			$rows = $this->db->query($sql);
			$num_rows = $this->db->getRowCount() ;
			if( $num_rows >= 1)
			{
				$this->ListOfEmployees = "" ;

				for ($i = 0 ; $i < $num_rows ; $i++)
				{
					if ( ($flag == "With") || ($flag == "WITH")  || ($flag == "with") )
					{
						if ( $list->FindItem($rows[$i]->id) )
							$this->ListOfEmployees = $this->ListOfEmployees."<option value=\"".$rows[$i]->id."\">".$rows[$i]->Prenom." ".$rows[$i]->Nom."</option>";
					}
					else
					{
						if ( ! $list->FindItem($rows[$i]->id) )
							$this->ListOfEmployees = $this->ListOfEmployees."<option value=\"".$rows[$i]->id."\">".$rows[$i]->Prenom." ".$rows[$i]->Nom."</option>";
					}
				}

				return true;
			}
			return false ;
		}




	}
