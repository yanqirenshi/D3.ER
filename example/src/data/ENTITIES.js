const ENTITIES = {
    "TABLES": [
        {
            "_id": 3,
            "code": "TABLE-B",
            "name": "Table B",
            "description": "",
            "_class": "TABLE",
            "position": {
                "x": 3789,
                "y": 50,
                "z": 0
            },
            "x": 300,
            "y": 0,
            "z": 0,
            "size": {
                "w": 222,
                "h": 333
            },
            "w": 222,
            "h": 333
        },
        {
            "_id": 2,
            "code": "TABLE-A",
            "name": "Table A",
            "description": "",
            "_class": "TABLE",
            "position": {
                "x": 1627,
                "y": 450,
                "z": 0
            },
            "x": -300,
            "y": 0,
            "z": 0,
            "size": {
                "w": 222,
                "h": 333
            },
            "w": 222,
            "h": 333
        }
    ],
    "COLUMNS": [
        {
            "_id": 9,
            "code": "TABLE-B-ATTR2",
            "name": "Table B Attr2",
            "data_type": "STRING",
            "_class": "COLUMN"
        },
        {
            "_id": 8,
            "code": "TABLE-B-ATTR1",
            "name": "Table B Attr1",
            "data_type": "STRING",
            "_class": "COLUMN"
        },
        {
            "_id": 7,
            "code": "TABLE-A-ATTR2",
            "name": "Table A Attr2",
            "data_type": "STRING",
            "_class": "COLUMN"
        },
        {
            "_id": 6,
            "code": "TABLE-A-ATTR1",
            "name": "Table B Attr1",
            "data_type": "STRING",
            "_class": "COLUMN"
        },
        {
            "_id": 5,
            "code": "TABLE-B-ID",
            "name": "Table B ID",
            "data_type": "INTEGER",
            "_class": "COLUMN"
        },
        {
            "_id": 4,
            "code": "TABLE-A-ID",
            "name": "Table A ID",
            "data_type": "INTEGER",
            "_class": "COLUMN"
        }
    ],
    "COLUMN_INSTANCES": [
        {
            "_id": 28,
            "code": "TABLE-A-ID",
            "physical_name": "",
            "logical_name": "Table A ID",
            "data_type": "INTEGER",
            "column_type": "IDENTIFIER",
            "description": "",
            "_class": "COLUMN-INSTANCE"
        },
        {
            "_id": 15,
            "code": "TABLE-B-ATTR2",
            "physical_name": "",
            "logical_name": "Table B Attr2",
            "data_type": "STRING",
            "column_type": "ATTRIBUTE",
            "description": "",
            "_class": "COLUMN-INSTANCE"
        },
        {
            "_id": 14,
            "code": "TABLE-B-ATTR1",
            "physical_name": "",
            "logical_name": "Table B Attr1",
            "data_type": "STRING",
            "column_type": "ATTRIBUTE",
            "description": "",
            "_class": "COLUMN-INSTANCE"
        },
        {
            "_id": 13,
            "code": "TABLE-B-ID",
            "physical_name": "",
            "logical_name": "Table B ID",
            "data_type": "INTEGER",
            "column_type": "IDENTIFIER",
            "description": "",
            "_class": "COLUMN-INSTANCE"
        },
        {
            "_id": 12,
            "code": "TABLE-A-ATTR2",
            "physical_name": "",
            "logical_name": "Table A Attr2",
            "data_type": "STRING",
            "column_type": "ATTRIBUTE",
            "description": "",
            "_class": "COLUMN-INSTANCE"
        },
        {
            "_id": 11,
            "code": "TABLE-A-ATTR1",
            "physical_name": "",
            "logical_name": "Table A Attr1",
            "data_type": "STRING",
            "column_type": "ATTRIBUTE",
            "description": "",
            "_class": "COLUMN-INSTANCE"
        },
        {
            "_id": 10,
            "code": "TABLE-A-ID",
            "physical_name": "",
            "logical_name": "Table A ID",
            "data_type": "INTEGER",
            "column_type": "IDENTIFIER",
            "description": "",
            "_class": "COLUMN-INSTANCE"
        }
    ],
    "RELASHONSHIPS": [
        {
            "_id": 34,
            "from-id": 30,
            "from-class": "PORT-ER-OUT",
            "to-id": 32,
            "to-class": "PORT-ER-IN",
            "data_type": "FK",
            "hide": false,
            "_class": "EDGE-ER"
        },
        {
            "_id": 33,
            "from-id": 28,
            "from-class": "COLUMN-INSTANCE",
            "to-id": 32,
            "to-class": "PORT-ER-IN",
            "data_type": "HAVE",
            "hide": false,
            "_class": "EDGE-ER"
        },
        {
            "_id": 31,
            "from-id": 10,
            "from-class": "COLUMN-INSTANCE",
            "to-id": 30,
            "to-class": "PORT-ER-OUT",
            "data_type": "HAVE",
            "hide": false,
            "_class": "EDGE-ER"
        },
        {
            "_id": 29,
            "from-id": 3,
            "from-class": "TABLE",
            "to-id": 28,
            "to-class": "COLUMN-INSTANCE",
            "data_type": "HAVE",
            "hide": false,
            "_class": "EDGE-ER"
        },
        {
            "_id": 27,
            "from-id": 3,
            "from-class": "TABLE",
            "to-id": 15,
            "to-class": "COLUMN-INSTANCE",
            "data_type": "HAVE",
            "hide": false,
            "_class": "EDGE-ER"
        },
        {
            "_id": 26,
            "from-id": 3,
            "from-class": "TABLE",
            "to-id": 14,
            "to-class": "COLUMN-INSTANCE",
            "data_type": "HAVE",
            "hide": false,
            "_class": "EDGE-ER"
        },
        {
            "_id": 25,
            "from-id": 3,
            "from-class": "TABLE",
            "to-id": 13,
            "to-class": "COLUMN-INSTANCE",
            "data_type": "HAVE",
            "hide": false,
            "_class": "EDGE-ER"
        },
        {
            "_id": 24,
            "from-id": 2,
            "from-class": "TABLE",
            "to-id": 12,
            "to-class": "COLUMN-INSTANCE",
            "data_type": "HAVE",
            "hide": false,
            "_class": "EDGE-ER"
        },
        {
            "_id": 23,
            "from-id": 2,
            "from-class": "TABLE",
            "to-id": 11,
            "to-class": "COLUMN-INSTANCE",
            "data_type": "HAVE",
            "hide": false,
            "_class": "EDGE-ER"
        },
        {
            "_id": 22,
            "from-id": 2,
            "from-class": "TABLE",
            "to-id": 10,
            "to-class": "COLUMN-INSTANCE",
            "data_type": "HAVE",
            "hide": false,
            "_class": "EDGE-ER"
        },
        {
            "_id": 21,
            "from-id": 9,
            "from-class": "COLUMN",
            "to-id": 15,
            "to-class": "COLUMN-INSTANCE",
            "data_type": "INSTANCE-OF",
            "hide": false,
            "_class": "EDGE-ER"
        },
        {
            "_id": 20,
            "from-id": 8,
            "from-class": "COLUMN",
            "to-id": 14,
            "to-class": "COLUMN-INSTANCE",
            "data_type": "INSTANCE-OF",
            "hide": false,
            "_class": "EDGE-ER"
        },
        {
            "_id": 19,
            "from-id": 5,
            "from-class": "COLUMN",
            "to-id": 13,
            "to-class": "COLUMN-INSTANCE",
            "data_type": "INSTANCE-OF",
            "hide": false,
            "_class": "EDGE-ER"
        },
        {
            "_id": 18,
            "from-id": 7,
            "from-class": "COLUMN",
            "to-id": 12,
            "to-class": "COLUMN-INSTANCE",
            "data_type": "INSTANCE-OF",
            "hide": false,
            "_class": "EDGE-ER"
        },
        {
            "_id": 17,
            "from-id": 6,
            "from-class": "COLUMN",
            "to-id": 11,
            "to-class": "COLUMN-INSTANCE",
            "data_type": "INSTANCE-OF",
            "hide": false,
            "_class": "EDGE-ER"
        },
        {
            "_id": 16,
            "from-id": 4,
            "from-class": "COLUMN",
            "to-id": 10,
            "to-class": "COLUMN-INSTANCE",
            "data_type": "INSTANCE-OF",
            "hide": false,
            "_class": "EDGE-ER"
        }
    ],
    "PORTS": [
        {
            "_id": 32,
            "degree": 0,
            "_class": "PORT-ER-IN"
        },
        {
            "_id": 30,
            "degree": 0,
            "_class": "PORT-ER-OUT"
        }
    ]
};

export default ENTITIES;
