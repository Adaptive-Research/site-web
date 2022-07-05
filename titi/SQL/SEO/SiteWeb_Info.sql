DROP TABLE IF EXISTS `SiteWeb_Info` ;
CREATE TABLE `SiteWeb_Info` (
    `id` int NOT NULL,
    `iscurrent` int DEFAULT 1,

    `Domaine` varchar(75) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,

    `Type` varchar(75) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `Marketing` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `Zone` varchar(75) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;


ALTER TABLE `SiteWeb_Info`
  ADD PRIMARY KEY (`id`);

ALTER TABLE`SiteWeb_Info`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;
