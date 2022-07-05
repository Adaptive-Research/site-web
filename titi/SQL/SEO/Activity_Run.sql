


-- Cette table garde une trace de toutes les lancements de jobs pour récupérer les informations google pour un secteur d'activité donné

use SEO ;

drop table if EXISTS `Activity_Run` ;
CREATE TABLE `Activity_Run` (
  `id` int NOT NULL,
  `iscurrent` int DEFAULT NULL,
  `idActivity` int DEFAULT NULL,
  `FirstIdKeywords_Run` int DEFAULT NULL,
  `LastIdKeywords_Run` int DEFAULT NULL,
  `DateRun` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;


--
ALTER TABLE `Activity_Run`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `Activity_Run`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;

