// import { exec } from 'node:child_process';
import { spawn } from 'node:child_process';
import { cookieString, getUin, getVodUrl } from './utils/cookieUtils.js';
const referer = "https://ke.qq.com/webcourse/index.html"

function main(CourseID, termID) {
    const cid = CourseID;
    const tid = termID;
    // bkn是写死的，网页端登陆，在network中搜索bkn，然后写死一下就行
    const bkn = 407412381;
    const uin = getUin();

    // 提前配置一下本地的ffmpeg命令或者路径
    const ffmpeg = "E:\\ffmpeg-master-latest-win64-gpl\\ffmpeg-master-latest-win64-gpl\\bin\\ffmpeg.exe";

    const myHeaders = new Headers();
    myHeaders.append("Referer", referer);
    myHeaders.append("Cookie", cookieString);
    myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");
    myHeaders.append("Accept", "*/*");
    myHeaders.append("Host", "ke.qq.com");
    myHeaders.append("Connection", "keep-alive");

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    // 获取课程列表，用来获取下面用到的fileID，在这里的名字是resid_list
    fetch(`https://ke.qq.com/cgi-bin/user/user_center/get_plan_detail?cid=${cid}&uin=${uin}&term_id=${tid}&bkn=${bkn}`, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));


    // TODO: 将上面获取的resid_list，用作这里的fileID
    const fileID = '5285890787986445064';

    const header = { "srv_appid": 201, "cli_appid": "ke", "uin": uin, "cli_info": { "cli_platform": 3 } }
    const headerParams = encodeURIComponent(JSON.stringify(header))

    fetch(`https://ke.qq.com/cgi-proxy/rec_video/describe_rec_video?course_id=${cid}&file_id=${fileID}&header=${headerParams}&term_id=${tid}&bkn=${bkn}`, requestOptions)
        .then(res => res.json())
        .then(data => {
            console.log(JSON.stringify(data, null, 2))
            const info = data.result.rec_video_info.infos[0]
            const url = getVodUrl(info, cid, tid)
            console.log(url)

            // const ffmpegCommand = `ffmpeg -allowed_extensions ALL -protocol_whitelist file,http,https,tcp,tls,crypto -i "${url}" -c copy -bsf:a aac_adtstoasc 本地文件名1.mp4`;

            const ffmpegProcess = spawn(ffmpeg, [
                '-y',  // overwrite output file if it exists
                '-allowed_extensions', 'ALL',
                '-protocol_whitelist', 'file,http,https,tcp,tls,crypto',
                '-i', url,
                '-c', 'copy',
                '-bsf:a', 'aac_adtstoasc',
                '本地文件名1.mp4'
            ]);

            ffmpegProcess.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
            });

            ffmpegProcess.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);
            });

            ffmpegProcess.on('close', (code) => {
                console.log(`ffmpeg process exited with code ${code}`);
            });

        }).catch(err => {
            console.log('error:', err)
        })
}

main(3455388, 103593262);
