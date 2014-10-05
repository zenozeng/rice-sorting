# rice-sorting

Rice sorting based on machine vision.

这是一个概念验证的 repo，不是具体实现哦。
为了方便演示，
我们这里用 tracking.js 这个库来操作，
实际的话，
可以考虑用 opencv 来替代掉以换取更高性能。

## 简介

![01](screenshot.png)

如图所示，大米从上方滑入。
轨道被摆成一个适宜的角度，
使得绝大多数大米的阻力和重力分力抵消。

![02](screenshot2.png)

左侧有个高速摄像头，
连接一个树莓派或者服务器。
利用机器视觉进行判定。

```coffeescript
if 当前大米 is 劣质大米
    启动右侧气枪
    将大米喷入劣品分级轨道
else
    沿着当前轨道继续前进到下一环节。
```

## 机器视觉

### 背景的选取

检测区背景采用纯蓝色。

如果用黑色或背景的话，
那么大米边缘的坏点容易被忽略。
而黄色可能是发霉的大米之类。
蓝色是一个相对安全的颜色，
同时很容易和大米进行区分。

### 基于颜色的大米定位

这里我们简单的地使用 r, g, b 均大于 120 作为大米识别的标志。
扫一遍图片，
然后可以得到一些基本的矩形区域。

```javascript
tracking.ColorTracker.registerColor('rice', function(r, g, b) {
    var brightness = 120; 
    if (r > brightness && g > brightness && b > brightness) {
        return true;
    }
    return false;
});

var tracker = new tracking.ColorTracker(['rice']);
```

![01](processing/1.jpg)

问题很明显，我们不能正确的分离大米，
如果调大亮度控制的话，
则会引入大米区域选择不全的问题。

![02](processing/2.jpg)

## 拓展

### 更多的分级

只要机器识别好，
然后在下面多增加几条轨道，
由于运动的速度是（基本）匀速所以可以，
事先mark好，
到了指定位置再吹入。

### 更快的速度

可以考虑并行多条轨道，
然后一个摄像头同时拍摄多轨，
然后分割后交给计算机处理。

## 可能碰到的一些问题

- 大米的边缘检测及其分离

## Pics

Remix based on IRRI's 1!_8500, which is licensed under cc-by-nc-sa 2.0.

See also: https://www.flickr.com/photos/ricephotos/382219911/in/photostream/

## Ref

- [A modern approach for Computer Vision on the web](http://trackingjs.com/)
