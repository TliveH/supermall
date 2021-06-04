import {request} from "@/network/request";

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  }).catch(err => err);
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  }).catch(err => err);
}
