import Pool from '../Pool';
import Column from '../painters/Column.js';
import Port from '../painters/Port.js';

export default class Entity {
    constructor(options) {
        this.pool = new Pool();

        this._place = null;
        this._padding = 11;

        this._values    = {};
        this._callbacks = {};

        this._Column = null;

        this.port = new Port();

        if (options)
            this.init(options);
    }
    init (options) {
        this._place = options.place;

        this._values    = options.values;
        this._callbacks = options.callbacks;

        this.column = new Column({
            padding: this._padding,
            values:  this._values,
        });
    }
    /* **************************************************************** *
     *  util
     * **************************************************************** */
    getCallbak (keys_str) {
        if (!this._callbacks || !keys_str)
            return null;

        let keys = keys_str.split('.');
        let callbacks = this._callbacks;

        for (let key of keys) {
            let val = callbacks[key];
            if (typeof val == "function")
                return val;
            callbacks = val;
        }
        return null;
    }
    callCallbak (thisArg, keys_str) {
        let args_arr = Array.prototype.slice.call(arguments);
        let argsArray = args_arr.slice(2);

        let callback = this.getCallbak(keys_str);
        if (!callback)
            return;

        callback.apply(thisArg, argsArray);
    }
    /* **************************************************************** *
     *  Sizing
     * **************************************************************** */
    headerWidth (d) {
        let padding = this._padding;
        return d.w - padding * 2;
    }
    headerContentsHight (d) {
        return 22;
    }
    headerHight (d) {
        let padding_top = this._padding;
        let padding_bottm = 3;
        return 22 + padding_top + padding_bottm;
    }
    /// base
    baseHeight (d) {
        return this.headerHight(d) + this.column.columnsHeight(d);
    }
    /* **************************************************************** *
     *  Positioning
     * **************************************************************** */
    ///
    /// 未実装
    ///
    /* **************************************************************** *
     *  Data manegement
     * **************************************************************** */
    build (list) {
        return this.pool.list2pool(list);
    }
}
