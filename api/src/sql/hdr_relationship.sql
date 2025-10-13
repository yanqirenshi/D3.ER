CREATE TABLE `hdr_relationship` (
  `relationship_id` int NOT NULL AUTO_INCREMENT,
  `entity_id_from` int NOT NULL,
  `entity_id_to` int NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT '?',
  `degree_from` double NOT NULL DEFAULT '0',
  `cardinality_from` int NOT NULL DEFAULT '1',
  `optionality_from` int NOT NULL DEFAULT '1',
  `degree_to` double NOT NULL DEFAULT '0',
  `cardinality_to` int NOT NULL DEFAULT '1',
  `optionality_to` int NOT NULL DEFAULT '1',
  `description` text NOT NULL,
  PRIMARY KEY (`relationship_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
