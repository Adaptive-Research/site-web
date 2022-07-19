


drop table if exists SIRENE_Telephone ;

CREATE TABLE SIRENE_Telephone (

siret varchar(14),

URL  varchar(500) DEFAULT NULL,  
Telephone varchar(30) DEFAULT NULL,
Texte varchar(50)  DEFAULT NULL

)  ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;


ALTER TABLE SIRENE_Telephone ADD KEY (`siret`);
ALTER TABLE SIRENE_Telephone ADD KEY (`Telephone`);

























CREATE TABLE SIRENE_Repartition as SELECT  se.codePostalEtablissement as CodePostal, count(*) as Nombre FROM SIRENE_StockUniteLegale su,  SIRENE_StockEtablissement se where
 se.siren = su.siren 
 and su.categorieJuridiqueUniteLegale < 7000 
group by se.codePostalEtablissement ;

SELECT CodePostal , Nombre FROM SIRENE_Repartition WHERE Nombre >= 1000 and CodePostal <>"" order by CodePostal


SELECT CodePostal , Nombre FROM SIRENE_Repartition WHERE  CodePostal <>"" order by CodePostal



-- Chiffre d'affaire potentiel
SELECT sum( round(Nombre/10,0) ) FROM SIRENE_Repartition WHERE Nombre >= 1000 and CodePostal <>"" 






SELECT libelleCommuneEtablissement, count(*) FROM `SIRENE_StockEtablissement` WHERE codePostalEtablissement = "77140" group by libelleCommuneEtablissement ;
SELECT enseigne1Etablissement, denominationUsuelleEtablissement  FROM `SIRENE_StockEtablissement` WHERE codePostalEtablissement = "77140" ;
select siren, count(*) from `SIRENE_StockEtablissement` group by siren ;
select count(distinct siren) from `SIRENE_StockEtablissement` ;

delete from SIRENE_StockEtablissement where etatAdministratifEtablissement <> "A" ;



select count(*) from SIRENE_StockUniteLegale ;


SELECT * FROM SIRENE_StockUniteLegale su,  SIRENE_StockEtablissement se  WHERE su.prenomUsuelUniteLegale = "LARBI" and su.nomUniteLegale = "ZEM ZEM" and se.siren = su.siren
SELECT * FROM SIRENE_StockUniteLegale su,  SIRENE_StockEtablissement se  WHERE su.nomUniteLegale = "ZEM ZEM" and se.libelleCommuneEtablissement = "NEMOURS" and se.siren = su.siren
SELECT COUNT(*) FROM SIRENE_StockUniteLegale su  WHERE categorieJuridiqueUniteLegale = "6540"
SELECT * FROM SIRENE_StockUniteLegale su  WHERE categorieJuridiqueUniteLegale = "6540"


SELECT se.siren, siret, sigleUniteLegale,prenomUsuelUniteLegale,nomUniteLegale,denominationUniteLegale,denominationUsuelleEtablissement,denominationUsuelle1UniteLegale, numeroVoieEtablissement,typeVoieEtablissement,libelleVoieEtablissement, codePostalEtablissement,libelleCommuneEtablissement,categorieJuridiqueUniteLegale,cj.libelle FROM SIRENE_StockUniteLegale su,  SIRENE_StockEtablissement se, SIRENE_CategorieJuridique cj   WHERE se.libelleCommuneEtablissement = "NEMOURS" and se.siren = su.siren and su.categorieJuridiqueUniteLegale = cj.code
select * FROM SIRENE_StockUniteLegale su,  SIRENE_StockEtablissement se WHERE se.siren = "443226634" and se.siren = su.siren
select * FROM SIRENE_StockUniteLegale su,  SIRENE_StockEtablissement se WHERE se.siret = "89467645100012" and se.siren = su.siren


SELECT * FROM `SIRENE_StockUniteLegale` WHERE nomUniteLegale = "ZEM ZEM"; 







