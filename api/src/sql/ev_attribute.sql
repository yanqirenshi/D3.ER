CREATE TABLE `ev_attribute` (
  `attributer_id` int NOT NULL AUTO_INCREMENT,
  `entity_id` int NOT NULL,
  `column_id` int NOT NULL,
  `name_logical` varchar(255) DEFAULT NULL,
  `name_physical` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `order` int NOT NULL DEFAULT '0',
  `is_not_null` tinyint NOT NULL DEFAULT '0',
  `is_auto_increment` tinyint NOT NULL DEFAULT '0',
  `default_value` varchar(255) NOT NULL,
  PRIMARY KEY (`attributer_id`),
  KEY `column-attribute_idx` (`column_id`),
  KEY `entity-attribute_idx` (`entity_id`),
  CONSTRAINT `column-attribute` FOREIGN KEY (`column_id`) REFERENCES `rs_column` (`column_id`),
  CONSTRAINT `entity-attribute` FOREIGN KEY (`entity_id`) REFERENCES `rs_entity` (`entity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
