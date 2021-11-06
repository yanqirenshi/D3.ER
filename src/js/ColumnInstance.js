import Pool from './Pool';

export default class ColumnInstance {
    constructor () {
        this.pool = new Pool();
    }
    /* **************************************************************** *
     *  Data manegement
     * **************************************************************** */
    build (list) {
        return new Pool().list2poolWithIndex(list);
    }
}
