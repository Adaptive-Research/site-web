<?php



//echo "<script>alert('index.php');</script>";



$baseURL = '' ;

// répertoire racine du site web
$tinyREP = "titi" ;
$baseREP = __DIR__."/titi" ;
$baseLP = __DIR__."/LandingPage" ;

// répertoires des scripts python
$basePython = $baseREP."/python" ;
$py_Articles = $basePython."/Articles/" ;
$py_Keywords = $basePython."/Keywords/" ;
$py_Syntaxe = $basePython."/Syntaxe/" ;
$py_PagesWeb = $basePython."/PagesWeb/" ;

//echo $baseREP."<br>" ;

include  $baseREP.'/PHP/config.php' ;


include 'Route.php';






Route::add($baseURL.'/test',function()
{
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/test.php' ;
});

// Quand on a un message d'erreur, on revient au début
Route::pathNotFound(function(){
	echo "<H1> Page Not Found. </H1>" ;
	echo "Something in your page is wrong and can't be found" ;
}) ;

Route::methodNotAllowed(function(){
	echo "<H1> Method not Allowed</H1" ;
}) ;











// Landing Page


Route::add($baseURL.'/',function(){
    global $ServeurWeb, $baseREP,$baseLP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require  $baseLP.'/index.php' ;
});


Route::add($baseURL.'/',function(){
    global $ServeurWeb, $baseREP,$baseLP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require  $baseLP.'/index.php' ;
},'post');


Route::add($baseURL.'/Contact',function(){
    global $ServeurWeb, $baseREP,$baseLP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require  $baseLP.'/contact.php' ;
});


Route::add($baseURL.'/Contact',function(){
    global $ServeurWeb, $baseREP,$baseLP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require  $baseLP.'/contact.php' ;
},'post');



Route::add($baseURL.'/Se-Faire-Connaitre',function(){
    global $ServeurWeb, $baseREP,$baseLP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require  $baseLP.'/jemefaisconnaitre.php' ;
});


Route::add($baseURL.'/Je-me-forme-au-SEO',function(){
    global $ServeurWeb, $baseREP,$baseLP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require  $baseLP.'/jemeformeauSEO.php' ;
});




Route::add($baseURL.'/LOGIN',function(){
    global $ServeurWeb, $baseREP,$baseLP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require  $baseLP.'/Login.php' ;
});


Route::add($baseURL.'/LOGIN',function(){
    global $ServeurWeb, $baseREP,$baseLP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require  $baseLP.'/Login.php' ;
},'post');



Route::add($baseURL.'/SIGNIN',function(){
    global $ServeurWeb, $baseREP,$baseLP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require  $baseLP.'/Signin.php' ;
});


Route::add($baseURL.'/SIGNIN',function(){
    global $ServeurWeb, $baseREP,$baseLP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require  $baseLP.'/Signin.php' ;
},'post');



Route::add($baseURL.'/SIGNIN_DEMO',function(){
    global $ServeurWeb, $baseREP,$baseLP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require  $baseLP.'/Signin.php' ;
});


Route::add($baseURL.'/SIGNIN_DEMO',function(){
    global $ServeurWeb, $baseREP,$baseLP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require  $baseLP.'/Signin.php' ;
},'post');













// payant

Route::add($baseURL.'/login',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/login.php' ;
});

Route::add($baseURL.'/logout',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/logout.php' ;
});


Route::add($baseURL.'/login',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/login.php' ;
},'post');




















// SEO

Route::add($baseURL.'/create-Activity',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Activity_create.php' ;
});

Route::add($baseURL.'/create-Activity',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Activity_create.php' ;
},'post');



Route::add($baseURL.'/delete-Activity/([0-9]*)/',function($id){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Activity_delete.php' ;
});



Route::add($baseURL.'/show-Activity',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Activity_showall.php' ;
});



Route::add($baseURL.'/link-Keywords-with-Activity',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Keywords_Activity_create.php' ;
});

