CREATE TABLE `ev_attribute` (
  `attributer_id` int NOT NULL AUTO_INCREMENT,
  `entity_id` int NOT NULL,
  `column_id` int NOT NULL,
  `name_logical` varchar(255) NOT NULL,
  `name_physical` varchar(255) NOT NULL DEFAULT '?',
  `description` text NOT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_not_null` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`attributer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
