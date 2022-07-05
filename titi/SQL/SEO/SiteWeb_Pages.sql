
DROP TABLE IF EXISTS `SiteWeb_Domaines` ;
CREATE TABLE `SiteWeb_Domaines` (
    id int NOT NULL,
    Domaine varchar(75) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    NombrePages int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;


ALTER TABLE `SiteWeb_Domaines`
  ADD PRIMARY KEY (`id`);

ALTER TABLE`SiteWeb_Domaines`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;









DROP TABLE IF EXISTS `SiteWeb_DatesDomaines` ;
CREATE TABLE `SiteWeb_DatesDomaines` (
    `id` int NOT NULL,
    `idDomaine` int NOT NULL,
    `sdate` varchar(30)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;


ALTER TABLE `SiteWeb_DatesDomaines`
  ADD PRIMARY KEY (`id`);

ALTER TABLE`SiteWeb_DatesDomaines`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;







DROP TABLE IF EXISTS `SiteWeb_Pages` ;
CREATE TABLE `SiteWeb_Pages` (
    `id` int NOT NULL,
    `idDomaine` int NOT NULL,
    `idDate` int NOT NULL,
    `URL` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `HasBeenRetrieved` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;


ALTER TABLE `SiteWeb_Pages`
  ADD PRIMARY KEY (`id`);

ALTER TABLE`SiteWeb_Pages`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;












