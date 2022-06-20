import { request } from './axios';

export const cities = {
  baseUrl: '/cities',

  /**
   * 取得所有縣市資料
   */
  getCities() {
    return request(this.baseUrl)
      .then((res) => {
        if (res.status) {
          return res.data;
        }
        return res.data;
      }).catch((err) => {
        return {
          message: err,
          status: false,
        };
      });
  },

};