Route::add($baseURL.'/link-Keywords-with-Activity',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Keywords_Activity_create.php' ;
},'post');



Route::add($baseURL.'/run-Keywords-For-Activity',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Keywords_runActivity.php' ;
});

Route::add($baseURL.'/run-Keywords-For-Activity',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Keywords_runActivity.php' ;
},'post');



Route::add($baseURL.'/run-Keywords',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Keywords_run.php' ;
});

Route::add($baseURL.'/run-Keywords',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Keywords_run.php' ;
},'post');

Route::add($baseURL.'/run-Jobs-After-Search',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Keywords_runJobs.php' ;
});


Route::add($baseURL.'/show-Keywords-Run',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/KeywordsRun_showall.php' ;
});

Route::add($baseURL.'/show-Keywords-Run',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/KeywordsRun_showall.php' ;
},'post');



Route::add($baseURL.'/show-Keywords',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Keywords_showall.php' ;
});


Route::add($baseURL.'/show-Keywords',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Keywords_showall.php' ;
},'post');

Route::add($baseURL.'/create-Keywords',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Keywords_create.php' ;
});

Route::add($baseURL.'/create-Keywords',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Keywords_create.php' ;
},'post');








# Contrôles des données


Route::add($baseURL.'/Download-WebSite',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/SiteWeb_Download.php' ;
});

Route::add($baseURL.'/Download-WebSite',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/SiteWeb_Download.php' ;
},'post');


Route::add($baseURL.'/Add-Info',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/SiteWeb_AddInfo.php' ;
});

Route::add($baseURL.'/Add-Info',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/SiteWeb_AddInfo.php' ;
},'post');


Route::add($baseURL.'/show-Websites',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/SiteWeb_showall.php' ;
});

Route::add($baseURL.'/show-Websites',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/SiteWeb_showall.php' ;
},'post');





















































// SEO + SEA resultats


Route::add($baseURL.'/show-Articles-From-Database',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/ArticlesFromDatabase_showall.php' ;
});

Route::add($baseURL.'/show-Articles-From-Database',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/ArticlesFromDatabase_showall.php' ;
},'post');



Route::add($baseURL.'/Synthetic-Results-For-Activity',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/SEO_SyntheticResults.php' ;
});

Route::add($baseURL.'/Synthetic-Results-For-Activity',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/SEO_SyntheticResults.php' ;
},'post');



Route::add($baseURL.'/Detailed-Results-For-Activity',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/SEO_DetailedResults.php' ;
});

Route::add($baseURL.'/Detailed-Results-For-Activity',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/SEO_DetailedResults.php' ;
},'post');




Route::add($baseURL.'/Evolution-Rankings',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/SiteWeb_EvolutionRanking.php' ;
});


Route::add($baseURL.'/Evolution-Rankings',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/SiteWeb_EvolutionRanking.php' ;
},'post');




Route::add($baseURL.'/Find-Prospects',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/SEO_FindProspects.php' ;
});

Route::add($baseURL.'/Find-Prospects',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/SEO_FindProspects.php' ;
},'post');


Route::add($baseURL.'/Analyze-Ranking',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/SEO_AnalyserRanking.php' ;
});

Route::add($baseURL.'/Analyze-Ranking',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/SEO_AnalyserRanking.php' ;
},'post');


Route::add($baseURL.'/Analyze-Ads',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Keywords_AnalyserPub.php' ;
});

Route::add($baseURL.'/Analyze-Ads',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Keywords_AnalyserPub.php' ;
},'post');


Route::add($baseURL.'/Analyze-Ads-By-Keywords',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Keywords_AnalyserPubParKeyword.php' ;
});

Route::add($baseURL.'/Analyze-Ads-By-Keywords',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Keywords_AnalyserPubParKeyword.php' ;
},'post');



Route::add($baseURL.'/WhoBuy-Ads',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Keywords_AchatPub.php' ;
});

