import { fetchWithQueryParams } from './baseApi';
import { getFromStorage } from '../utils/storage';

const subscribeURI = '/payments/subscribe';
const subscribeEmailUserURI = 'payments/subscribe_web';

export async function subscribeLoginUser(request) {
  const { loginInfo, query } = request;
  const requestHeaders = {
    'access-token': getFromStorage('token'),
    'token-type': loginInfo.tokenType,
    client: loginInfo.client,
    expiry: loginInfo.expiry,
    uid: loginInfo.uid,
  };

  return fetchWithQueryParams('POST', subscribeURI, query, requestHeaders).then(res => {
    if (typeof res === 'object') {
      return {
        data: res,
      };
    }
    return res;
  });
}

export async function subscribeEmailUser(request) {
  return fetchWithQueryParams('POST', subscribeEmailUserURI, request).then(res => {
    if (typeof res === 'object') {
      return {
        data: res,
      };
    }
    return res;
  });
}
