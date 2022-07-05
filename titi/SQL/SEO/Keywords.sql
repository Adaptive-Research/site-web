
CREATE TABLE `Keywords` (
  `id` bigint NOT NULL,
  `iscurrent` int DEFAULT NULL,
  `Keywords` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `MinRun` bigint DEFAULT '0',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `Keywords`
--



INSERT INTO `Keywords` (`id`, `iscurrent`, `Keywords`, `MinRun`, `date`) VALUES
(1, 1, 'agence web\r', 5, '2019-07-16 15:07:55'),
(2, 1, 'agence webmarketing\r', 6, '2019-07-16 15:07:55'),
(3, 1, 'content marketing\r', 7, '2019-07-16 15:07:55'),
(4, 1, 'inbound marketing\r', 8, '2019-07-16 15:07:55'),
(5, 1, 'marketing de contenu\r', 9, '2019-07-16 15:07:55'),
(6, 1, 'outils de veille\r', 12, '2019-07-16 15:07:55'),
(7, 1, 'outils de veille concurrentielle\r', 13, '2019-07-16 15:07:55'),
(8, 1, 'outils SEO\r', 11, '2019-07-16 15:07:55'),
(9, 1, 'rédaction de contenu\r', 14, '2019-07-16 15:07:55'),
(10, 1, 'seo tools\r\n', 24, '2019-08-15 13:50:51'),
(11, 1, 'stratégie de content marketing\r', 15, '2019-07-16 15:07:55'),
(12, 1, 'Adaptive Research', 16, '2019-07-16 15:07:55'),
(13, 1, 'crm tools\r\n', 17, '2019-08-15 13:51:04'),
(14, 1, 'outils CRM\r', 10, '2019-07-19 06:12:23'),
(15, 1, 'customer relationship management', 23, '2019-08-15 13:51:25'),
(16, 0, 'landing page\r\n', 40, '2019-08-15 13:51:11'),
(17, 1, 'landing page efficace\r', 39, '2019-07-25 19:54:21'),
(18, 1, 'meilleures landing pages', 41, '2019-07-25 19:54:21'),
(19, 1, 'tunnel de vente\r', 60, '2019-07-31 18:12:56'),
(20, 1, 'parcours d\'achat', 59, '2019-07-31 18:16:38'),
(21, 1, 'parcours client', 61, '2019-08-03 03:32:16'),
(22, 1, 'lead nurturing', 62, '2019-08-03 16:37:01'),
(23, 1, 'buyer\'s journey', 63, '2019-08-03 16:39:31'),
(24, 1, 'référencement naturel\r\n', 65, '2019-08-03 17:06:57'),
(25, 1, 'référencement organique\r', 64, '2019-08-03 16:42:58'),
(26, 0, 'sea', 66, '2019-08-16 08:01:08'),
(27, 1, 'seo', 67, '2019-08-15 13:51:48'),
(28, 1, 'agence de rédaction éditoriale', 68, '2019-08-03 20:36:44'),
(29, 1, 'agence de rédaction de contenu\r', 69, '2019-08-03 20:38:47'),
(30, 1, 'agence de rédaction de contenu web', 70, '2019-08-03 20:38:47'),
(31, 1, 'rédaction de contenu web\r', 132, '2019-08-03 21:03:22'),
(32, 1, 'rédaction de contenu web tarif\r', 137, '2019-08-03 21:03:22'),
(33, 1, 'rédacteur web agence\r', 136, '2019-08-03 21:03:22'),
(34, 1, 'site de rédaction en français\r', 135, '2019-08-03 21:03:22'),
(35, 1, 'agence éditoriale\r', 134, '2019-08-03 21:03:22'),
(36, 1, 'rédaction de contenu définition\r', 133, '2019-08-03 21:03:22'),
(37, 1, 'société rédaction web\r', 131, '2019-08-03 21:03:22'),
(38, 1, 'rédaction web paris', 130, '2019-08-03 21:03:22'),
(39, 1, 'SSII\r', 91, '2019-08-06 20:04:47'),
(40, 1, 'ESN entreprise de service\r\n\r\n', 92, '2019-08-06 20:04:47'),
(41, 1, 'Entreprise de services du numérique', 93, '2019-08-06 20:04:47'),
(42, 1, 'SSII indépendants', 94, '2019-08-06 20:39:09'),
(43, 1, 'freelance', 95, '2019-08-06 20:41:29'),
(44, 1, 'SSII offre de mission pour indépendants', 128, '2019-08-07 06:16:18'),
(45, 1, 'mission freelance', 127, '2019-08-07 06:16:39'),
(46, 1, 'cabinet de conseil', 126, '2019-08-07 19:19:26'),
(47, 1, 'rédaction d\'articles pour le web', 129, '2019-08-07 19:20:53'),
(48, 1, 'content spinning\r', 138, '2019-08-08 19:36:04'),
(49, 1, 'génération automatique de texte \r', 140, '2019-08-08 19:36:04'),
(50, 1, 'paraphraseur de texte', 139, '2019-08-08 19:36:04'),
(51, 1, 'marketing automation', 146, '2019-08-10 22:03:19'),
(52, 1, 'agence marketing\r', 173, '2019-08-15 12:07:15'),
(53, 1, 'agence marketing digital\r', 177, '2019-08-15 12:07:15'),
(54, 1, 'agence marketing paris\r', 178, '2019-08-15 12:07:15'),
(55, 1, 'agence marketing digital paris\r', 176, '2019-08-15 12:07:15'),
(56, 1, 'agence de communication\r', 175, '2019-08-15 12:07:15'),
(57, 1, 'agence de communication paris', 174, '2019-08-15 12:07:15'),
(58, 1, 'stratégie digitale', 179, '2019-08-15 12:28:42'),
(59, 1, 'exemple landing page', 180, '2019-08-15 12:29:48'),
(60, 0, 'landing page exemple\r', 181, '2019-08-15 12:44:23'),
(61, 0, 'exemple de landing page\r', 182, '2019-08-15 12:44:06'),
(62, 1, 'landing page formulaire\r\n', 183, '2019-08-15 12:38:14'),
(63, 1, 'newsletter landing page\r', 184, '2019-08-15 12:32:39'),
(64, 1, 'landing page facebook\r\n', 186, '2019-08-15 12:38:52'),
(65, 1, 'créer une landing page facebook\r', 187, '2019-08-15 12:32:39'),
(66, 1, 'créer une landing page\r', 188, '2019-08-15 12:32:39'),
(67, 0, 'landing page c est quoi', 185, '2019-08-15 12:32:39'),
(68, 1, 'content marketing blog', 192, '2019-08-15 12:47:38'),
(69, 1, 'landing page qui convertit\r', 189, '2019-08-15 12:49:35'),
(70, 1, 'landing page conversion\r', 190, '2019-08-15 12:49:35'),
(71, 1, 'landing page taux de conversion', 191, '2019-08-15 12:49:35'),
(72, 1, 'email lead nurturing', 193, '2019-08-15 13:46:13'),
(73, 1, 'stratégie de lead nurturing', 194, '2019-08-15 13:47:32'),
(74, 1, 'lead nurturing B2B', 195, '2019-08-15 13:49:15'),
(75, 1, 'google ads\r', 196, '2019-08-15 13:56:24'),
(76, 1, 'google adwords\r', 200, '2019-08-15 13:56:24'),
(77, 1, 'adwords', 198, '2019-08-15 13:56:24'),
(78, 1, 'facebook ads', 199, '2019-08-15 13:56:31'),
(79, 1, 'générer des leads', 201, '2019-08-16 15:11:45'),
(80, 1, 'agence marketing automation', 202, '2019-08-16 15:12:21'),
(81, 1, 'trouver les bons mots clés', 203, '2019-08-16 15:13:53'),
(82, 1, 'augmenter son trafic', 204, '2019-08-16 15:14:30'),
(83, 1, 'augmenter le trafic d\'un site web', 205, '2019-08-16 15:14:50'),
(84, 1, 'augmenter le trafic naturel', 206, '2019-08-16 15:15:02'),
(85, 1, 'référencement payant', 207, '2019-08-16 15:15:12'),
(86, 1, 'marketing calculer un budget', 208, '2019-08-18 06:18:59'),
(87, 1, 'seo budget ', 209, '2019-08-18 06:19:55'),
(88, 1, 'seo calculer budget', 210, '2019-08-18 10:36:10'),
(89, 1, 'marketing qualified lead\r', 211, '2019-08-18 12:43:17'),
(90, 1, 'sales qualified lead', 212, '2019-08-18 12:43:17'),
(91, 1, 'questions à poser pour qualifier un lead', 213, '2019-08-18 13:08:55'),
(92, 1, 'seo coût', 215, '2019-08-19 08:47:29'),
(93, 1, 'augmenter ses ventes', 304, '2019-08-28 18:12:48'),
(94, 1, 'booster ses ventes', 305, '2019-08-28 18:13:04'),
(95, 1, 'efficacité commerciale', 306, '2019-08-28 21:28:07'),
(96, 1, 'expert comptable\r', 329, '2019-09-03 05:55:39'),
(97, 1, 'expert comptable paris\r', 332, '2019-09-03 05:55:39'),
(98, 1, 'expert comptable lyon\r', 330, '2019-09-03 05:55:39'),
(99, 1, 'expert comptable marseille\r\n', 331, '2019-09-03 05:55:39'),
(100, 1, 'comptabilité analytique\r', 326, '2019-09-03 05:55:39'),
(101, 1, 'liasse fiscale', 333, '2019-09-03 05:55:39'),
(102, 1, 'plateforme pour freelance', 548, '2019-09-22 09:31:03'),
(103, 1, 'cabinet de conseil à taille humaine', 545, '2019-09-28 13:29:49'),
(104, 1, 'plateforme pour indépendant', 549, '2019-09-28 13:30:09'),
(105, 1, 'référenceur\r', 82, '2022-04-15 08:51:10'),
(106, 1, 'référencement', 0, '2022-04-15 08:51:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Keywords`
--
ALTER TABLE `Keywords`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Keywords`
--
ALTER TABLE `Keywords`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