Route::add($baseURL.'/WhoBuy-Ads',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Keywords_AchatPub.php' ;
},'post');



Route::add($baseURL.'/SEO-Find-Articles',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/SEO_FindArticles.php' ;
});

Route::add($baseURL.'/SEO-Find-Articles',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/SEO_FindArticles.php' ;
},'post');






















// SEO Local




Route::add($baseURL.'/create-Profession',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Profession_create.php' ;
});

Route::add($baseURL.'/create-Profession',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Profession_create.php' ;
},'post');



Route::add($baseURL.'/delete-Profession/([0-9]*)/',function($id){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Profession_delete.php' ;
});



Route::add($baseURL.'/show-Profession',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Profession_showall.php' ;
});



Route::add($baseURL.'/Get-Results-From-Google',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/SEOLOCAL_showRuns.php' ;
});



Route::add($baseURL.'/Get-Results-From-Google',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/SEOLOCAL_showRuns.php' ;
},'post');




Route::add($baseURL.'/Find-Prospects-SEO-LOCAL',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/SEOLOCAL_FindProspects.php' ;
});

Route::add($baseURL.'/Find-Prospects-SEO-LOCAL',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/SEOLOCAL_FindProspects.php' ;
},'post');


Route::add($baseURL.'/Voir-Repartition',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/SEOLOCAL_showRepartition.php' ;
});


Route::add($baseURL.'/Voir-Entreprises-Non-Classees',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/SEOLOCAL_showEntreprisesNonClassees.php' ;
});


Route::add($baseURL.'/Find-Company-By-City',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/SEOLOCAL_showEntreprises.php' ;
});



Route::add($baseURL.'/Find-Company-By-City',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/SEOLOCAL_showEntreprises.php' ;
},'post');




Route::add($baseURL.'/Find-Company-By-Type',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/SEOLOCAL_showEntreprisesByType.php' ;
});



Route::add($baseURL.'/Find-Company-By-Type',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/SEOLOCAL_showEntreprisesByType.php' ;
},'post');









// Annuaire




Route::add($baseURL.'/Find-Companies-By-Area',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Annuaire_showEntreprisesZoneGeo.php' ;
});



Route::add($baseURL.'/Find-Companies-By-Area',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Annuaire_showEntreprisesZoneGeo.php' ;
},'post');




Route::add($baseURL.'/Find-Companies-By-PostalCode',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Annuaire_showEntreprisesParCodePostal.php' ;
});



Route::add($baseURL.'/Find-Companies-By-PostalCode',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Annuaire_showEntreprisesParCodePostal.php' ;
},'post');


Route::add($baseURL.'/Find-NewCompanies',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Annuaire_showEntreprisesRecentes.php' ;
});


Route::add($baseURL.'/Find-NewCompanies',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Annuaire_showEntreprisesRecentes.php' ;
},'post');






Route::add($baseURL.'/Find-Leads-For-Avis',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Annuaire_showEntreprisesForAvis.php' ;
});


Route::add($baseURL.'/Find-Leads-For-Avis',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Annuaire_showEntreprisesForAvis.php' ;
},'post');





Route::add($baseURL.'/Find-Leads-For-Content',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Annuaire_showEntreprisesForContent.php' ;
});


Route::add($baseURL.'/Find-Leads-For-Content',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Annuaire_showEntreprisesForContent.php' ;
},'post');











// Other pages

Route::add($baseURL.'/show-Users',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/users_showall.php' ;
});

Route::add($baseURL.'/create-User',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/user_create.php' ;
});

Route::add($baseURL.'/create-User',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/user_create.php' ;
},'post');







# les différents types de compte
Route::add($baseURL.'/FullAdmin',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/index_FullAdmin.php' ;
});

Route::add($baseURL.'/Demo',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/index_Demo.php' ;
});













// API
Route::add($baseURL.'/API/Activity/([0-9]*)/',function($id){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/API/Activity.php' ;
});

