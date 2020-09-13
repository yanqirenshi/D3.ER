export default class Pool {
    list2pool (list, builder) {
        let ht = {};

        if (builder) {
            for (let i in list) {
                let data = builder(list[i]);

                ht[data._id] = data;
            }
        } else {
            for (let i in list) {
                let data = list[i];

                ht[data._id] = data;
            }
        }

        return {ht: ht, list: list};
    }
    list2poolWithIndex (list) {
        let ht = {};
        let ht_from = {};
        let ht_to = {};

        for (var i in list) {
            let data = list[i];
            let _id = data._id;

            let from_id = data.from_id;
            let to_id = data.to_id;

            // _id
            ht[_id] = data;

            // from_id
            if (!ht_from[from_id])
                ht_from[from_id] = {};

            ht_from[from_id][to_id] = data;

            // to_id
            if (!ht_to[to_id])
                ht_to[to_id] = {};

            ht_to[to_id][from_id] = data;
        }

        return {
            ht: ht,
            list: list,
            from: ht_from,
            to: ht_to
        };
    }
}
