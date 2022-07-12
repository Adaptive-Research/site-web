
-- agence marketing
SELECT * FROM `SIRENE_StockUniteLegale` su, SIRENE_StockEtablissement se 
WHERE 
su.activitePrincipaleUniteLegale in ('74.10Z','73.11Z')
and se.siren = su.siren
and se.codePostalEtablissement = "77140"



-- agence immobilieres
SELECT * FROM `SIRENE_StockUniteLegale` su, SIRENE_StockEtablissement se 
WHERE 
su.activitePrincipaleUniteLegale in ('68.31Z')
and se.siren = su.siren
and se.codePostalEtablissement = "77140"


SELECT sn.libelle, count(*) FROM `SIRENE_StockUniteLegale` su,  SIRENE_NAF sn  
WHERE su.activitePrincipaleUniteLegale = sn.code 
group by sn.libelle





SELECT count(*) FROM `SIRENE_StockUniteLegale` WHERE dateDebut >= "2022-01-01";





select * from Profession_Entreprises_ResultsRuns perr, Profession_Entreprises pe where perr.idEntreprise = pe.id and pe.VilleMinu = 'nemours'

select * from Profession_Entreprises_ResultsRuns perr, Profession_Entreprises pe where perr.idEntreprise = pe.id and pe.VilleMinu = 'nemours'



-- nouvelles entreprises de type SA, SAS, SARL créées

SELECT denominationUniteLegale, activitePrincipaleUniteLegale, sn.libelle FROM SIRENE_StockUniteLegale su, SIRENE_NAF sn 
 WHERE 
 su.statutDiffusionUniteLegale = 'O' 
 and su.categorieJuridiqueUniteLegale in (3220,5202,5499,5599,5699,5710)
 and su.dateDebut >= "2022-01-01"
 and su.dateCreationUniteLegale >= "2022-01-01"
and su.activitePrincipaleUniteLegale = sn.code

 





SELECT se.siren, siret, dateCreationEtablissement, se.dateDebut, sigleUniteLegale,prenomUsuelUniteLegale,nomUniteLegale,denominationUniteLegale, 
 denominationUsuelleEtablissement,denominationUsuelle1UniteLegale, numeroVoieEtablissement,typeVoieEtablissement,libelleVoieEtablissement, 
 codePostalEtablissement,libelleCommuneEtablissement,categorieJuridiqueUniteLegale,etatAdministratifEtablissement,trancheEffectifsEtablissement,
 anneeEffectifsEtablissement, sn.libelle as Activite FROM SIRENE_StockUniteLegale su,  SIRENE_StockEtablissement se , SIRENE_NAF sn 
WHERE 
 su.statutDiffusionUniteLegale = 'O' 
 and su.categorieJuridiqueUniteLegale in (3220,5202,5499,5599,5699,5710)
 and se.siren = su.siren 
 and su.dateDebut >= "2022-01-01"
 and se.dateDebut >= "2022-01-01" 
 and su.dateCreationUniteLegale >= "2022-01-01"
 and su.dateCreationUniteLegale <= "2022-07-30"
 and su.activitePrincipaleUniteLegale = sn.code  
 order by su.dateCreationUniteLegale ;





select temp.*, siu.Dirigeants FROM (SELECT se.siren, siret, dateCreationEtablissement, se.dateDebut, sigleUniteLegale,prenomUsuelUniteLegale,nomUniteLegale,denominationUniteLegale, 
 denominationUsuelleEtablissement,denominationUsuelle1UniteLegale, numeroVoieEtablissement,typeVoieEtablissement,libelleVoieEtablissement, 
 codePostalEtablissement,libelleCommuneEtablissement,categorieJuridiqueUniteLegale,cj.libelle,etatAdministratifEtablissement,trancheEffectifsEtablissement,
  anneeEffectifsEtablissement, 
 sn.libelle as libelleActivite  FROM SIRENE_StockUniteLegale su,  SIRENE_StockEtablissement se, SIRENE_CategorieJuridique cj , SIRENE_NAF sn 
 WHERE 
 su.statutDiffusionUniteLegale = 'O' 
 and se.siren = su.siren 
 and su.dateDebut >= "2022-01-01"
 and su.activitePrincipaleUniteLegale = sn.code 
 and su.categorieJuridiqueUniteLegale = cj.code) as temp 
 left outer join SIRENE_Infos_UniteLegale siu  
 on temp.siren = siu.siren 
 order by temp.libelleActivite, temp.siret


select se.Siret from SIRENE_StockEtablissement se, SIRENE_StockUniteLegale su where se.codePostalEtablissement = "77140"
and se.siren = su.siren
and su.categorieJuridiqueUniteLegale in (3220,5202,5499,5599,5699,5710) 
and se.Siret not in (select Siret from SIRENE_Telephone)




select temp.categorieJuridiqueUniteLegale, cj.libelle, temp.nombre from  (SELECT su.categorieJuridiqueUniteLegale,  count(*) as nombre FROM SIRENE_StockUniteLegale su
group by su.categorieJuridiqueUniteLegale) as temp ,  SIRENE_CategorieJuridique cj
where temp.categorieJuridiqueUniteLegale = cj.code 
order by temp.nombre desc