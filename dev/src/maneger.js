class Maneger {
    async fetchGraphData (cb) {
        const urls = [
            'http://127.0.0.1:55555/schemas',
            'http://127.0.0.1:55555/columns',
            'http://127.0.0.1:55555/entities',
            'http://127.0.0.1:55555/attributes',
            'http://127.0.0.1:55555/edges',
            'http://127.0.0.1:55555/relationships',
            'http://127.0.0.1:55555/relationship-details',
        ];

        const x = await Promise.all(urls.map(url => fetch(url).then(res => res.json())))
              .then(([_schemas, _columns, _entities, _attributes, _edges, _relationships, relationship_details]) => {
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
                  const {ports, edges} = this.data2portsAndEdges(_relationships, relationship_details);

                  const x = [..._edges, ...edges].map((d,i)=> {d._id=i; return d;});

                  return {
                      COLUMNS: columns,
                      COLUMN_INSTANCES: column_instances,
                      RELASHONSHIPS: x,
                      PORTS: ports,
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

            return {
                _id: d.attributer_id,
                _class: 'COLUMN_INSTANCE',
                code: d.attributer_id,
                physical_name: d.name_physical || item.name_physical,
                logical_name: d.name_logical || item.name_logical,
                data_type: item.data_type,
                column_type: 'ATTRIBUTE', // 'IDENTIFIER'
                description: d.description,
                order: d.order,
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
    data2portsAndEdges (relationships, relationship_details) {
        const items = relationship_details.reduce((ht, item)=> {
            if (!ht[item.relationship_id])
                ht[item.relationship_id] = item;
            return ht;
        }, {});

        return relationships.reduce((ht, r)=> {
            const item = items[r.relationship_id];

            const port_id_out = r.relationship_id + '-' + r.entity_id_from;
            const port_id_in  = r.relationship_id + '-' + r.entity_id_to;

            ht.edges.push({
                from_id: item.attributer_id_from,
                from_class: 'COLUMN-INSTANCE',
                to_id: port_id_in,
                to_class: 'PORT-ER-IN',
                data_type: 'HAVE',
                hide: false
            });
            ht.edges.push({
                from_id: item.attributer_id_to,
                from_class: 'COLUMN-INSTANCE',
                to_id: port_id_out,
                to_class: 'PORT-ER-OUT',
                data_type: 'HAVE',
                hide: false
            });
            ht.edges.push({
                from_id: port_id_out,
                from_class: 'PORT-ER-OUT',
                to_id: port_id_in,
                to_class: 'PORT-ER-IN',
                data_type: 'FK',
                hide: false
            });

            ht.ports.push({
                _id: port_id_out,
                _class: 'PORT-ER-OUT',
                degree: r.degree_from,
                cardinality: r.cardinality_from,
                optionality: r.optionality_from,
            });

            ht.ports.push({
                _id: port_id_in,
                _class: 'PORT-ER-IN',
                degree: r.degree_to,
                cardinality: r.cardinality_to,
                optionality: r.optionality_to,
            });

            return ht;
        }, { ports: [], edges: []});
    }
}

const maneger = new Maneger();

export default maneger;
