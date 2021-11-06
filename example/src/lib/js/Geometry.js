// https://yanqirenshi.github.io/D3.Sketch/dist/edge/Drawer.js
/**
 * 幾何学計算するための Drawer です。
 *
 * @example
 * let drawer = new DrawerHierarchy();
 */
export default class Geometry {
    ///// ////////////////////////////////////////////////////////////////
    /////   Utilities
    ///// ////////////////////////////////////////////////////////////////
    deg2rad (degree) {
        return degree * ( Math.PI / 180 );
    }
    ///// ////////////////////////////////////////////////////////////////
    /////   Rect
    ///// ////////////////////////////////////////////////////////////////
    getFourSideLines (rect) {
        let x = 0; //rect.position.x;
        let y = 0; //rect.position.y;

        let w = rect.size.w;
        let h = rect.size.h;

        let port_r = 4;
        let margin =  33 + port_r;

        let top_left     = { x: x -     margin, y: y -     margin};
        let top_right    = { x: x + w + margin, y: y -     margin};
        let bottom_rigth = { x: x + w + margin, y: y + h + margin};
        let bottom_left  = { x: x -     margin, y: y + h + margin};

        return [
            { code: 'top',    from: top_left,     to: top_right    },
            { code: 'right',  from: top_right,    to: bottom_rigth },
            { code: 'bottom', from: bottom_rigth, to: bottom_left  },
            { code: 'left',   from: bottom_left,  to: top_left     },
        ];
    }
    ///// ////////////////////////////////////////////////////////////////
    /////   Rect
    ///// ////////////////////////////////////////////////////////////////
    getPortLineFrom (rect) {
        return {
            x: Math.floor(rect.size.w / 2),
            y: Math.floor(rect.size.h / 2),
        };
    }
    getPortLineToPoint (node) {
        let w = node.size.w;
        let h = node.size.h;

        return {
            x: 0,
            y: Math.floor(Math.sqrt((w * w) + (h * h))),
        };
    }
    getPortLineTo (degree, node) {
        let point = this.getPortLineToPoint(node);
        let x = point.x;
        let y = point.y;

        let degree_tmp;
        if (degree===0)
            degree_tmp = degree;
        else if (!degree)
            degree_tmp = 90;
        else
            degree_tmp = degree % 360;

        let radian = this.deg2rad(degree_tmp);
        let cos = Math.cos(radian);
        let sin = Math.sin(radian);

        return {
            x: Math.floor(x * cos - y * sin),
            y: Math.floor(x * sin + y * cos),
        };
    }
    getPortLine (port, rect) { // degree,
        let from = this.getPortLineFrom(rect);
        let to   = this.getPortLineTo(port.degree, rect);

        return {
            from: {
                x: from.x,
                y: from.y,
            },
            to: {
                x: to.x + from.x,
                y: to.y + from.y,
            },
        };
    }
    ///// ////////////////////////////////////////////////////////////////
    /////   Cross Point of two lines
    ///// ////////////////////////////////////////////////////////////////
    isCorss(A, B, C, D) {
        // 二つの線分の交差チェック
        // https://www.hiramine.com/programming/graphics/2d_segmentintersection.html
        let ACx = C.x - A.x;
        let ACy = C.y - A.y;
        let BUNBO = (B.x - A.x) * (D.y - C.y) - (B.y - A.y) * (D.x - C.x);

        if (BUNBO===0)
            return false;

        let r = ((D.y - C.y) * ACx - (D.x - C.x) * ACy) / BUNBO;
        let s = ((B.y - A.y) * ACx - (B.x - A.x) * ACy) / BUNBO;

        return ((0 <= r && r <= 1) && (0 <= s && s <= 1));
    }
    // 2直線の交点を求める。(具)
    getCrossPointCore (line, line_port) {
        let out = { x:0, y:0 };

        let A = line.from;
        let B = line.to;
        let C = line_port.from;
        let D = line_port.to;

        let bunbo = (B.y - A.y) * (D.x - C.x) - (B.x - A.x) * (D.y - C.y);

        if (!this.isCorss(A, B, C, D))
            return null;

        // 二つの線分の交点を算出する。
        // http://mf-atelier.sakura.ne.jp/mf-atelier/modules/tips/program/algorithm/a1.html
        let d1, d2;

        d1 = (C.y * D.x) - (C.x * D.y);
        d2 = (A.y * B.x) - (A.x * B.y);

        out.x = (d1 * (B.x - A.x) - d2 * (D.x - C.x)) / bunbo;
        out.y = (d1 * (B.y - A.y) - d2 * (D.y - C.y)) / bunbo;

        return out;
    }
    // 2直線の交点を求める。
    getCrossPoint (lines, line_port) {
        for (let line of lines) {
            let point = this.getCrossPointCore(line, line_port);

            if (point)
                return { point: point, target: line.code };
        }

        return null;
    }
}
