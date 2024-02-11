import Pool from '../Pool';
import Geometry from '../Geometry';

// data model
export default class Port {
    constructor () {
        this.pool = new Pool();
        this.geometry = new Geometry();
    }
    /**
     * entity と port
     */
    calLinePoints (port) {
        const entity = port._column_instance._table;

        const rect = {
            position: {
                x: entity.x,
                y: entity.y,
            },
            size: {
                w: entity.w,
                h: entity.h,
            }
        };

        const geometry = this.geometry;

        // entity の四辺
        const four_side_lines = geometry.getFourSideLines(rect);

        // port と entityの中心との直線。
        const line_port = geometry.getPortLine(port, rect);

        // port と entityの中心との直線 と entity の四辺の交点。
        // 交点 と どの辺 が返ってくる。
        const cross_point = geometry.getCrossPoint(four_side_lines, line_port);

        // entity と port との距離
        const len = 33 + 4; // 33: ?, 4: ?

        // point の位置を返す
        const to_point = cross_point.point;
        const from_point = ()=> {
            switch (cross_point.target) {
            case 'top':    return { x: to_point.x,       y: to_point.y + len };
            case 'right':  return { x: to_point.x - len, y: to_point.y };
            case 'bottom': return { x: to_point.x,       y: to_point.y - len };
            case 'left':   return { x: to_point.x + len, y: to_point.y };
            default: throw new Error('!!!');
            }
        };

        return {
            from: from_point(),
            to:   to_point,
        };
    }
    /** **************************************************************** *
     * port と entity の間の向きを返します。
     * **************************************************************** */
    portDirection (from, to) {
        // 縦
        if (from.x===to.x) {
            if (from.y < to.y) return 'UP';
            if (from.y > to.y) return 'DOWN';
        }

        // 横
        if (from.y===to.y) {
            if (from.x < to.x) return 'RIGHT';
            if (from.x > to.x) return 'LEFT';
        }

        // これはありえないはず。
        throw new Error('Can Not Found Direction.');
    }
    /** **************************************************************** *
     * 1 line (cardinaly: 1)
     * Cardinary： n ケースの座標を計算する。
     * Line の from, to で向きを決める。
     * d: port
     * distance: between port and entity
     * **************************************************************** */
    calOneLine (from, to, distance) {
        const r = 11;

        switch (this.portDirection(from, to)) {
        case 'DOWN':
            return {
                from: { x: from.x + r, y: from.y + distance },
                to:   { x: from.x - r, y: from.y + distance },
            };
        case 'DOWN':
            return {
                from: { x: from.x + r, y: from.y - distance },
                to:   { x: from.x - r, y: from.y - distance },
            };
        case 'RIGHT':
            return {
                from: { x: from.x + distance, y: from.y + r },
                to:   { x: from.x + distance, y: from.y - r },
            };
        case 'LEFT':
            return {
                from: { x: from.x - distance, y: from.y + r },
                to:   { x: from.x - distance, y: from.y - r },
            };
        default:
            return {
                from: { x:0, y:0 },
                to:   { x:0, y:0 },
            };
        }
    };
    /**
     * 3 line (cardinaly: n)
     * Cardinary： n ケースの座標を計算する。
     * Line の from, to で向きを決める。
     * d: port
     * distance: between port and entity
     * **************************************************************** */
    calThreeLine (from, to, distance) {
        switch (this.portDirection(from, to)) {
        case 'DOWN':
            return [
                [ from.x - distance, from.y ],
                [ from.x,            from.y + distance ],
                [ from.x + distance, from.y ],
            ];
        case 'DOWN':
            return [
                [ from.x - distance, from.y ],
                [ from.x,            from.y - distance ],
                [ from.x + distance, from.y ],
            ];
        case 'RIGHT':
            return [
                [ from.x,            from.y - distance ],
                [ from.x + distance, from.y ],
                [ from.x,            from.y + distance ],
            ];
        case 'LEFT':
            return [
                [ from.x,            from.y - distance ],
                [ from.x - distance, from.y ],
                [ from.x,            from.y + distance ],
            ];
        default:
            return [
                [0, 0],
                [0, 0],
                [0, 0],
            ];
        }
    };
    /** **************************************************************** *
     * null のための 丸
     * **************************************************************** */
    calCircle (from, to) {
        const distance = 22;

        switch (this.portDirection(from, to)) {
        case 'DOWN':
            return {
                x:from.x,
                y:from.y + distance,
            };
        case 'DOWN':
            return {
                x:from.x,
                y:from.y - distance,
            };
        case 'RIGHT':
            return {
                x:from.x + distance,
                y:from.y
            };
        case 'LEFT':
            return {
                x:from.x - distance,
                y:from.y
            };
        default:
            return { x:0, y:0 };
        }
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
