


drop table if EXISTS Villes ;
CREATE TABLE Villes (

id int NOT NULL,    


CodeVilleInsee  int default NULL,

NomVille varchar(40) default NULL,
CodePostal varchar(8) default NULL,
PopulationTotale int default 0,

VilleMinu varchar(40) default NULL, # nom de la ville en minuscules et sans tiret

VillePrincipale int default NULL,

latitude double default NULL, 
longitude double default NULL

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;



ALTER TABLE Villes
  ADD PRIMARY KEY (`id`);


ALTER TABLE Villes
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;






