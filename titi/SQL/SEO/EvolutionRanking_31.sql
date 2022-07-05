-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 02, 2022 at 01:39 PM
-- Server version: 8.0.29-0ubuntu0.20.04.3
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `SEO`
--

-- --------------------------------------------------------

--
-- Table structure for table `EvolutionRanking_31`
--

CREATE TABLE `EvolutionRanking_31` (
  `idActivity` int DEFAULT NULL,
  `Domaine` varchar(75) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `idActivityRun_0` int DEFAULT '11',
  `TotalOrganicRanking_0` int DEFAULT NULL,
  `TotalScoring_0` float DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `EvolutionRanking_31`
--

INSERT INTO `EvolutionRanking_31` (`idActivity`, `Domaine`, `idActivityRun_0`, `TotalOrganicRanking_0`, `TotalScoring_0`, `date`) VALUES
(31, 'legalplace.fr', 11, 19, 8.3, '2022-05-09 20:01:48'),
(31, 'experts-comptables.fr', 11, 5, 25.4, '2022-05-09 20:01:48'),
(31, 'onisep.fr', 11, 11, 15.6, '2022-05-09 20:01:48'),
(31, 'l-expert-comptable.com', 11, 4, 27.3, '2022-05-09 20:01:48'),
(31, 'cidj.com', 11, 18, 8.6, '2022-05-09 20:01:48'),
(31, 'comptalia.com', 11, 23, 6.6, '2022-05-09 20:01:48'),
(31, 'bpifrance-creation.fr', 11, 27, 5.9, '2022-05-09 20:01:48'),
(31, 'journaldunet.fr', 11, 2, 51.6, '2022-05-09 20:01:48'),
(31, 'studi.com', 11, 34, 3.8, '2022-05-09 20:01:48'),
(31, 'compta-intouch.com', 11, 48, 2.4, '2022-05-09 20:01:48'),
(31, 'experts-comptables.org', 11, 41, 2.9, '2022-05-09 20:01:48'),
(31, 'wikipedia.org', 11, 8, 22, '2022-05-09 20:01:48'),
(31, 'hellowork.com', 11, 40, 3, '2022-05-09 20:01:48'),
(31, 'aujourdhui.fr', 11, 58, 1.4, '2022-05-09 20:01:48'),
(31, 'keobiz.fr', 11, 83, 1, '2022-05-09 20:01:48'),
(31, 'pwc.fr', 11, 92, 1, '2022-05-09 20:01:48'),
(31, 'inextenso.fr', 11, 39, 3.1, '2022-05-09 20:01:48'),
(31, 'cabinet-d-expertcomptable.com', 11, 70, 1, '2022-05-09 20:01:48'),
(31, 'fiducial.fr', 11, 12, 13.4, '2022-05-09 20:01:48'),
(31, 'dougs.fr', 11, 61, 1.2, '2022-05-09 20:01:48'),
(31, 'indy.fr', 11, 45, 2.7, '2022-05-09 20:01:48'),
(31, 'exco.fr', 11, 57, 1.5, '2022-05-09 20:01:48'),
(31, 'groupe-reussite.fr', 11, 81, 1, '2022-05-09 20:01:48'),
(31, 'apec.fr', 11, 104, 0.7, '2022-05-09 20:01:48'),
(31, 'afex-experts-comptables.fr', 11, 62, 1.1, '2022-05-09 20:01:48'),
(31, 'esam-ecoles.com', 11, 112, 0.7, '2022-05-09 20:01:48'),
(31, 'expertcomptable-paris.com', 11, 9, 16.3, '2022-05-09 20:01:48'),
(31, '1001expertscomptables.com', 11, 103, 0.7, '2022-05-09 20:01:48'),
(31, 'companeo.com', 11, 47, 2.4, '2022-05-09 20:01:48'),
(31, 'sellsy.com', 11, 134, 0.7, '2022-05-09 20:01:48'),
(31, 'letudiant.fr', 11, 124, 0.7, '2022-05-09 20:01:48'),
(31, 'gouv.fr', 11, 7, 23.4, '2022-05-09 20:01:48'),
(31, 'bakertilly.fr', 11, 59, 1.3, '2022-05-09 20:01:48'),
(31, 'compta-facile.com', 11, 10, 16, '2022-05-09 20:01:48'),
(31, 'qualians.fr', 11, 182, 0.4, '2022-05-09 20:01:48'),
(31, 'cogedis.com', 11, 162, 0.4, '2022-05-09 20:01:48'),
(31, 'oec-paris.fr', 11, 21, 7, '2022-05-09 20:01:48'),
(31, 'fedfinance.fr', 11, 64, 1.1, '2022-05-09 20:01:48'),
(31, 'cabinetecai.com', 11, 141, 0.6, '2022-05-09 20:01:48'),
(31, 'ics-begue.com', 11, 171, 0.4, '2022-05-09 20:01:48'),
(31, 'malakoffhumanis.com', 11, 177, 0.4, '2022-05-09 20:01:48'),
(31, 'wagnerassocies.fr', 11, 187, 0.4, '2022-05-09 20:01:48'),
(31, 'oec-npc.com', 11, 179, 0.4, '2022-05-09 20:01:48'),
(31, 'psbedu.paris', 11, 238, 0.2, '2022-05-09 20:01:48'),
(31, 'cnam.fr', 11, 208, 0.2, '2022-05-09 20:01:48'),
(31, 'hans-associes.fr', 11, 146, 0.6, '2022-05-09 20:01:48'),
(31, 'ey.com', 11, 190, 0.3, '2022-05-09 20:01:48'),
(31, 'lesechos.fr', 11, 195, 0.3, '2022-05-09 20:01:48'),
(31, 'groupe-fiba.fr', 11, 192, 0.3, '2022-05-09 20:01:48'),
(31, 'probtp.com', 11, 237, 0.2, '2022-05-09 20:01:48'),
(31, 'escg.fr', 11, 219, 0.2, '2022-05-09 20:01:48'),
(31, 'cegid.com', 11, 161, 0.4, '2022-05-09 20:01:48'),
(31, 'jedeclare.com', 11, 228, 0.2, '2022-05-09 20:01:48'),
(31, 'lebonexpertcomptable.com', 11, 231, 0.2, '2022-05-09 20:01:48'),
(31, 'france-expertise.fr', 11, 99, 0.8, '2022-05-09 20:01:48'),
(31, 'axens-audit.fr', 11, 25, 6, '2022-05-09 20:01:48'),
(31, 'editions-legislatives.fr', 11, 349, 0.1, '2022-05-09 20:01:48'),
(31, 'bfmtv.com', 11, 282, 0.1, '2022-05-09 20:01:48'),
(31, 'oriane.info', 11, 418, 0.1, '2022-05-09 20:01:48'),
(31, 'numbr.co', 11, 1, 58.8, '2022-05-09 20:01:48'),
(31, 'ines-expertise.fr', 11, 193, 0.3, '2022-05-09 20:01:48'),
(31, 'cabinetsofar.com', 11, 311, 0.1, '2022-05-09 20:01:48'),
(31, 'lemondeduchiffre.fr', 11, 398, 0.1, '2022-05-09 20:01:48'),
(31, 'compagnie-fiduciaire.com', 11, 30, 5.4, '2022-05-09 20:01:48'),
(31, 'wity.fr', 11, 244, 0.2, '2022-05-09 20:01:48'),
(31, 'pagny-associes.com', 11, 422, 0.1, '2022-05-09 20:01:48'),
(31, 'orientation-education.com', 11, 419, 0.1, '2022-05-09 20:01:48'),
(31, 'le-net-expert-comptable.com', 11, 397, 0.1, '2022-05-09 20:01:48'),
(31, 'orcom.fr', 11, 32, 4.7, '2022-05-09 20:01:48'),
(31, 'a2cexpertise.fr', 11, 248, 0.1, '2022-05-09 20:01:48'),
(31, 'pagesjaunes.fr', 11, 3, 39.9, '2022-05-09 20:01:48'),
(31, 'cabinet-hive.com', 11, 294, 0.1, '2022-05-09 20:01:48'),
(31, 'leboncomptable.com', 11, 147, 0.6, '2022-05-09 20:01:48'),
(31, 'comptasante.fr', 11, 331, 0.1, '2022-05-09 20:01:48'),
(31, 'studyrama.com', 11, 445, 0.1, '2022-05-09 20:01:48'),
(31, 'ferco-experts.fr', 11, 363, 0.1, '2022-05-09 20:01:48'),
(31, 'supexpertise.fr', 11, 446, 0.1, '2022-05-09 20:01:48'),
(31, 'orientation-pour-tous.fr', 11, 420, 0.1, '2022-05-09 20:01:48'),
(31, 'tgs-france.fr', 11, 67, 1.1, '2022-05-09 20:01:48'),
(31, 'jcarmand.com', 11, 6, 23.6, '2022-05-09 20:01:48'),
(31, 'info-comptable.org', 11, 17, 9.4, '2022-05-09 20:01:48'),
(31, 'linkfinance.fr', 11, 401, 0.1, '2022-05-09 20:01:48'),
(31, 'scribbr.fr', 11, 437, 0.1, '2022-05-09 20:01:48'),
(31, 'alvysion.fr', 11, 265, 0.1, '2022-05-09 20:01:48'),
(31, 'espace-autoentrepreneur.com', 11, 353, 0.1, '2022-05-09 20:01:48'),
(31, 'groupe-bba.com', 11, 373, 0.1, '2022-05-09 20:01:48'),
(31, 'cabinetmcs.fr', 11, 309, 0.1, '2022-05-09 20:01:48'),
(31, 'concilioexpert.com', 11, 334, 0.1, '2022-05-09 20:01:48'),
(31, 'cabinetcollet.net', 11, 306, 0.1, '2022-05-09 20:01:48'),
(31, 'affiches-parisiennes.com', 11, 259, 0.1, '2022-05-09 20:01:48'),
(31, 'compta.com', 11, 209, 0.2, '2022-05-09 20:01:48'),
(31, 'khadiri.com', 11, 394, 0.1, '2022-05-09 20:01:48'),
(31, 'cerfrance.fr', 11, 206, 0.2, '2022-05-09 20:01:48'),
(31, 'cadremploi.fr', 11, 312, 0.1, '2022-05-09 20:01:48'),
(31, 'expert-comptable.com', 11, 357, 0.1, '2022-05-09 20:01:48'),
(31, 'smallbusinessact.com', 11, 440, 0.1, '2022-05-09 20:01:48'),
(31, 'tiime.fr', 11, 448, 0.1, '2022-05-09 20:01:48'),
(31, 'actuel-expert-comptable.fr', 11, 253, 0.1, '2022-05-09 20:01:48'),
(31, 'efl.fr', 11, 218, 0.2, '2022-05-09 20:01:48'),
(31, 'leparisien.fr', 11, 399, 0.1, '2022-05-09 20:01:48'),
(31, 'lecoindesentrepreneurs.fr', 11, 15, 9.6, '2022-05-09 20:01:48'),
(31, 'compta-online.com', 11, 22, 6.9, '2022-05-09 20:01:48'),
(31, 'sage.com', 11, 37, 3.7, '2022-05-09 20:01:48'),
(31, 'ebp.com', 11, 38, 3.1, '2022-05-09 20:01:48'),
(31, 'peoplespheres.fr', 11, 91, 1, '2022-05-09 20:01:48'),
(31, 'ipaidthat.io', 11, 82, 1, '2022-05-09 20:01:48'),
(31, 'comptabilite-generale.fr', 11, 74, 1, '2022-05-09 20:01:48'),
(31, 'controledegestion.org', 11, 63, 1.1, '2022-05-09 20:01:48'),
(31, 'infonet.fr', 11, 52, 2, '2022-05-09 20:01:48'),
(31, 'univ-cotedazur.fr', 11, 95, 1, '2022-05-09 20:01:48'),
(31, 'emasphere.com', 11, 77, 1, '2022-05-09 20:01:48'),
(31, 'manager-go.com', 11, 85, 1, '2022-05-09 20:01:48'),
(31, 'intuit.com', 11, 194, 0.3, '2022-05-09 20:01:48'),
(31, 'qiiro.eu', 11, 133, 0.7, '2022-05-09 20:01:48'),
(31, 'freddelacompta.com', 11, 115, 0.7, '2022-05-09 20:01:48'),
(31, 'beaboss.fr', 11, 105, 0.7, '2022-05-09 20:01:48'),
(31, 'gecia.fr', 11, 116, 0.7, '2022-05-09 20:01:48'),
(31, 'legalstart.fr', 11, 98, 0.9, '2022-05-09 20:01:48'),
(31, 'ooreka.fr', 11, 49, 2.4, '2022-05-09 20:01:48'),
(31, 'calebgestion.com', 11, 109, 0.7, '2022-05-09 20:01:48'),
(31, 'mines-paristech.fr', 11, 128, 0.7, '2022-05-09 20:01:48'),
(31, 'cultura.com', 11, 164, 0.4, '2022-05-09 20:01:48'),
(31, 'suiteexpert.fr', 11, 185, 0.4, '2022-05-09 20:01:48'),
(31, 'gereso.com', 11, 100, 0.8, '2022-05-09 20:01:48'),
(31, 'efe.fr', 11, 143, 0.6, '2022-05-09 20:01:48'),
(31, 'cegos.fr', 11, 148, 0.5, '2022-05-09 20:01:48'),
(31, 'chefdentreprise.com', 11, 142, 0.6, '2022-05-09 20:01:48'),
(31, 'vernimmen.net', 11, 102, 0.8, '2022-05-09 20:01:48'),
(31, 'comptactu.fr', 11, 210, 0.2, '2022-05-09 20:01:48'),
(31, 'isek.fr', 11, 227, 0.2, '2022-05-09 20:01:48'),
(31, 'betterstudy.ch', 11, 200, 0.2, '2022-05-09 20:01:48'),
(31, 'francecompetences.fr', 11, 226, 0.2, '2022-05-09 20:01:48'),
(31, 'fnac.com', 11, 191, 0.3, '2022-05-09 20:01:48'),
(31, 'universalis.fr', 11, 196, 0.3, '2022-05-09 20:01:48'),
(31, 'project-si.fr', 11, 181, 0.4, '2022-05-09 20:01:48'),
(31, 'microsoft.com', 11, 408, 0.1, '2022-05-09 20:01:48'),
(31, 'experts-formations.com', 11, 360, 0.1, '2022-05-09 20:01:48'),
(31, 'decitre.fr', 11, 341, 0.1, '2022-05-09 20:01:48'),
(31, 'amue.fr', 11, 199, 0.2, '2022-05-09 20:01:48'),
(31, 'orsys.fr', 11, 235, 0.2, '2022-05-09 20:01:48'),
(31, 'dunod.com', 11, 345, 0.1, '2022-05-09 20:01:48'),
(31, 'chlorofil.fr', 11, 322, 0.1, '2022-05-09 20:01:48'),
(31, 'outils-de-gestion.fr', 11, 421, 0.1, '2022-05-09 20:01:48'),
(31, 'votre-expert-des-associations.fr', 11, 455, 0.1, '2022-05-09 20:01:48'),
(31, 'azopio.com', 11, 278, 0.1, '2022-05-09 20:01:48'),
(31, 'acpformation.fr', 11, 251, 0.1, '2022-05-09 20:01:48'),
(31, '1819.brussels', 11, 246, 0.1, '2022-05-09 20:01:48'),
(31, 'petite-entreprise.net', 11, 427, 0.1, '2022-05-09 20:01:48'),
(31, 'admilia.fr', 11, 257, 0.1, '2022-05-09 20:01:48'),
(31, 'financierterritorial.fr', 11, 365, 0.1, '2022-05-09 20:01:48'),
(31, 'cairn.info', 11, 314, 0.1, '2022-05-09 20:01:48'),
(31, 'creer-gerer-entreprendre.fr', 11, 337, 0.1, '2022-05-09 20:01:48'),
(31, 'wiki-compta.com', 11, 457, 0.1, '2022-05-09 20:01:48'),
(31, 'indeed.com', 11, 65, 1.1, '2022-05-09 20:01:48'),
(31, 'lacompta.org', 11, 395, 0.1, '2022-05-09 20:01:48'),
(31, 'lagazettedescommunes.com', 11, 396, 0.1, '2022-05-09 20:01:48'),
(31, 'cost-house.com', 11, 335, 0.1, '2022-05-09 20:01:48'),
(31, 'amazon.fr', 11, 198, 0.2, '2022-05-09 20:01:48'),
(31, 'persee.fr', 11, 426, 0.1, '2022-05-09 20:01:48'),
(31, 'valoxy.org', 11, 451, 0.1, '2022-05-09 20:01:48'),
(31, 'comptazine.fr', 11, 211, 0.2, '2022-05-09 20:01:48'),
(31, 'welinkaccountants.be', 11, 456, 0.1, '2022-05-09 20:01:48'),
(31, 'voluntae.fr', 11, 454, 0.1, '2022-05-09 20:01:48'),
(31, 'linguee.fr', 11, 232, 0.2, '2022-05-09 20:01:48'),
(31, 'e-conseil-assist-office-management.com', 11, 346, 0.1, '2022-05-09 20:01:48'),
(31, '8sens.com', 11, 247, 0.1, '2022-05-09 20:01:48'),
(31, 'societe.com', 11, 183, 0.4, '2022-05-09 20:01:48'),
(31, 'ginformatique.com', 11, 371, 0.1, '2022-05-09 20:01:48'),
(31, 'macompta.fr', 11, 66, 1.1, '2022-05-09 20:01:48'),
(31, 'interfor-formationcontinue.fr', 11, 384, 0.1, '2022-05-09 20:01:48'),
(31, 'rnu.tn', 11, 435, 0.1, '2022-05-09 20:01:48'),
(31, 'memsoft.fr', 11, 101, 0.8, '2022-05-09 20:01:48'),
(31, 'erp-abas.com', 11, 352, 0.1, '2022-05-09 20:01:48'),
(31, 'infoniqa.com', 11, 382, 0.1, '2022-05-09 20:01:48'),
(31, 'galaxy-conseil.fr', 11, 368, 0.1, '2022-05-09 20:01:48'),
(31, 'expert-comptable.net', 11, 358, 0.1, '2022-05-09 20:01:48'),
(31, 'naolink.fr', 11, 411, 0.1, '2022-05-09 20:01:48'),
(31, 'infopro-digital.com', 11, 383, 0.1, '2022-05-09 20:01:48'),
(31, 'orial.fr', 11, 14, 11.7, '2022-05-09 20:01:48'),
(31, 'soft-lyon.com', 11, 24, 6.6, '2022-05-09 20:01:48'),
(31, 'amarris-contact.fr', 11, 31, 5.3, '2022-05-09 20:01:48'),
(31, 'aliantis.net', 11, 35, 3.7, '2022-05-09 20:01:48'),
(31, 'ravouna-expertise.com', 11, 46, 2.7, '2022-05-09 20:01:48'),
(31, 'mtlc-conseil.fr', 11, 87, 1, '2022-05-09 20:01:48'),
(31, 'coover.fr', 11, 50, 2.2, '2022-05-09 20:01:48'),
(31, 'bdo.fr', 11, 60, 1.2, '2022-05-09 20:01:48'),
(31, 'lyon-expertise.fr', 11, 84, 1, '2022-05-09 20:01:48'),
(31, 'cabinet-roche.com', 11, 71, 1, '2022-05-09 20:01:48'),
(31, 'yacc.fr', 11, 96, 1, '2022-05-09 20:01:48'),
(31, 'ekylis.com', 11, 76, 1, '2022-05-09 20:01:48'),
(31, 'rhonealpesjob.com', 11, 56, 1.7, '2022-05-09 20:01:48'),
(31, 'starofservice.com', 11, 16, 9.6, '2022-05-09 20:01:48'),
(31, 'extencia.fr', 11, 54, 1.7, '2022-05-09 20:01:48'),
(31, 'odiceo.fr', 11, 131, 0.7, '2022-05-09 20:01:48'),
(31, 'erival-expert.com', 11, 111, 0.7, '2022-05-09 20:01:48'),
(31, 'jra.fr', 11, 122, 0.7, '2022-05-09 20:01:48'),
(31, 'experts-comptables-aura.fr', 11, 113, 0.7, '2022-05-09 20:01:48'),
(31, 'endrix.com', 11, 53, 1.7, '2022-05-09 20:01:48'),
(31, 'eurex.fr', 11, 97, 0.9, '2022-05-09 20:01:48'),
(31, 'totem-expertise.com', 11, 186, 0.4, '2022-05-09 20:01:48'),
(31, 'ecogef.fr', 11, 166, 0.4, '2022-05-09 20:01:48'),
(31, 'fidextra.fr', 11, 169, 0.4, '2022-05-09 20:01:48'),
(31, 'cabinetcogera.com', 11, 158, 0.4, '2022-05-09 20:01:48'),
(31, 'cogem-conseil.fr', 11, 163, 0.4, '2022-05-09 20:01:48'),
(31, 'bourdat.net', 11, 139, 0.6, '2022-05-09 20:01:48'),
(31, 'cacomptepourmoi.fr', 11, 20, 7.1, '2022-05-09 20:01:48'),
(31, 'sofragec.com', 11, 184, 0.4, '2022-05-09 20:01:48'),
(31, 'fga-expertise.fr', 11, 145, 0.6, '2022-05-09 20:01:48'),
(31, 'rsm.global', 11, 149, 0.5, '2022-05-09 20:01:48'),
(31, 'expert-comptable-dehan.fr', 11, 222, 0.2, '2022-05-09 20:01:48'),
(31, 'cessentiel.fr', 11, 207, 0.2, '2022-05-09 20:01:48'),
(31, 'exaur.fr', 11, 221, 0.2, '2022-05-09 20:01:48'),
(31, 'we-experts.com', 11, 242, 0.2, '2022-05-09 20:01:48'),
(31, 'edigestconseils.fr', 11, 216, 0.2, '2022-05-09 20:01:48'),
(31, 'cabinet-impulse.fr', 11, 202, 0.2, '2022-05-09 20:01:48'),
(31, 'jm-audit-expertise.com', 11, 390, 0.1, '2022-05-09 20:01:48'),
(31, 'engde.fr', 11, 351, 0.1, '2022-05-09 20:01:48'),
(31, 'cabinetactual.fr', 11, 302, 0.1, '2022-05-09 20:01:48'),
(31, 'perfexa.fr', 11, 425, 0.1, '2022-05-09 20:01:48'),
(31, 'adeki.fr', 11, 255, 0.1, '2022-05-09 20:01:48'),
(31, 'adco-experts.fr', 11, 254, 0.1, '2022-05-09 20:01:48'),
(31, 'mtjconseil.fr', 11, 409, 0.1, '2022-05-09 20:01:48'),
(31, 'cogeparc.fr', 11, 326, 0.1, '2022-05-09 20:01:48'),
(31, 'cabinet-rs.com', 11, 298, 0.1, '2022-05-09 20:01:48'),
(31, 'ngpexpertisecomptable.fr', 11, 413, 0.1, '2022-05-09 20:01:48'),
(31, 'vertycal.fr', 11, 452, 0.1, '2022-05-09 20:01:48'),
(31, 'ixia-conseil.fr', 11, 386, 0.1, '2022-05-09 20:01:48'),
(31, 'cabinet-benayoun.fr', 11, 288, 0.1, '2022-05-09 20:01:48'),
(31, 'cplusensemble.fr', 11, 336, 0.1, '2022-05-09 20:01:48'),
(31, 'welinkaccountants.fr', 11, 243, 0.2, '2022-05-09 20:01:48'),
(31, 'exxactitude.com', 11, 189, 0.3, '2022-05-09 20:01:48'),
(31, 'andrevincent-gestion.com', 11, 266, 0.1, '2022-05-09 20:01:48'),
(31, 'avancia.fr', 11, 276, 0.1, '2022-05-09 20:01:48'),
(31, 'easycompta.eu', 11, 347, 0.1, '2022-05-09 20:01:48'),
(31, 'quovive.fr', 11, 432, 0.1, '2022-05-09 20:01:48'),
(31, 'inelys.fr', 11, 381, 0.1, '2022-05-09 20:01:48'),
(31, 'cabinet-atlantis.fr', 11, 287, 0.1, '2022-05-09 20:01:48'),
(31, 'cabinet-sce.fr', 11, 301, 0.1, '2022-05-09 20:01:48'),
(31, 'centre-affaires-lyonnais.fr', 11, 320, 0.1, '2022-05-09 20:01:48'),
(31, 'groupealtitude.expert', 11, 374, 0.1, '2022-05-09 20:01:48'),
(31, 'trigone-expertise.fr', 11, 449, 0.1, '2022-05-09 20:01:48'),
(31, 'bbkm.fr', 11, 279, 0.1, '2022-05-09 20:01:48'),
(31, 'pyramide-conseils.fr', 11, 430, 0.1, '2022-05-09 20:01:48'),
(31, 'mappy.com', 11, 233, 0.2, '2022-05-09 20:01:48'),
(31, 'pole-emploi.fr', 11, 236, 0.2, '2022-05-09 20:01:48'),
(31, 'sofagec.fr', 11, 441, 0.1, '2022-05-09 20:01:48'),
(31, 'cabinetplanche.com', 11, 310, 0.1, '2022-05-09 20:01:48'),
(31, 'cabinet-rosenbach.fr', 11, 297, 0.1, '2022-05-09 20:01:48'),
(31, 'boreletassocies.com', 11, 283, 0.1, '2022-05-09 20:01:48'),
(31, 'arthaud-associes.fr', 11, 271, 0.1, '2022-05-09 20:01:48'),
(31, 'comexa.fr', 11, 328, 0.1, '2022-05-09 20:01:48'),
(31, 'agecov.com', 11, 262, 0.1, '2022-05-09 20:01:48'),
(31, 'lfexperts.fr', 11, 400, 0.1, '2022-05-09 20:01:48'),
(31, 'caelis.fr', 11, 313, 0.1, '2022-05-09 20:01:48'),
(31, 'onlycompta.fr', 11, 415, 0.1, '2022-05-09 20:01:48'),
(31, 'finotassocies.fr', 11, 366, 0.1, '2022-05-09 20:01:48'),
(31, 'expertcomptable-lyon.com', 11, 359, 0.1, '2022-05-09 20:01:48'),
(31, 'goodmorningbusiness.fr', 11, 372, 0.1, '2022-05-09 20:01:48'),
(31, 'meteojob.com', 11, 234, 0.2, '2022-05-09 20:01:48'),
(31, 'archipel-lyon.fr', 11, 270, 0.1, '2022-05-09 20:01:48'),
(31, 'ar2t-expertise-comptable.fr', 11, 269, 0.1, '2022-05-09 20:01:48'),
(31, 'cabinet-comptable-gaspari.fr', 11, 291, 0.1, '2022-05-09 20:01:48'),
(31, 'igcafrance.com', 11, 13, 11.7, '2022-05-09 20:01:48'),
(31, 'nextcompta.com', 11, 29, 5.9, '2022-05-09 20:01:48'),
(31, 'cabinet-icard.com', 11, 33, 4.6, '2022-05-09 20:01:48'),
(31, 'cpecf.com', 11, 43, 2.7, '2022-05-09 20:01:48'),
(31, 'experts-comptables-paca.fr', 11, 44, 2.7, '2022-05-09 20:01:48'),
(31, 'ama-expertise.fr', 11, 51, 2, '2022-05-09 20:01:48'),
(31, 'silex-compta.fr', 11, 94, 1, '2022-05-09 20:01:48'),
(31, 'moulierac.com', 11, 86, 1, '2022-05-09 20:01:48'),
(31, 'ola-compta.com', 11, 90, 1, '2022-05-09 20:01:48'),
(31, 'cabexsud.com', 11, 69, 1, '2022-05-09 20:01:48'),
(31, 'brad-ju-expertise-comptable.com', 11, 68, 1, '2022-05-09 20:01:48'),
(31, 'medicis.expert', 11, 127, 0.7, '2022-05-09 20:01:48'),
(31, 'cabinet-c2a.fr', 11, 106, 0.7, '2022-05-09 20:01:48'),
(31, 'novalliance.fr', 11, 130, 0.7, '2022-05-09 20:01:48'),
(31, 'cabinet-cec.fr', 11, 107, 0.7, '2022-05-09 20:01:48'),
(31, 'somara.fr', 11, 135, 0.7, '2022-05-09 20:01:48'),
(31, 'hbketassocies.fr', 11, 119, 0.7, '2022-05-09 20:01:48'),
(31, 'monexpertisecomptable.fr', 11, 129, 0.7, '2022-05-09 20:01:48'),
(31, 'jmaconseils.fr', 11, 121, 0.7, '2022-05-09 20:01:48'),
(31, 'e2aexpert.fr', 11, 165, 0.4, '2022-05-09 20:01:48'),
(31, 'alticaconseil.com', 11, 151, 0.4, '2022-05-09 20:01:48'),
(31, 'igcafrance-sante.fr', 11, 172, 0.4, '2022-05-09 20:01:48'),
(31, 'cabinet-mamain.fr', 11, 157, 0.4, '2022-05-09 20:01:48'),
(31, 'lore-expert.com', 11, 176, 0.4, '2022-05-09 20:01:48'),
(31, 'cabinetmillan.com', 11, 159, 0.4, '2022-05-09 20:01:48'),
(31, 'expert-comptable-saudec.fr', 11, 167, 0.4, '2022-05-09 20:01:48'),
(31, 'cabinet-manace.fr', 11, 140, 0.6, '2022-05-09 20:01:48'),
(31, 'expertscomptables.org', 11, 144, 0.6, '2022-05-09 20:01:48'),
(31, 'cabinet-pariente.fr', 11, 203, 0.2, '2022-05-09 20:01:48'),
(31, 'e2m-conseils.fr', 11, 215, 0.2, '2022-05-09 20:01:48'),
(31, 'kalpac.fr', 11, 230, 0.2, '2022-05-09 20:01:48'),
(31, 'bp-associes.fr', 11, 201, 0.2, '2022-05-09 20:01:48'),
(31, 'expertisecomptableduprado.fr', 11, 224, 0.2, '2022-05-09 20:01:48'),
(31, 'cophotri.fr', 11, 212, 0.2, '2022-05-09 20:01:48'),
(31, 'bbr-conseils.com', 11, 280, 0.1, '2022-05-09 20:01:48'),
(31, 'cabinetamce.com', 11, 304, 0.1, '2022-05-09 20:01:48'),
(31, 'al2sconseils.com', 11, 263, 0.1, '2022-05-09 20:01:48'),
(31, 'ollivier-associes.com', 11, 414, 0.1, '2022-05-09 20:01:48'),
(31, 'c2c-conseils.com', 11, 284, 0.1, '2022-05-09 20:01:48'),
(31, 'jpl-compta.fr', 11, 391, 0.1, '2022-05-09 20:01:48'),
(31, 'maexpertise.com', 11, 405, 0.1, '2022-05-09 20:01:48'),
(31, 'mc2-expertise.com', 11, 407, 0.1, '2022-05-09 20:01:48'),
(31, 'cabinet-comptable-cofimec.fr', 11, 290, 0.1, '2022-05-09 20:01:48'),
(31, 'cogep.fr', 11, 325, 0.1, '2022-05-09 20:01:48'),
(31, 'home.kpmg', 11, 377, 0.1, '2022-05-09 20:01:48'),
(31, 'cabinetagefec.fr', 11, 303, 0.1, '2022-05-09 20:01:48'),
(31, 'pytheasconseil.fr', 11, 431, 0.1, '2022-05-09 20:01:48'),
(31, 'cabinet-saueco.fr', 11, 300, 0.1, '2022-05-09 20:01:48'),
(31, 'k2experts.fr', 11, 393, 0.1, '2022-05-09 20:01:48'),
(31, 'via-audit.com', 11, 453, 0.1, '2022-05-09 20:01:48'),
(31, 'newgenexpert.com', 11, 412, 0.1, '2022-05-09 20:01:48'),
(31, 'cabinet-clv.fr', 11, 289, 0.1, '2022-05-09 20:01:48'),
(31, 'afc-expertise-comptable.fr', 11, 258, 0.1, '2022-05-09 20:01:48'),
(31, 'cabinet-mosselmans.com', 11, 296, 0.1, '2022-05-09 20:01:48'),
(31, 'ma-compta-connectee.fr', 11, 403, 0.1, '2022-05-09 20:01:48'),
(31, 'demarchesadministratives.fr', 11, 342, 0.1, '2022-05-09 20:01:48'),
(31, 'compteo.fr', 11, 333, 0.1, '2022-05-09 20:01:48'),
(31, 'optimexpert.fr', 11, 417, 0.1, '2022-05-09 20:01:48'),
(31, 'cabinetgica.com', 11, 308, 0.1, '2022-05-09 20:01:48'),
(31, 'sofitec.org', 11, 443, 0.1, '2022-05-09 20:01:48'),
(31, 'abcgestion13.fr', 11, 249, 0.1, '2022-05-09 20:01:48'),
(31, 'jaffe.eu', 11, 387, 0.1, '2022-05-09 20:01:48'),
(31, 'expertscomptactes.fr', 11, 362, 0.1, '2022-05-09 20:01:48'),
(31, 'avenircompta-mediterranee.com', 11, 277, 0.1, '2022-05-09 20:01:48'),
(31, 'crpexperts.fr', 11, 339, 0.1, '2022-05-09 20:01:48'),
(31, 'sicaudit.info', 11, 439, 0.1, '2022-05-09 20:01:48'),
(31, 'audice-expertise-comptable.fr', 11, 272, 0.1, '2022-05-09 20:01:48'),
(31, 'facebook.com', 11, 225, 0.2, '2022-05-09 20:01:48'),
(31, 'cabinetfeurgard.com', 11, 307, 0.1, '2022-05-09 20:01:48'),
(31, 'ansemble.fr', 11, 267, 0.1, '2022-05-09 20:01:48'),
(31, '118000.fr', 11, 245, 0.1, '2022-05-09 20:01:48'),
(31, 'cabinet-arditti.fr', 11, 286, 0.1, '2022-05-09 20:01:48'),
(31, 'cabinet-fico.fr', 11, 28, 5.9, '2022-05-09 20:01:48'),
(31, 'fintek.fr', 11, 36, 3.7, '2022-05-09 20:01:48'),
(31, 'bmfiduciaire.fr', 11, 42, 2.7, '2022-05-09 20:01:48'),
(31, 'lafabriquedunet.fr', 11, 55, 1.7, '2022-05-09 20:01:48'),
(31, 'ngp-expertise.com', 11, 89, 1, '2022-05-09 20:01:48'),
(31, 'cba-france.com', 11, 72, 1, '2022-05-09 20:01:48'),
(31, 'expertise-bismuth.com', 11, 78, 1, '2022-05-09 20:01:48'),
(31, 'fathi-saidi.com', 11, 79, 1, '2022-05-09 20:01:48'),
(31, 'cabinetbleu.fr', 11, 108, 0.7, '2022-05-09 20:01:48'),
(31, 'keycost.fr', 11, 123, 0.7, '2022-05-09 20:01:48'),
(31, 'vz-sas.fr', 11, 137, 0.7, '2022-05-09 20:01:48'),
(31, 'figitalexpertise.fr', 11, 114, 0.7, '2022-05-09 20:01:48'),
(31, 'groupe-sacor.fr', 11, 117, 0.7, '2022-05-09 20:01:48'),
(31, 'wipea.fr', 11, 138, 0.7, '2022-05-09 20:01:48'),
(31, 'franceexpertise.com', 11, 170, 0.4, '2022-05-09 20:01:48'),
(31, 'ab-compta.com', 11, 150, 0.4, '2022-05-09 20:01:48'),
(31, 'catea.fr', 11, 160, 0.4, '2022-05-09 20:01:48'),
(31, 'axcio.fr', 11, 152, 0.4, '2022-05-09 20:01:48'),
(31, 'openconseil.com', 11, 180, 0.4, '2022-05-09 20:01:48'),
(31, 'cabinet-belayachi.fr', 11, 156, 0.4, '2022-05-09 20:01:48'),
(31, 'baconhobbes.com', 11, 154, 0.4, '2022-05-09 20:01:48'),
(31, 'ocean-expertscomptables.com', 11, 178, 0.4, '2022-05-09 20:01:48'),
(31, 'agora-sea.fr', 11, 197, 0.2, '2022-05-09 20:01:48'),
(31, 'cabinetfevrier.fr', 11, 204, 0.2, '2022-05-09 20:01:48'),
(31, 'cba-experts.com', 11, 205, 0.2, '2022-05-09 20:01:48'),
(31, 'secab.com', 11, 240, 0.2, '2022-05-09 20:01:48'),
(31, 'exalysparis.com', 11, 220, 0.2, '2022-05-09 20:01:48'),
(31, 'axessconseil.com', 11, 153, 0.4, '2022-05-09 20:01:48'),
(31, 'independant.io', 11, 120, 0.7, '2022-05-09 20:01:48'),
(31, 'houdart-ac.fr', 11, 378, 0.1, '2022-05-09 20:01:48'),
(31, 'expertschoisy.com', 11, 361, 0.1, '2022-05-09 20:01:48'),
(31, 'gecorin.com', 11, 369, 0.1, '2022-05-09 20:01:48'),
(31, 'jexpertise.fr', 11, 389, 0.1, '2022-05-09 20:01:48'),
(31, 'paris-conseil-audit-expertises.fr', 11, 423, 0.1, '2022-05-09 20:01:48'),
(31, 'eiffelexperts.fr', 11, 350, 0.1, '2022-05-09 20:01:48'),
(31, 'cabinetbernard.fr', 11, 305, 0.1, '2022-05-09 20:01:48'),
(31, 'compexgestion.fr', 11, 329, 0.1, '2022-05-09 20:01:48'),
(31, 'chevaillier.fr', 11, 321, 0.1, '2022-05-09 20:01:48'),
(31, 'jbmexpert.fr', 11, 388, 0.1, '2022-05-09 20:01:48'),
(31, 'agcc-expert-comptable.fr', 11, 261, 0.1, '2022-05-09 20:01:48'),
(31, 'world-xpert.com', 11, 459, 0.1, '2022-05-09 20:01:48'),
(31, 'cocerto.fr', 11, 324, 0.1, '2022-05-09 20:01:48'),
(31, 'gae-expertcomptable.com', 11, 367, 0.1, '2022-05-09 20:01:48'),
(31, 'alvexpertise.com', 11, 264, 0.1, '2022-05-09 20:01:48'),
(31, 'dga-expert-comptable.com', 11, 344, 0.1, '2022-05-09 20:01:48'),
(31, 'optimaexperts.fr', 11, 416, 0.1, '2022-05-09 20:01:48'),
(31, 'audirexcommunication-comptabilite.com', 11, 273, 0.1, '2022-05-09 20:01:48'),
(31, 'cabinet-mecc.com', 11, 295, 0.1, '2022-05-09 20:01:48'),
(31, 'scet-expertisecomptable.fr', 11, 436, 0.1, '2022-05-09 20:01:48'),
(31, 'fiduciaire-yadan.fr', 11, 364, 0.1, '2022-05-09 20:01:48'),
(31, 'expert-comptable-startup.com', 11, 356, 0.1, '2022-05-09 20:01:48'),
(31, 'cba-expert-comptable.com', 11, 316, 0.1, '2022-05-09 20:01:48'),
(31, 'icaf.fr', 11, 380, 0.1, '2022-05-09 20:01:48'),
(31, 'sra-paris.com', 11, 444, 0.1, '2022-05-09 20:01:48'),
(31, 'partnersexpertise.fr', 11, 424, 0.1, '2022-05-09 20:01:48'),
(31, 'cabinet-safifm.com', 11, 299, 0.1, '2022-05-09 20:01:48'),
(31, 'i-expertcomptable.com', 11, 379, 0.1, '2022-05-09 20:01:48'),
(31, 'cabinet-comptable.com', 11, 292, 0.1, '2022-05-09 20:01:48'),
(31, 'expertcomptable-afci-sagec.fr', 11, 223, 0.2, '2022-05-09 20:01:48'),
(31, 'mvconseil.fr', 11, 410, 0.1, '2022-05-09 20:01:48'),
(31, 'av-consulting.fr', 11, 275, 0.1, '2022-05-09 20:01:48'),
(31, 'creerentreprise.fr', 11, 338, 0.1, '2022-05-09 20:01:48'),
(31, 'cogerec.fr', 11, 327, 0.1, '2022-05-09 20:01:48'),
(31, 'cabinet-execom.com', 11, 293, 0.1, '2022-05-09 20:01:48'),
(31, 'audit-experts.fr', 11, 274, 0.1, '2022-05-09 20:01:48'),
(31, 'afgexpertise.fr', 11, 260, 0.1, '2022-05-09 20:01:48'),
(31, 'sofigest.fr', 11, 442, 0.1, '2022-05-09 20:01:48'),
(31, 'appvizer.fr', 11, 26, 5.9, '2022-05-09 20:01:48'),
(31, 'maliassefiscale.fr', 11, 126, 0.7, '2022-05-09 20:01:48'),
(31, 'comptalib.com', 11, 75, 1, '2022-05-09 20:01:48'),
(31, 'runview.fr', 11, 93, 1, '2022-05-09 20:01:48'),
(31, 'netdeclaration.net', 11, 88, 1, '2022-05-09 20:01:48'),
(31, 'ciel.com', 11, 73, 1, '2022-05-09 20:01:48'),
(31, 'flf.fr', 11, 80, 1, '2022-05-09 20:01:48'),
(31, 'grouperf.com', 11, 118, 0.7, '2022-05-09 20:01:48'),
(31, 'debitoor.fr', 11, 110, 0.7, '2022-05-09 20:01:48'),
(31, 'livli.fr', 11, 125, 0.7, '2022-05-09 20:01:48'),
(31, 'pole-autoentrepreneur.com', 11, 132, 0.7, '2022-05-09 20:01:48'),
(31, 'zefyr.net', 11, 188, 0.4, '2022-05-09 20:01:48'),
(31, 'soxia.com', 11, 136, 0.7, '2022-05-09 20:01:48'),
(31, 'jedeclaremonmeuble.com', 11, 173, 0.4, '2022-05-09 20:01:48'),
(31, 'libeo.io', 11, 175, 0.4, '2022-05-09 20:01:48'),
(31, 'leblogdudirigeant.com', 11, 174, 0.4, '2022-05-09 20:01:48'),
(31, 'bilanpositif.com', 11, 155, 0.4, '2022-05-09 20:01:48'),
(31, 'expert-comptable-tpe.fr', 11, 168, 0.4, '2022-05-09 20:01:48'),
(31, 'juritravail.com', 11, 229, 0.2, '2022-05-09 20:01:48'),
(31, 'ediservices.com', 11, 217, 0.2, '2022-05-09 20:01:48'),
(31, 'rubypayeur.com', 11, 239, 0.2, '2022-05-09 20:01:48'),
(31, 'soan-solutions.io', 11, 241, 0.2, '2022-05-09 20:01:48'),
(31, 'divalto.com', 11, 214, 0.2, '2022-05-09 20:01:48'),
(31, 'invoke-software.fr', 11, 385, 0.1, '2022-05-09 20:01:48'),
(31, 'wiktionary.org', 11, 458, 0.1, '2022-05-09 20:01:48'),
(31, 'adjuvamus.fr', 11, 256, 0.1, '2022-05-09 20:01:48'),
(31, 'cciformationpro.fr', 11, 318, 0.1, '2022-05-09 20:01:48'),
(31, 'easyteo.com', 11, 348, 0.1, '2022-05-09 20:01:48'),
(31, 'compte-pro.com', 11, 332, 0.1, '2022-05-09 20:01:48'),
(31, 'gestion-compta-paye.com', 11, 370, 0.1, '2022-05-09 20:01:48'),
(31, 'cnfce.com', 11, 323, 0.1, '2022-05-09 20:01:48'),
(31, 'teogest.com', 11, 447, 0.1, '2022-05-09 20:01:48'),
(31, 'holded.com', 11, 376, 0.1, '2022-05-09 20:01:48'),
(31, 'portail-autoentrepreneur.fr', 11, 428, 0.1, '2022-05-09 20:01:48'),
(31, 'bbs-gestion-compta.fr', 11, 281, 0.1, '2022-05-09 20:01:48'),
(31, 'cp-audit.com', 11, 213, 0.2, '2022-05-09 20:01:48'),
(31, 'calendrierfiscal.fr', 11, 315, 0.1, '2022-05-09 20:01:48'),
(31, 'revue-fiduciaire.com', 11, 434, 0.1, '2022-05-09 20:01:48'),
(31, 'loopsoftware.fr', 11, 402, 0.1, '2022-05-09 20:01:48'),
(31, 'comptable-en-ligne.fr', 11, 330, 0.1, '2022-05-09 20:01:48'),
(31, 'expert-comptable-en-ligne.fr', 11, 355, 0.1, '2022-05-09 20:01:48'),
(31, 'jurisconsulte.net', 11, 392, 0.1, '2022-05-09 20:01:48'),
(31, 'usinenouvelle.com', 11, 450, 0.1, '2022-05-09 20:01:48'),
(31, 'cabestan-formation.fr', 11, 285, 0.1, '2022-05-09 20:01:48'),
(31, 'apogea.fr', 11, 268, 0.1, '2022-05-09 20:01:48'),
(31, 'macomptabilite.com', 11, 404, 0.1, '2022-05-09 20:01:48'),
(31, 'marche-public.fr', 11, 406, 0.1, '2022-05-09 20:01:48'),
(31, 'etafi.fr', 11, 354, 0.1, '2022-05-09 20:01:48'),
(31, 'demos.fr', 11, 343, 0.1, '2022-05-09 20:01:48'),
(31, 'gymglish.com', 11, 375, 0.1, '2022-05-09 20:01:48'),
(31, 'abcliv.fr', 11, 250, 0.1, '2022-05-09 20:01:48'),
(31, 'decision-achats.fr', 11, 340, 0.1, '2022-05-09 20:01:48'),
(31, 'ccicampus.fr', 11, 317, 0.1, '2022-05-09 20:01:48'),
(31, 'reverso.net', 11, 433, 0.1, '2022-05-09 20:01:48'),
(31, 'shine.fr', 11, 438, 0.1, '2022-05-09 20:01:48'),
(31, 'ceeccara.org', 11, 319, 0.1, '2022-05-09 20:01:48'),
(31, 'promeo-formation.fr', 11, 429, 0.1, '2022-05-09 20:01:48'),
(31, 'actionfirst.fr', 11, 252, 0.1, '2022-05-09 20:01:48');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
