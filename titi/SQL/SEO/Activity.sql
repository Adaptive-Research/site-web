-- phpMyAdmin SQL Dump
-- version 5.1.1


-- Cette table permet de créer un secteur d'activité

use SEO ;


DROP TABLE IF EXISTS 'Activity' ;
CREATE TABLE `Activity` (
  `id` int NOT NULL,
  `iscurrent` int DEFAULT NULL,
  `Secteur` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;



INSERT INTO `Activity` (`id`, `iscurrent`, `Secteur`, `date`) VALUES
(1, 1, 'agence webmarketing', '2019-07-10 06:20:43'),
(27, 1, 'crm', '2019-07-19 05:53:32'),
(29, 1, 'agence de rédaction de contenu', '2019-08-15 05:52:40'),
(30, 1, 'ssii', '2019-08-06 05:48:20'),
(31, 1, 'experts comptable', '2019-09-03 05:54:18');
(32, 1, 'seo', '2022-04-15 05:54:18');

ALTER TABLE `Activity`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `Activity`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
COMMIT;

