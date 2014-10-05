# rice-sorting

Rice sorting based on machine vision

## 简介

![01](screenshot.png)

如图所示，大米从上方滑入。
轨道被摆成一个适宜的角度，
使得绝大多数大米的阻力和重力分力抵消。

左侧有个高速摄像头

![02](screenshot2.png)

```coffeescript
if 当前大米 is 劣质大米
    启动右侧气枪
    将大米喷入劣品分级轨道
else
    沿着当前轨道继续前进到下一环节。
```

## 拓展

### 更多的分级

只要机器识别好，
然后在下面多增加几条轨道，
由于运动的速度是（基本）匀速所以可以，
事先mark好，
到了指定位置再吹入。

## 可能碰到的一些问题

- 大米的边缘检测及其分离