Route::add($baseURL.'/API/ShowRunActivity/([0-9]*)/',function($id){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/API/Activity_ShowRun.php' ;
});




Route::add($baseURL.'/API/ShowRunProfession/([0-9]*)/',function($id){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/API/Profession_ShowRun.php' ;
});



Route::add($baseURL.'/API/ShowDatesForDownloadedDomain/([0-9]*)/',function($idDomaine){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/API/Domaine_ShowDates.php' ;
});




Route::add($baseURL.'/API/ShowDomaines/([0-9]*)/',function($idActivityRun){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/API/ActivityRun_ShowDomaines.php' ;
});




Route::add($baseURL.'/API/ShowCities/([0-9]*)/',function($CodePostal){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/API/Villes_ShowAll.php' ;
});


Route::add($baseURL.'/API/ShowAds/([0-9]*)/',function($idActivity){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/API/Keywords_ShowAds.php' ;
});



Route::add($baseURL.'/API/RankingGoogle/([0-9]*)/',function($id){
    global $ServeurWeb, $baseREP,$basePython  ;
		require $baseREP.'/API/RankingGoogle.php' ;
});



Route::add($baseURL.'/API/ArticleFromRanking/([0-9]*)/',function($id){
    global $ServeurWeb, $baseREP,$basePython  ;
		require $baseREP.'/API/ArticleFromRanking.php' ;
});


Route::add($baseURL.'/API/ArticleFromURL/([0-9]*)/',function($id){
    global $ServeurWeb, $baseREP,$basePython  ;
		require $baseREP.'/API/ArticleFromURL.php' ;
});


Route::add($baseURL.'/API/ArticleLinksFromDatabase/([0-9]*)/',function($id){
    global $ServeurWeb, $baseREP,$basePython  ;
		require $baseREP.'/API/ArticleLinksFromDatabase.php' ;
});

Route::add($baseURL.'/API/ArticleTextFromDatabase/([0-9]*)/',function($id){
    global $ServeurWeb, $baseREP,$basePython  ;
		require $baseREP.'/API/ArticleTextFromDatabase.php' ;
});















// pages PHP a transferer au serveur backtest
Route::add($baseURL.'/SEO/Download-SiteWeb',function()
{
    global $baseREP,$tinyREP, $baseURL  ;
    require $baseREP.'/SEO/SiteWeb_Download.php' ;
},'post');


Route::add($baseURL.'/SEO/SetRelevant',function()
{
    global $baseREP,$tinyREP, $baseURL  ;
    require $baseREP.'/SEO/SetRelevant.php' ;
},'post');

Route::add($baseURL.'/SEO/SetType',function()
{
    global $baseREP,$tinyREP, $baseURL  ;
    require $baseREP.'/SEO/SetType.php' ;
},'post');

Route::add($baseURL.'/SEO/SetMarketing',function()
{
    global $baseREP,$tinyREP, $baseURL  ;
    require $baseREP.'/SEO/SetMarketing.php' ;
},'post');

Route::add($baseURL.'/SEO/SetZone',function()
{
    global $baseREP,$tinyREP, $baseURL  ;
    require $baseREP.'/SEO/SetZone.php' ;
},'post');







// Old


Route::add($baseURL.'/get-Articles-from-RSS',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/RSS_CollectData.php' ;
});

Route::add($baseURL.'/show-Articles',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Article_showall.php' ;
});

Route::add($baseURL.'/get-Articles',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Article_CollectData.php' ;
});

Route::add($baseURL.'/show-Articles-ToClean',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Article_showANettoyer.php' ;
});

Route::add($baseURL.'/clean-Articles',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Article_Nettoyer.php' ;
});


Route::add($baseURL.'/Generate-Menus-for-all-languages',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/JobGenerateFiles.php' ;
});



Route::add($baseURL.'/follow-RSS',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/RSS_create.php' ;
});


