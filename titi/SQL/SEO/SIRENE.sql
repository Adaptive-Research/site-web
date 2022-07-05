drop table if exists  SIRENE_StockEtablissement ;

CREATE TABLE SIRENE_StockEtablissement (
siren varchar(9),
nic varchar(5),
siret varchar(14),
statutDiffusionEtablissement varchar(1),
dateCreationEtablissement varchar(10),
trancheEffectifsEtablissement varchar(2),
anneeEffectifsEtablissement varchar(4),
activitePrincipaleRegistreMetiersEtablissement varchar(6),
dateDernierTraitementEtablissement varchar(25),
etablissementSiege varchar(5),
nombrePeriodesEtablissement varchar(2),
complementAdresseEtablissement varchar(38),
numeroVoieEtablissement varchar(4),
indiceRepetitionEtablissement varchar(1),
typeVoieEtablissement varchar(4),
libelleVoieEtablissement varchar(100),
codePostalEtablissement varchar(5),
libelleCommuneEtablissement varchar(100),
libelleCommuneEtrangerEtablissement varchar(100),
distributionSpecialeEtablissement varchar(26),
codeCommuneEtablissement varchar(5),
codeCedexEtablissement varchar(9),
libelleCedexEtablissement varchar(100),
codePaysEtrangerEtablissement varchar(5),
libellePaysEtrangerEtablissement varchar(100),
complementAdresse2Etablissement varchar(38),
numeroVoie2Etablissement varchar(4),
indiceRepetition2Etablissement varchar(4),
typeVoie2Etablissement varchar(4),
libelleVoie2Etablissement varchar(100),
codePostal2Etablissement varchar(5),
libelleCommune2Etablissement varchar(100),
libelleCommuneEtranger2Etablissement varchar(100),
distributionSpeciale2Etablissement varchar(26),
codeCommune2Etablissement varchar(5),
codeCedex2Etablissement varchar(9),
libelleCedex2Etablissement varchar(100),
codePaysEtranger2Etablissement varchar(5),
libellePaysEtranger2Etablissement varchar(100),
dateDebut varchar(10),
etatAdministratifEtablissement varchar(1),
enseigne1Etablissement varchar(50),
enseigne2Etablissement varchar(50),
enseigne3Etablissement varchar(50),
denominationUsuelleEtablissement varchar(100),
activitePrincipaleEtablissement varchar(6),
nomenclatureActivitePrincipaleEtablissement varchar(8),
caractereEmployeurEtablissement  varchar(1)

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;




ALTER TABLE SIRENE_StockEtablissement ADD PRIMARY KEY (`siret`);

ALTER TABLE SIRENE_StockEtablissement ADD KEY (`siren`);
ALTER TABLE SIRENE_StockEtablissement ADD KEY (`codePostalEtablissement`);
ALTER TABLE SIRENE_StockEtablissement ADD KEY (`libelleCommuneEtablissement`);
ALTER TABLE SIRENE_StockEtablissement ADD KEY (`dateDebut`);
ALTER TABLE SIRENE_StockEtablissement ADD KEY (`dateCreationEtablissement`);



drop table if exists  SIRENE_StockUniteLegale ;

CREATE TABLE SIRENE_StockUniteLegale (

siren  varchar(9),
statutDiffusionUniteLegale varchar(1),
unitePurgeeUniteLegale varchar(5),
dateCreationUniteLegale varchar(10),
sigleUniteLegale varchar(20),
sexeUniteLegale varchar(1),
prenom1UniteLegale varchar(20),
prenom2UniteLegale varchar(20),
prenom3UniteLegale varchar(20),
prenom4UniteLegale varchar(20),
prenomUsuelUniteLegale varchar(20),
pseudonymeUniteLegale varchar(100),
identifiantAssociationUniteLegale varchar(10),
trancheEffectifsUniteLegale varchar(2),
anneeEffectifsUniteLegale varchar(4),
dateDernierTraitementUniteLegale varchar(25),
nombrePeriodesUniteLegale varchar(2),
categorieEntreprise varchar(3),
anneeCategorieEntreprise varchar(4),
dateDebut varchar(10),
etatAdministratifUniteLegale varchar(1),
nomUniteLegale varchar(100),
nomUsageUniteLegale varchar(100),
denominationUniteLegale varchar(120),
denominationUsuelle1UniteLegale varchar(70),
denominationUsuelle2UniteLegale varchar(70),
denominationUsuelle3UniteLegale varchar(70),
categorieJuridiqueUniteLegale varchar(4),
activitePrincipaleUniteLegale varchar(6),
nomenclatureActivitePrincipaleUniteLegale varchar(8),
nicSiegeUniteLegale varchar(5),
economieSocialeSolidaireUniteLegale varchar(1),
caractereEmployeurUniteLegale varchar(1)


) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

ALTER TABLE SIRENE_StockUniteLegale ADD PRIMARY KEY (`siren`);

ALTER TABLE SIRENE_StockUniteLegale ADD KEY (`prenomUsuelUniteLegale`);
ALTER TABLE SIRENE_StockUniteLegale ADD KEY (`nomUniteLegale`);
ALTER TABLE SIRENE_StockUniteLegale ADD KEY (`categorieJuridiqueUniteLegale`);
ALTER TABLE SIRENE_StockUniteLegale ADD KEY (`dateDebut`);
ALTER TABLE SIRENE_StockUniteLegale ADD KEY (`dateCreationUniteLegale`);


-- DROP INDEX prenomUsuelUniteLegale ON SIRENE_StockUniteLegale ;
-- DROP INDEX nomUniteLegale ON SIRENE_StockUniteLegale ;
-- DROP INDEX categorieJuridiqueUniteLegale ON SIRENE_StockUniteLegale ;

-- delete from SIRENE_StockUniteLegale where etatAdministratifUniteLegale <> "A" ;









drop table if exists  SIRENE_CategorieJuridique ;

CREATE TABLE SIRENE_CategorieJuridique (

code  varchar(4),
libelle varchar(150)


) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

ALTER TABLE SIRENE_CategorieJuridique ADD PRIMARY KEY (`code`);



LOAD DATA INFILE '/var/lib/mysql-files/cj_202007.csv'
INTO TABLE SIRENE_CategorieJuridique
FIELDS Terminated by ',' 
optionally enclosed by '"'
LINES Terminated by '\n'
IGNORE 1 LINES ;





drop table if exists  SIRENE_NAF ;

CREATE TABLE SIRENE_NAF (

code  varchar(10),
libelle varchar(150)


) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

ALTER TABLE SIRENE_NAF ADD PRIMARY KEY (`code`);



LOAD DATA INFILE '/var/lib/mysql-files/naf2008_liste_n5.csv'
INTO TABLE SIRENE_NAF
FIELDS Terminated by ',' 
optionally enclosed by '"'
LINES Terminated by '\n'
IGNORE 1 LINES ;


















drop table if exists  SIRENE_Infos_UniteLegale ;
CREATE TABLE SIRENE_Infos_UniteLegale (

siren  varchar(9),

Dirigeants varchar(200),

-- le champ ci-dessous servt quand la boite est dans la table Profession_Entreprises qui provient de GoogleMyBusiness 
TypeEntreprise varchar(100) DEFAULT NULL,

LinkedIn varchar(500) DEFAULT NULL,         -- utilise que pour les fiches entreprises sur linkedIn
Facebook varchar(500) DEFAULT NULL,         -- utilise que pour les fiches entreprises sur facebook

URL  varchar(500) DEFAULT NULL,
Fixe varchar(15) DEFAULT NULL,
MailSuffixe varchar(50) DEFAULT NULL

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

ALTER TABLE SIRENE_Infos_UniteLegale ADD PRIMARY KEY (`siren`);





drop table if exists  SIRENE_Infos_Etablissement ;





drop table if exists SIRENE_Telephone ;

CREATE TABLE SIRENE_Telephone (

siret varchar(14),

URL  varchar(500) DEFAULT NULL,  -- source de l'info
Telephone varchar(30) DEFAULT NULL

)  ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;


ALTER TABLE SIRENE_Telephone ADD KEY (`siret`);
ALTER TABLE SIRENE_Telephone ADD KEY (`Telephone`);

ALTER TABLE SIRENE_Telephone MODIFY Telephone VARCHAR(30) DEFAULT NULL;

























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





