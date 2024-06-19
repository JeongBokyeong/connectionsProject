Raphael.fn.connection = function (obj1, obj2, line, bg) {
    if (obj1.line && obj1.from && obj1.to) {
        line = obj1;
        obj1 = line.from;
        obj2 = line.to;
    }
	var A = getAbsoluteElementPos(document.getElementById(obj1.attr('id')));
	var B = getAbsoluteElementPos(document.getElementById(obj2.attr('id')));
    var bb1 = obj1.getBBox(),
        bb2 = obj2.getBBox(),
        p = [{x: A.x + parseInt(obj1.width()) / 2, y: A.y - 1},
        {x: A.x + parseInt(obj1.width()) / 2, y: A.y + parseInt(obj1.height()) + 1},
        {x: A.x - 1, y: A.y + parseInt(obj1.height()) / 2},
        {x: A.x + parseInt(obj1.width()) + 1, y: A.y + parseInt(obj1.height()) / 2},
        {x: B.x + parseInt(obj2.width()) / 2, y: B.y - 1},
        {x: B.x + parseInt(obj2.width()) / 2, y: B.y + parseInt(obj2.height()) + 1},
        {x: B.x - 1, y: B.y + parseInt(obj2.height()) / 2},
        {x: B.x + parseInt(obj2.width()) + 1, y: B.y + parseInt(obj2.height()) / 2}],
        d = {}, dis = [];
    for (var i = 0; i < 4; i++) {
        for (var j = 4; j < 8; j++) {
            var dx = Math.abs(p[i].x - p[j].x),
                dy = Math.abs(p[i].y - p[j].y);
            if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
                dis.push(dx + dy);
                d[dis[dis.length - 1]] = [i, j];
            }
        }
    }
    if (dis.length == 0) {
        var res = [0, 4];
    } else {
        res = d[Math.min.apply(Math, dis)];
    }
    var x1 = p[res[0]].x,
        y1 = p[res[0]].y,
        x4 = p[res[1]].x,
        y4 = p[res[1]].y;
    dx = Math.max(Math.abs(x1 - x4) / 2, 10);
    dy = Math.max(Math.abs(y1 - y4) / 2, 10);
    var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
        y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
        x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
        y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);
    var path = ["M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",");
    if (line && line.line) {
        line.bg && line.bg.attr({path: path});
        line.line.attr({path: path});
    } else {
        var color = typeof line == "string" ? line : "#000";
        return {
            bg: bg && bg.split && this.path(path).attr({stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[1] || 3}),
            line: this.path(path).attr({stroke: color, fill: "none"}),
            from: obj1,
            to: obj2
        };
    }
};

var el;
var r;
var connections = [];
function move() {
            for (var i = connections.length; i--;) {
                r.connection(connections[i]);
            }
            r.safari();
        }
window.onload = function () {
        r = Raphael("holder", 640, 480);
};