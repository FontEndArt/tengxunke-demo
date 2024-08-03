# 腾讯课堂下载课程DEMO - Node版 说明

本Demo基于NodeJS编写, 并不是成品，仅供参考。

如果需要实际使用，还需基于Demo写一些遍历的逻辑。欢迎PR

当然2024年10月1日，腾讯课堂就正式关闭服务，本Demo到时同时废弃。

# 1. 安装依赖

```
npm install
```

# 2. 修改配置

## 2.1 设置cookie
```
./utils/cookieUtils.js

// cookieString
```

## 2.2 设置ffmpeg路径
```
./index.js

// ffmpegPath
```

## 2.3 设置bkn - bkn是写死的，网页端登陆，在network中搜索bkn，然后写死一下就行
```
./index.js

// bkn
```

## 2.4 设置目标id

```
./index.js

// CourseID, termID
```

# 2. 启动

```
node index.js
```


# 鸣谢
https://github.com/HarryWang29/tencentKeTang