Route::add($baseURL.'/follow-RSS',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/RSS_create.php' ;
},'post');

Route::add($baseURL.'/show-RSS',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/RSS_showall.php' ;
});

Route::add($baseURL.'/delete-RSS/([0-9]*)/',function($id){
  global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
  require $baseREP.'/RSS_delete.php' ;
});


Route::add($baseURL.'/follow-Blog',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/blog_create.php' ;
});


Route::add($baseURL.'/follow-Blog',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/blog_create.php' ;
},'post');

Route::add($baseURL.'/show-Blog',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/blog_showall.php' ;
});

Route::add($baseURL.'/delete-Blog/([0-9]*)/',function($id){
  global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
  require $baseREP.'/blog_delete.php' ;
});


Route::add($baseURL.'/Create-Directories-for-WebSites',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/JobCreateDirectory.php' ;
});


Route::add($baseURL.'/show-Company-by-Activity',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Entreprises_Secteurs_showall.php' ;
});

Route::add($baseURL.'/show-B2C-Companies',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Entreprises_B2C_showall.php' ;
});

Route::add($baseURL.'/show-all-Companies',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Entreprise_showall.php' ;
});


Route::add($baseURL.'/create-Company',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Entreprise_create.php' ;
});

Route::add($baseURL.'/create-Company',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Entreprise_create.php' ;
},'post');


Route::add($baseURL.'/show-Competitors',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Concurrents_showall.php' ;
});


Route::add($baseURL.'/link-Company-with-Activity',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Activity_Company_create.php' ;
});

Route::add($baseURL.'/link-Company-with-Activity',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Activity_Company_create.php' ;
},'post');


Route::add($baseURL.'/run-Jobs-After-Search',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Keywords_runJobs.php' ;
});

Route::add($baseURL.'/run-Job-Get-WebPages',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Keywords_runGetPagesWeb.php' ;
});


Route::add($baseURL.'/show-Meetings',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Rencontres_showall.php' ;
});

Route::add($baseURL.'/show-last-Meetings',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Rencontres2_showall.php' ;
});

Route::add($baseURL.'/create-Meeting-Report',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Rencontres_create.php' ;
});

Route::add($baseURL.'/create-Meeting-Report',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Rencontres_create.php' ;
},'post');


Route::add($baseURL.'/create-Contact&Report',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/ContactEtRencontre_create.php' ;
});

Route::add($baseURL.'/create-Contact&Report',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/ContactEtRencontre_create.php' ;
},'post');


Route::add($baseURL.'/create-Contact',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Contacts_create.php' ;
});

Route::add($baseURL.'/create-Contact',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Contacts_create.php' ;
},'post');


Route::add($baseURL.'/show-Contacts',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Contacts_showall.php' ;
});

Route::add($baseURL.'/Modify-Contact/([0-9]*)/',function($id){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Contacts_modify.php' ;
});

Route::add($baseURL.'/Modify-Contact/([0-9]*)/',function($id){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Contacts_modify.php' ;
},'post');


Route::add($baseURL.'/Delete-Contact/([0-9]*)/',function($id){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/Contacts_delete.php' ;
});




Route::add($baseURL.'/create-Planned-Action',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/ActionForContact_create.php' ;
});

Route::add($baseURL.'/create-Planned-Action',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/ActionForContact_create.php' ;
},'post');



Route::add($baseURL.'/show-News-for-List-of-Companies',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/ListeEntreprises_showActus.php' ;
});


Route::add($baseURL.'/create-List-of-Companies-to-Follow',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/ListeEntreprises_create.php' ;
});

Route::add($baseURL.'/create-List-of-Companies-to-Follow',function(){
    global $ServeurWeb, $baseREP,$tinyREP,$baseURL,$basePython,$py_Articles,$py_Keywords,$py_Syntaxe,$py_PagesWeb  ;
    require $baseREP.'/ListeEntreprises_create.php' ;
},'post');















Route::run('/');

?>
