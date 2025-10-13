CREATE TABLE `dtl_relationship` (
  `relationship_id` int NOT NULL,
  `attributer_id_from` int NOT NULL,
  `attributer_id_to` int NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
