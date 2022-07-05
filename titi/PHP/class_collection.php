<?php

// Author Daniel @2018


class Collection 
{
    private $aitems = array();
    private $Number = 0 ;

  

		public function AddItem($obj) 
		{
       $this->aitems[$this->Number] = $obj;
       $this->Number++ ;
		}


    public function Clear() 
    {
    	$length = $this->Number ;
    	for ($i = $length-1 ; $i >= 0 ; $i--)
  			unset($this->list[$i]) ;
  		$this->Number = 0 ;
		}


		public function GetItem($i) 
		{
			if ( ( $i >= 0) && ($i < $this->Number ) )
	      return $this->aitems[$i];
	    else 
	      throw new KeyInvalidException("Invalid index.");
		}

		public function FindItem($item) 
		{
			for ($i = 0 ; $i < $this->Number ; $i++)
				if ( $this->aitems[$i] == $item)
					return true ;

			return false ;	
		}


		public function Size() 
		{
    	return $this->Number;
		}

}

?>