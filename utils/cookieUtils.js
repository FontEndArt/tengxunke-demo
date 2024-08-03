import cookie from 'cookie';
import gjson from 'gjson';
import base64 from 'base-64';

// 从配置文件中读取 cookie 字符串
export const cookieString = '';

// 解析 cookie 字符串
const cookies = cookie.parse(cookieString);

export function getCookieByKey(key) {
  return cookies[key] || '';
}

export function getUin() {
  const uidType = getCookieByKey('uid_type');
  let uin;

  switch (uidType) {
    case '':
      // 发现有没有"uid_type"的情况
      uin = gjson.get(getCookieByKey('tdw_data_new_2'), 'uin').value();
      break;
    default:
      uin = getCookieByKey('uin');
      break;
  }

  return uin;
}


export function getMediaToken(cID, termID) {
  let origin;
  const uidType = getCookieByKey('uid_type');

  switch (uidType) {
    case '':
      // 发现有没有"uid_type"的情况
      origin = `uin=${gjson.get(getCookieByKey('tdw_data_new_2'), 'uin').value()};skey=${getCookieByKey('skey')};pskey=${getCookieByKey('p_skey')};plskey=${getCookieByKey('p_lskey')};ext=;cid=${cID};term_id=${termID};vod_type=0`;
      break;
    case '0':
      // qq扫码与qq帐号登录都是0
      origin = `uin=${getCookieByKey('uin')};skey=${getCookieByKey('skey')};pskey=${getCookieByKey('p_skey')};plskey=${getCookieByKey('p_lskey')};ext=;uid_type=${getCookieByKey('uid_type')};uid_origin_uid_type=${getCookieByKey('uid_origin_uid_type')};cid=${cID};term_id=${termID};vod_type=0`;
      break;
    case '2':
      // 微信扫码登录
      origin = `uin=${getCookieByKey('uin')};skey=;pskey=;plskey=;ext=${getCookieByKey('uid_a2')};uid_appid=${getCookieByKey('uid_appid')};uid_type=2;uid_origin_uid_type=${getCookieByKey('uid_origin_uid_type')};cid=${cID};term_id=${termID};vod_type=0`;
      break;
    default:
      origin = `uin=${getCookieByKey('uin')};skey=${getCookieByKey('skey')};pskey=${getCookieByKey('p_skey')};plskey=${getCookieByKey('p_lskey')};ext=;uid_type=${getCookieByKey('uid_type')};uid_origin_uid_type=${getCookieByKey('uid_origin_uid_type')};uid_origin_auth_type=0;cid=${cID};term_id=${termID};vod_type=0;platform=3`;
      break;
  }

  return base64.encode(origin);
}



export function getVodUrl(info, cid, termID) {
  let vodUrl = info.url;
  const i = vodUrl.lastIndexOf('/');
  const mediaToken = getMediaToken(cid, termID);
  vodUrl = `${vodUrl.substring(0, i + 1)}voddrm.token.${mediaToken}.${vodUrl.substring(i + 1)}`;
  return vodUrl;
}