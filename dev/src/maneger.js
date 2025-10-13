class Maneger {
    async fetchGraphData (cb) {
        const urls = [
            'http://127.0.0.1:55555/schemas',
            'http://127.0.0.1:55555/columns',
            'http://127.0.0.1:55555/entities',
            'http://127.0.0.1:55555/attributes',
            'http://127.0.0.1:55555/edges',
        ];

        const x = await Promise.all(urls.map(url => fetch(url).then(res => res.json())))
              .then(([_schemas, _columns, _entities, _attributes, _edges]) => {
                  const list2ht = (key, list)=> {
                      return list.reduce((ht, d)=> {
                          ht[d[key]] = d;
                          return ht;
                      }, {});
                  };

                  // const schemas = list2ht('schema_id',_schemas);
                  const columns = this.data2columns(_columns);
                  const column_instances = this.data2columnInstances(_attributes, columns);
                  const entities = this.data2entities(_entities);

                  return {
                      COLUMNS: columns,
                      COLUMN_INSTANCES: column_instances,
                      RELASHONSHIPS: _edges,
                      PORTS: [],
                      TABLES: entities,
                  };
              })
              .catch(error => {
                  console.error('Fetch error:', error);
              });

        cb(x);
    }
    list2ht (key, list) {
        return list.reduce((ht, d)=> {
            ht[d[key]] = d;
            return ht;
        }, {});
    };
    data2columns (data) {
        return data.map(d=> {
            return {
                _id: d.column_id,
                _class: 'COLUMN',
                code: d.column_id,
                name: d.name_physical || d.name_logical,
                name_physical: d.name_physical,
                name_logical: d.name_logical,
                data_type: d.value_type,
                _core: data,
            };
        });
    }
    data2columnInstances (data, columns) {
        const ht = this.list2ht('_id',columns);

        return data.map(d=> {
            const item = ht[d.column_id];
            console.log(item);
            return {
                _id: d.attributer_id,
                _class: 'COLUMN_INSTANCE',
                code: d.attributer_id,
                physical_name: d.name_physical || item.name_physical,
                logical_name: d.name_logical || item.name_logical,
                data_type: item.data_type,
                column_type: 'ATTRIBUTE', // 'IDENTIFIER'
                description: d.description,
                _core: d,
            };
        });
    }
    data2entities (data) {
        return data.map(d=> {
            return {
                _id: d.entity_id,
                _class: 'ENTITY',
                code: d.entity_id,
                name: d.name_logical || d.name_physical,
                description: d.description,
                position: { x: d.position_x, y: d.position_y, z: d.position_z },
                size: { w: d.size_w, h: d.size_h },
                x: d.position_x,
                y: d.position_y,
                z: d.position_z,
                w: d.size_w,
                h: d.size_h
            };
        });
    }
}

const maneger = new Maneger();

export default maneger;
