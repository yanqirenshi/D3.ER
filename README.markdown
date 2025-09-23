# TM

```
         +---------------------------+      +----------------------------+
         | schema               | RS |      | column                | RS |
         |===========================|      |============================|
         | schema_id | name_logical  |      | column_id | name_logical   |
         |           | name_physical |      |           | name_physical  |
         |           | description   |      |           | value_type     |
         +---------------------------+      |           | value_length   |
                       |                    |           | description    |
                       1                    +----------------------------+
 +-----------------+   |                      |
 | schema     | RS |---+                      1
 |=================|   |                      |
 | schema_id |     |   |                      |
 | entity_id |     |   |                      |
 +-----------------+   3                      |       +-------------------------------+
                       |                      |       | attribute                | EV |---------+
         +---------------------------+        |       |===============================|         |
         | entity               | RS |-1------|---3---| attributer_id | name_logical  |         |
         |===========================|----+   `---3---| entity_id     | name_physical |         |
         | entity_id | name_logical  |    |           | column_id     | description   |         |
         |           | name_physical |    |           |               | order         |         |
         |           | description   |    |           |               | description   |         |
         |           | position_x    |    |           |               | is_not_null   |         |
         |           | position_y    |    |           +-------------------------------+         |
         |           | position_z    |    |                                                     |
         |           | size_w        |    |           +---------------------------+             |    +-------------------------------+
         |           | size_h        |    |           | index               | HDR |-1-----------|--3-| index items             | DTL |
         +---------------------------+    |           |===========================|             |    |===============================|
                                          |           | index_id  | index_type    |             |    | index_id        | description |
                                          +---------->| entity_id | name_logical  |             +--->| attributer_id   |             |
                                          |           |           | name_physical |             |    +-------------------------------+
                                          |           +---------------------------+             |
                                          |                                                     |      (port)
                                          |           +------------------------------------+    |    +-------------------------------+
                                          |           | relationship                 | HDR |-1-----3-| relationship items      | DTL |
                                          |           |====================================|    |    |===============================|
                                          |           | relationship_id | degree_from      |    |    | relationship_id | description |
                                          `------|----| entity_id_from  | cardinality_from |    `----| attributer_id   |             |
                                                  `---| entity_id_to    | optionality_from |         +-------------------------------+
                                                      |                 | degree_to        |
                                                      |                 | cardinality_to   |
                                                      |                 | optionality_to   |
                                                      |                 | description      |
                                                      +------------------------------------+
```
