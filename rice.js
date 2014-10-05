// Rice Tracker on blue background
// Based on ColorTracker

var RiceTracker = function() {
    RiceTracker.prototype.track = function(pixels, width, height) {

        var self = this;

        // 基于颜色的基本定位
        tracking.ColorTracker.registerColor('rice', function(r, g, b) {
            var brightness = 120;
            if (r > brightness && g > brightness && b > brightness) {
                return true;
            }
            return false;
        });

        // Detect if it's blue background
        var isBackground = function(r, g, b) {
            return (b > r) && (b > g) && (r < 180) && (g < 180);
        };

        // 基于非背景色判定的横向切割
        var cut = function(rects) {

            var results = [];
            rects.forEach(function(rect) {
                // 计算每一列背景所占比例
                var rates = [];
                for(var i = rect.x; i < rect.width + rect.x; i++) {
                    var count = 0;
                    for(var j = rect.y; j < rect.height + rect.y; j++) {
                        var n = (j * width + i) * 4,
                            r = pixels[n],
                            g = pixels[n+1],
                            b = pixels[n+2];
                        if(isBackground(r, g, b)) {
                            count++;
                        }
                    }
                    var rate = count / rect.height;
                    rates.push(rate);
                }
                // 以极大值作为切割点，切割矩形
                // TODO: 如果背景占比波动厉害，可以用模拟退火优化这里
                var mark = 0;
                for(var i = 1; i < rates.length; i++) {
                    if((i == (rates.length - 1)) || // 这是最后一项了
                       ((rates[i] > 0.7) && // 背景占比要大于 70%
                        (i > mark + 20) && // 长度要大于 20px，用于简单地降低波动造成的影响
                        ((rates[i] >= rates[i - 1]) && (rates[i] >= rates[i + 1]))))
                    {
                        results.push({
                            x: mark + rect.x,
                            y: rect.y,
                            width: i - mark,
                            height: rect.height
                        });
                        mark = i;
                    }
                }
            });
            return results;
        };

        // 过滤半颗大米的情况
        // var filter = function(rects) {
        // };


        var tracker = new tracking.ColorTracker(['rice']);
        tracker.on('track', function(event) {
            var rects = event.data;
            rects = cut(rects);
            // rects = filter(rects);
            self.emit('track', {data: rects});
        });
        tracker.track(pixels, width, height);
    };
};

tracking.inherits(RiceTracker, tracking.Tracker);
