


window.onload = function() {
    var img = document.getElementById('img');

    var plot = function(x, y, w, h, color) {
        var rect = document.createElement('div');
        document.querySelector('body').appendChild(rect);
        rect.classList.add('rect');
        rect.style.width = w + 'px';
        rect.style.height = h + 'px';
        rect.style.left = (img.offsetLeft + x) + 'px';
        rect.style.top = (img.offsetTop + y) + 'px';
        rect.style.borderColor = color;
    };

    // 大米判定
    (function() {
        var tracker = new RiceTracker();
        tracker.on('track', function(event) {
            event.data.forEach(function(rect) {
                plot(rect.x, rect.y, rect.width, rect.height, 'red');
            });
        });
        tracking.track('#img', tracker);
    })();

    // 偏黄大米识别
    (function() {
        tracking.ColorTracker.registerColor('yellow-rice', function(r, g, b) {
            var brightness = 120;
            if (!(r > brightness && g > brightness && b > brightness)) {
                return false; // isn't rice!
            }
            if(r > b && g > b) {
                // FIXME: 这里的判定有点简单了
                //        不过可以暂时作为 workround, 具体需要查一下相关公式
                return true; // 色彩偏黄
            }
            return false;
        });
        var tracker = new tracking.ColorTracker(['yellow-rice']);
        tracker.on('track', function(event) {
            event.data.forEach(function(rect) {
                plot(rect.x, rect.y, rect.width, rect.height, 'yellow');
            });
        });
        tracking.track('#img', tracker);
    })();

    // 黑点检测
    (function() {
        tracking.ColorTracker.registerColor('black-dots', function(r, g, b) {
            if((r + g + b) < 300 ) {
                return true;
            }
            return false;
        });
        var tracker = new tracking.ColorTracker(['black-dots']);
        tracker.on('track', function(event) {
            event.data.forEach(function(rect) {
                plot(rect.x, rect.y, rect.width, rect.height, 'black');
            });
        });
        tracking.track('#img', tracker);
    })();

};
