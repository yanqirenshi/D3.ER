CREATE TABLE `er`.`hdr_index` (
  `index_id` int NOT NULL AUTO_INCREMENT,
  `schema_id` int NOT NULL DEFAULT '0',
  `entity_id` int NOT NULL,
  `index_type` varchar(66) NOT NULL,
  `name_logical` varchar(255) NOT NULL,
  `name_physical` varchar(255) NOT NULL DEFAULT '?',
  PRIMARY KEY (`index_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
