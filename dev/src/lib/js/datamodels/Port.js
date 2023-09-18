import Pool from '../Pool';
import Geometry from '../Geometry';

export default class Port {
    constructor () {
        this.pool = new Pool();
        this.geometry = new Geometry();
    }
    calLinePoints (port) {
        const table = port._column_instance._table;
        const rect = {
            position: {
                x: table.x,
                y: table.y,
            },
            size: {
                w: table.w,
                h: table.h,
            }
        };

        const geometry = this.geometry;
        const four_side_lines = geometry.getFourSideLines(rect);
        const line_port = geometry.getPortLine(port, rect);

        const cross_point = geometry.getCrossPoint(four_side_lines, line_port);

        const len = 33 + 4;
        const to_point = cross_point.point;
        let from_point;
        if (cross_point.target==='top') {
            from_point = {
                x: to_point.x,
                y: to_point.y + len,
            };
        } else if (cross_point.target==='right') {
            from_point = {
                x: to_point.x - len,
                y: to_point.y,
            };
        } else if (cross_point.target==='bottom') {
            from_point = {
                x: to_point.x,
                y: to_point.y - len,
            };
        } else if (cross_point.target==='left') {
            from_point = {
                x: to_point.x + len,
                y: to_point.y,
            };
        }

        return {
            from: from_point,
            to: to_point,
        };
    }
    calOneLine (d, distance) {
        const r = 11;

        if (d.line.from.x===d.line.to.x) {
            // 縦
            if (d.line.from.y < d.line.to.y) { // (2)
                return {
                    from: { x:d.line.from.x + r, y:d.line.from.y + distance },
                    to:   { x:d.line.from.x - r, y:d.line.from.y + distance },
                };
            } else if (d.line.from.y > d.line.to.y) { // (1)
                return {
                    from: { x:d.line.from.x + r, y:d.line.from.y - distance },
                    to:   { x:d.line.from.x - r, y:d.line.from.y - distance },
                };
            }
        } else if (d.line.from.y===d.line.to.y) {
            // 横
            if (d.line.from.x < d.line.to.x) { // (2)
                return {
                    from: { x:d.line.from.x + distance, y:d.line.from.y + r },
                    to:   { x:d.line.from.x + distance, y:d.line.from.y - r },
                };
            } else if (d.line.from.x > d.line.to.x) { // (1)
                return {
                    from: { x:d.line.from.x - distance, y:d.line.from.y + r },
                    to:   { x:d.line.from.x - distance, y:d.line.from.y - r },
                };
            }
        }

        return {
            from: { x:0, y:0 },
            to:   { x:0, y:0 },
        };
    };
    calThreeLine (d, distance) {
        if (d.line.from.x===d.line.to.x) {
            // 縦
            if (d.line.from.y < d.line.to.y) {
                return [
                    [d.line.from.x - distance, d.line.from.y],
                    [d.line.from.x,            d.line.from.y + distance],
                    [d.line.from.x + distance, d.line.from.y],
                ];
            } else if (d.line.from.y > d.line.to.y) {
                return [
                    [d.line.from.x - distance, d.line.from.y],
                    [d.line.from.x,            d.line.from.y - distance],
                    [d.line.from.x + distance, d.line.from.y],
                ];
            }
        } else if (d.line.from.y===d.line.to.y) {
            // 横
            if (d.line.from.x < d.line.to.x) {
                return [
                    [d.line.from.x,            d.line.from.y - distance],
                    [d.line.from.x + distance, d.line.from.y],
                    [d.line.from.x,            d.line.from.y + distance],
                ];
            } else if (d.line.from.x > d.line.to.x) {
                return [
                    [d.line.from.x,            d.line.from.y - distance],
                    [d.line.from.x - distance, d.line.from.y],
                    [d.line.from.x,            d.line.from.y + distance],
                ];
            }
        }

        return {
            from: { x:0, y:0 },
            to:   { x:0, y:0 },
        };
    };
    calCircle (d) {
        const distance = 22;

        if (d.line.from.x===d.line.to.x) {
            // 縦
            if (d.line.from.y < d.line.to.y) { // (2)
                return {
                    x:d.line.from.x,
                    y:d.line.from.y + distance,
                };
            } else if (d.line.from.y > d.line.to.y) { // (1)
                return {
                    x:d.line.from.x,
                    y:d.line.from.y - distance,
                };
            }
        } else if (d.line.from.y===d.line.to.y) {
            // 横
            if (d.line.from.x < d.line.to.x) { // (2)
                return {
                    x:d.line.from.x + distance,
                    y:d.line.from.y
                };
            } else if (d.line.from.x > d.line.to.x) { // (1)
                return {
                    x:d.line.from.x - distance,
                    y:d.line.from.y
                };
            }
        }

        return { x:0, y:0 };
    };
    /* **************************************************************** *
     *  Data manegement
     * **************************************************************** */
    build (list) {
        return this.pool.list2pool(list, (d) => {
            if (!d.cardinality)
                d.cardinality = 1;
            else if (d.cardinality!==1 && d.cardinality!==3)
                throw new Error('Not supported yet. cardinality='+d.cardinality);

            if (!d.optionality && d.optionality!==0)
                d.optionality = 1;
            else if (d.optionality!==1 && d.optionality!==0)
                throw new Error('Not supported yet. optionality='+d.optionality);

            return d;
        });
    }
}