SELECT se.siren, siret, dateCreationEtablissement, se.dateDebut, sigleUniteLegale,prenomUsuelUniteLegale,nomUniteLegale,denominationUniteLegale, 
 denominationUsuelleEtablissement,denominationUsuelle1UniteLegale, numeroVoieEtablissement,typeVoieEtablissement,libelleVoieEtablissement, 
 codePostalEtablissement,libelleCommuneEtablissement,categorieJuridiqueUniteLegale,cj.libelle,etatAdministratifEtablissement,
 sn.libelle as libelleActivite  FROM SIRENE_StockUniteLegale su,  SIRENE_StockEtablissement se, SIRENE_CategorieJuridique cj , SIRENE_NAF sn  
 WHERE se.dateDebut >= "2022-01-01" and su.categorieJuridiqueUniteLegale < 7000 
 and su.dateDebut >= "2022-01-01"
 and su.activitePrincipaleUniteLegale = sn.code and se.siren = su.siren and su.categorieJuridiqueUniteLegale = cj.code order by libelleActivite, siret
  



SELECT se.siren, siret, dateCreationEtablissement, se.dateDebut, sigleUniteLegale,prenomUsuelUniteLegale,nomUniteLegale,denominationUniteLegale, 
 denominationUsuelleEtablissement,denominationUsuelle1UniteLegale, numeroVoieEtablissement,typeVoieEtablissement,libelleVoieEtablissement, 
 codePostalEtablissement,libelleCommuneEtablissement,categorieJuridiqueUniteLegale,cj.libelle,etatAdministratifEtablissement,
 sn.libelle as libelleActivite  FROM SIRENE_StockUniteLegale su,  SIRENE_StockEtablissement se, SIRENE_CategorieJuridique cj , SIRENE_NAF sn  
 WHERE se.dateCreationEtablissement >= "2022-03-01" 
  and se.dateDebut >= "2022-03-01"
  and se.codePostalEtablissement = "77140"
  and su.categorieJuridiqueUniteLegale < "7000" 
  and su.dateCreationUniteLegale >= "2022-03-01"
  and su.dateDebut >= "2022-03-01"
  and su.activitePrincipaleUniteLegale = sn.code and se.siren = su.siren and su.categorieJuridiqueUniteLegale = cj.code 
  and su.categorieJuridiqueUniteLegale in ('3220','5202','5499','5599','5699','5710')
  order by libelleActivite, siret







-- entreprises SARL, SA, SAS 
SELECT se.siren, siret, dateCreationEtablissement, se.dateDebut, sigleUniteLegale,prenomUsuelUniteLegale,nomUniteLegale,denominationUniteLegale, 
 denominationUsuelleEtablissement,denominationUsuelle1UniteLegale, numeroVoieEtablissement,typeVoieEtablissement,libelleVoieEtablissement, 
 codePostalEtablissement,libelleCommuneEtablissement,categorieJuridiqueUniteLegale,cj.libelle,etatAdministratifEtablissement,
 sn.libelle as libelleActivite  FROM SIRENE_StockUniteLegale su,  SIRENE_StockEtablissement se, SIRENE_CategorieJuridique cj , SIRENE_NAF sn  
 WHERE se.codePostalEtablissement = "77140"
  and su.categorieJuridiqueUniteLegale in ('3220','5202','5499','5599','5699','5710')
  and su.activitePrincipaleUniteLegale = sn.code and se.siren = su.siren and su.categorieJuridiqueUniteLegale = cj.code 
  order by libelleActivite, siret




-- entrepreneurs individuels
SELECT se.siren, siret, dateCreationEtablissement, se.dateDebut, sigleUniteLegale,prenomUsuelUniteLegale,nomUniteLegale,denominationUniteLegale, 
 denominationUsuelleEtablissement,denominationUsuelle1UniteLegale, numeroVoieEtablissement,typeVoieEtablissement,libelleVoieEtablissement, 
 codePostalEtablissement,libelleCommuneEtablissement,categorieJuridiqueUniteLegale,cj.libelle,etatAdministratifEtablissement,
 sn.libelle as libelleActivite  FROM SIRENE_StockUniteLegale su,  SIRENE_StockEtablissement se, SIRENE_CategorieJuridique cj , SIRENE_NAF sn  
 WHERE se.codePostalEtablissement = "77140"
  and su.categorieJuridiqueUniteLegale = "1000" 
  and su.activitePrincipaleUniteLegale = sn.code and se.siren = su.siren and su.categorieJuridiqueUniteLegale = cj.code 
  order by libelleActivite, siret




