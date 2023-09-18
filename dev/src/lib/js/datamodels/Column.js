export default class Column {
    constructor(param) {
        this._padding = param.padding ? param.padding : 0;
        this._values  = param.values;
    }
    /**
     * @scope protected
     * */
    columnsWidth (d) {
        let padding = this._padding;
        return d.w - padding * 2;
    }
    /**
     * @scope protected
     * */
    columnHeight () {
        return 22;
    }
    /**
     * @scope protected
     * */
    columnsContentsHeight (d) {
        let column_height = this.columnHeight();
        let column_len = d._column_instances.length;
        let contents_h = column_height * ((column_len === 0) ? 1 : column_len);
        // let padding = this._padding;

        return contents_h;
    }
    /**
     * TODO: どこで使っている？
     * @scope ??
     * */
    columnsHeight (d) {
        let padding_top = 3;
        let padding_bottm = this._padding;
        return this.columnsContentsHeight(d) + padding_top + padding_bottm;
    }
}
