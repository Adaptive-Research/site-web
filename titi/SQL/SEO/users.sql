-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: SEO
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `iscurrent` int DEFAULT NULL,
  `Genre` varchar(5) NOT NULL,
  `Prenom` varchar(75) DEFAULT NULL,
  `Nom` varchar(75) DEFAULT NULL,
  `Email` varchar(250) NOT NULL,
  `Password` varchar(250) NOT NULL,
  `email_verified` int DEFAULT NULL,
  `group_name` varchar(50) NOT NULL,
  `ValueLangue` varchar(3) DEFAULT NULL,
  `Langue` varchar(30) DEFAULT NULL,
  `author` int DEFAULT NULL,
  `date_registered` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `last_login` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,1,'Homme','Daniel','Dupard','ddupard68@gmail.com','$2y$10$Tq78wolGcEXPK5A4oLh/nOWqh.yVcD6NWkTK/AqBxCiVs04766fqC',1,'FullAdmin','FR','Français',NULL,'2022-07-02 07:40:07',NULL) ;
INSERT INTO `users` VALUES (2,1,'Homme','Demo','','demo@gmail.com','$2y$10$WMjwKgPHhyFSU668nLyr/O3mInqoNhd9ITz7YMpj6s37HRikH4wu2',1,'Demo','FR','Français',NULL,'2022-07-02 07:40:07',NULL) ;
INSERT INTO `users` VALUES (3,1,'Homme','Charbel','Mehinto','mehintoangemariecharbel@gmail.com','$2y$10$IGqigmoXu0B38XyF.Qib1eG0WXuNZ8W7A8ypZ.R7evG2Dh7NBlZl2',0,'FullAdmin','FR','Français',1,'2022-07-02 15:37:47',NULL);
INSERT INTO `users` VALUES (4,1,'','','Site Web','contact@PlusDeCA.fr','$2y$10$Tq78wolGcEXPK5A4oLh/nOWqh.yVcD6NWkTK/AqBxCiVs04766fqC',1,'FullAdmin','FR','Français',NULL,'2022-07-02 07:40:07',NULL) ;

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-06  7:53:04