-- administrations 
SELECT se.siren, siret, dateCreationEtablissement, se.dateDebut, sigleUniteLegale,prenomUsuelUniteLegale,nomUniteLegale,denominationUniteLegale, 
 denominationUsuelleEtablissement,denominationUsuelle1UniteLegale, numeroVoieEtablissement,typeVoieEtablissement,libelleVoieEtablissement, 
 codePostalEtablissement,libelleCommuneEtablissement,categorieJuridiqueUniteLegale,cj.libelle,etatAdministratifEtablissement,
 sn.libelle as libelleActivite  FROM SIRENE_StockUniteLegale su,  SIRENE_StockEtablissement se, SIRENE_CategorieJuridique cj , SIRENE_NAF sn  
 WHERE se.codePostalEtablissement = "77140"
  and su.categorieJuridiqueUniteLegale >= "7000" and  and su.categorieJuridiqueUniteLegale < "9000" 
  and su.activitePrincipaleUniteLegale = sn.code and se.siren = su.siren and su.categorieJuridiqueUniteLegale = cj.code 
  order by libelleActivite, siret




-- associations
SELECT se.siren, siret, dateCreationEtablissement, se.dateDebut, sigleUniteLegale,prenomUsuelUniteLegale,nomUniteLegale,denominationUniteLegale, 
 denominationUsuelleEtablissement,denominationUsuelle1UniteLegale, numeroVoieEtablissement,typeVoieEtablissement,libelleVoieEtablissement, 
 codePostalEtablissement,libelleCommuneEtablissement,categorieJuridiqueUniteLegale,cj.libelle,etatAdministratifEtablissement,
 sn.libelle as libelleActivite  FROM SIRENE_StockUniteLegale su,  SIRENE_StockEtablissement se, SIRENE_CategorieJuridique cj , SIRENE_NAF sn  
 WHERE se.codePostalEtablissement = "77140"
  and su.categorieJuridiqueUniteLegale >= "9000"   and su.categorieJuridiqueUniteLegale <> "9110" 
  and su.activitePrincipaleUniteLegale = sn.code and se.siren = su.siren and su.categorieJuridiqueUniteLegale = cj.code 
  order by libelleActivite, siret


-- syndicats de copropriete
SELECT se.siren, siret, dateCreationEtablissement, se.dateDebut, sigleUniteLegale,prenomUsuelUniteLegale,nomUniteLegale,denominationUniteLegale, 
 denominationUsuelleEtablissement,denominationUsuelle1UniteLegale, numeroVoieEtablissement,typeVoieEtablissement,libelleVoieEtablissement, 
 codePostalEtablissement,libelleCommuneEtablissement,categorieJuridiqueUniteLegale,cj.libelle,etatAdministratifEtablissement,
 sn.libelle as libelleActivite  FROM SIRENE_StockUniteLegale su,  SIRENE_StockEtablissement se, SIRENE_CategorieJuridique cj , SIRENE_NAF sn  
 WHERE se.codePostalEtablissement = "77140"
  and su.categorieJuridiqueUniteLegale == "9110" 
  and su.activitePrincipaleUniteLegale = sn.code and se.siren = su.siren and su.categorieJuridiqueUniteLegale = cj.code 
  order by libelleActivite, siret







-- Nombre d'entreprises par categorie
select cj.libelle, cj.code, temp.nombre from (
SELECT categorieJuridiqueUniteLegale, count(*) as nombre FROM SIRENE_StockUniteLegale su
group by su.categorieJuridiqueUniteLegale ) as temp, SIRENE_CategorieJuridique cj where temp.categorieJuridiqueUniteLegale = cj.code




