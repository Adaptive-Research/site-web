



drop table if exists  CRM_Infos_Contact ;

CREATE TABLE CRM_Infos_Contact (
id int NOT NULL, 

idClientCRM int not NULL,

Prenom varchar(20),
Nom varchar(100),

Job varchar(100),

siren varchar(9), 
siret varchar(14),
NomEntreprise varchar(120),
Fixe varchar(15) DEFAULT NULL,
URL  varchar(500) DEFAULT NULL,

Mobile varchar(15) DEFAULT NULL,
Email varchar(100),
LinkedIn varchar(500) DEFAULT NULL,       
Facebook varchar(500) DEFAULT NULL       

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

ALTER TABLE CRM_Infos_Contact ADD PRIMARY KEY (`id`);

ALTER TABLE CRM_Infos_Contact ADD KEY (`idClientCRM`);
ALTER TABLE CRM_Infos_Contact ADD KEY (`siren`);
ALTER TABLE CRM_Infos_Contact ADD KEY (`siret`);
ALTER TABLE CRM_Infos_Contact ADD KEY (`NomEntreprise`);
ALTER TABLE CRM_Infos_Contact ADD KEY (`Job`);
ALTER TABLE CRM_Infos_Contact ADD KEY (`Prenom`);
ALTER TABLE CRM_Infos_Contact ADD KEY (`Nom`);
ALTER TABLE CRM_Infos_Contact ADD KEY (`Mobile`);
ALTER TABLE CRM_Infos_Contact ADD KEY (`Fixe`);
