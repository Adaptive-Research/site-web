<?php
	//Author: Henok Hailemariam @2017
	// Modified by Daniel @2018
	namespace User;

	require_once $baseREP.'/PHP/class_database.php' ; 

	use \Config\Database ;
	use \Config\DatabaseError ;



	class Groups{

		private $db;

		public $IsListLoaded ;
		public $ListOfGroups;



		public function __construct(){
			$this->db = new Database(01);
			$this->IsListLoaded = false ;
			$this->ListOfGroups = "test" ;
		}


		public function LoadList($gn)
		{
			$sql = "select group_name from user_groups" ;
			$rows = $this->db->query($sql);
			$num_rows = $this->db->getRowCount() ;
			if( $num_rows >= 1)
			{
				$this->ListOfGroups = "" ;
				$this->IsListLoaded = true ;

				for ($i = 0 ; $i < $num_rows ; $i++)
				{
					if ($rows[$i]->group_name == $gn)
						$this->ListOfGroups = $this->ListOfGroups."<option selected=\"selected\" value=\"".$rows[$i]->group_name."\">".$rows[$i]->group_name."</option>\n" ;
					else
						$this->ListOfGroups = $this->ListOfGroups."<option value=\"".$rows[$i]->group_name."\">".$rows[$i]->group_name."</option>\n" ;
				}

				return true;
			}
			return false ;
		}


		public function LoadListForAdminCompany($gn)
		{
			$this->ListOfGroups = "" ;
			$this->IsListLoaded = true ;


			$group = "Employee" ;
			$option = "" ;
			if ($gn == $group)
				$option = "selected=\"selected\" " ;
			$this->ListOfGroups = $this->ListOfGroups."<option ".$option."value=\"".$group."\">".$group."</option>\n" ;


			$group = "Manager" ;
			$option = "" ;
			if ($gn == $group)
				$option = "selected=\"selected\" " ;
			$this->ListOfGroups = $this->ListOfGroups."<option ".$option."value=\"".$group."\">".$group."</option>\n" ;


			$group = "AdminKPI" ;
			$option = "" ;
			if ($gn == $group)
				$option = "selected=\"selected\" " ;
			$this->ListOfGroups = $this->ListOfGroups."<option ".$option."value=\"".$group."\">".$group."</option>\n" ;
		}


	}
