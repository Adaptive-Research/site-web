<?php

$language = strtoupper(substr($_SERVER['HTTP_ACCEPT_LANGUAGE'],0,2)) ;

$country = $language ;
// on force la langue si on en fait pas partie des pays autorisés
if (!array_key_exists($language,array("FR","EN"))  )
	$language = "EN" ;

$language = "FR" ;

?>