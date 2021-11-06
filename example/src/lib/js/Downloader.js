import moment from 'moment';

export default class Downloader {
    stateER2Json (state) {
        let out = {};

        out.tables  = state.tables.list.map((obj) => {
            let new_data = Object.assign({}, obj);

            delete new_data._column_instances;
            delete new_data._edges;
            delete new_data._ports;

            return new_data;
        });
        out.columns = state.columns.list.slice();
        out.cameras = state.cameras.slice();
        out.column_instances = state.column_instances.list.map((obj) => {
            let new_data = Object.assign({}, obj);

            delete new_data._table;

            return new_data;
        });

        out.ports = state.ports.list.map((obj) => {
            let new_data = Object.assign({}, obj);

            delete new_data._column_instance;

            return new_data;
        });

        out.relashonships = state.relashonships.list.map((obj) => {
            let new_data = Object.assign({}, obj);

            delete new_data._port_from;
            delete new_data._port_to;

            return new_data;
        });

        out.edges = state.edges.list.map((obj) => {
            let new_data = Object.assign({}, obj);

            delete new_data._port_from;
            delete new_data._port_to;

            return new_data;
        });

        return JSON.stringify(out, null, 3);
    }
    downloadJson (name, json) {
        var blob = new Blob([ json ], {type : 'application/json'});

        var a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.target = '_blank';
        a.download = name + '.' + moment().format('YYYYMMDDHHmmssZZ') + '.json';
        a.click();

    }
}
