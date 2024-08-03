# DEMO说明

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