-- toutes les categories juridiques
select * from SIRENE_CategorieJuridique






SELECT se.siren, siret, dateCreationEtablissement, se.dateDebut, sigleUniteLegale,prenomUsuelUniteLegale,nomUniteLegale,denominationUniteLegale, 
denominationUsuelleEtablissement,denominationUsuelle1UniteLegale, numeroVoieEtablissement,typeVoieEtablissement,libelleVoieEtablissement, 
codePostalEtablissement,libelleCommuneEtablissement,categorieJuridiqueUniteLegale,cj.libelle,etatAdministratifEtablissement, sn.libelle as libelleActivite 
FROM SIRENE_StockUniteLegale su, SIRENE_StockEtablissement se, SIRENE_CategorieJuridique cj , SIRENE_NAF sn WHERE se.codePostalEtablissement = "77140" 
and su.activitePrincipaleUniteLegale = sn.code and se.siren = su.siren and su.categorieJuridiqueUniteLegale = cj.code order by libelleActivite, siret 


SELECT se.siren, siret, dateCreationEtablissement, se.dateDebut, sigleUniteLegale,prenomUsuelUniteLegale,nomUniteLegale,denominationUniteLegale, 
denominationUsuelleEtablissement,denominationUsuelle1UniteLegale, numeroVoieEtablissement,typeVoieEtablissement,libelleVoieEtablissement,
 codePostalEtablissement,libelleCommuneEtablissement,categorieJuridiqueUniteLegale,cj.libelle,etatAdministratifEtablissement, sn.libelle as libelleActivite
FROM SIRENE_StockUniteLegale su, SIRENE_StockEtablissement se, SIRENE_CategorieJuridique cj , SIRENE_NAF sn WHERE se.codePostalEtablissement = "77140" 
and su.categorieJuridiqueUniteLegale in (6539,6540) 
and su.activitePrincipaleUniteLegale = sn.code and se.siren = su.siren and su.categorieJuridiqueUniteLegale = cj.code order by libelleActivite, siret 


SELECT se.siren, siret, dateCreationEtablissement, se.dateDebut, sigleUniteLegale,prenomUsuelUniteLegale,nomUniteLegale,denominationUniteLegale, 
denominationUsuelleEtablissement,denominationUsuelle1UniteLegale, numeroVoieEtablissement,typeVoieEtablissement,libelleVoieEtablissement, 
codePostalEtablissement,libelleCommuneEtablissement,categorieJuridiqueUniteLegale,cj.libelle,etatAdministratifEtablissement, sn.libelle as libelleActivite 
FROM SIRENE_StockUniteLegale su, SIRENE_StockEtablissement se, SIRENE_CategorieJuridique cj , SIRENE_NAF sn WHERE se.codePostalEtablissement = "77140" 
and su.categorieJuridiqueUniteLegale in (3220,5202,5499,5599,5699,5710) 
and su.activitePrincipaleUniteLegale = sn.code and se.siren = su.siren and su.categorieJuridiqueUniteLegale = cj.code order by libelleActivite, siret 


SELECT se.siren, siret, dateCreationEtablissement, se.dateDebut, sigleUniteLegale,prenomUsuelUniteLegale,nomUniteLegale,denominationUniteLegale, 
denominationUsuelleEtablissement,denominationUsuelle1UniteLegale, numeroVoieEtablissement,typeVoieEtablissement,libelleVoieEtablissement, 
codePostalEtablissement,libelleCommuneEtablissement,categorieJuridiqueUniteLegale,cj.libelle,etatAdministratifEtablissement, sn.libelle as libelleActivite 
FROM SIRENE_StockUniteLegale su, SIRENE_StockEtablissement se, SIRENE_CategorieJuridique cj , SIRENE_NAF sn WHERE se.codePostalEtablissement = "77140" 
and su.categorieJuridiqueUniteLegale = 8420 
and su.activitePrincipaleUniteLegale = sn.code and se.siren = su.siren and su.categorieJuridiqueUniteLegale = cj.code order by libelleActivite, siret 





