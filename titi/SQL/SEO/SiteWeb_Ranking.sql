
-- après avoir récupéré les recherches google, on peut identifier le scoring de chaque domaine
-- Cette table sert à garder une trace du classement de chaque domaine

use SEO ;
DROP TABLE IF EXISTS `SiteWeb_Ranking` ;
CREATE TABLE `SiteWeb_Ranking` (
    `id` int NOT NULL,
    `iscurrent` int DEFAULT 1,

    `idActivityRun` int DEFAULT NULL,
    `idActivity` int DEFAULT NULL,
   

    `Domaine` varchar(75) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `isRelevant` int DEFAULT 1,
    `TotalScoring` float DEFAULT NULL, 
    `TotalOrganicRanking` int DEFAULT NULL,



    `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;


ALTER TABLE `SiteWeb_Ranking`
  ADD PRIMARY KEY (`id`);

ALTER TABLE`SiteWeb_Ranking`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;

