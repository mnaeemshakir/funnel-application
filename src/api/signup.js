import { apiEndpoint, checkResponseStatus, checkResponseContentType, ApiError } from './baseApi';

const signupURI = 'auth';

export async function signup(request) {
  const url = new URL(signupURI, apiEndpoint);
  url.search = new URLSearchParams(request).toString();
  let responseHeaders = null;
  return fetch(url.href, {
    method: 'POST',
    headers: {
      Connection: 'keep-alive',
    },
  })
    .then(checkResponseStatus)
    .then(response => {
      responseHeaders = response.headers;
      return response;
    })
    .then(checkResponseContentType)
    .then(res => {
      console.log('signup-res',res)
      if (typeof res === 'object') {
      console.log('typeof res === object',res)

        return {
          loggedIn: true,
          data: res.data,
          loginInfo: {
            accessToken: responseHeaders.get('access-token'),
            uid: responseHeaders.get('uid'),
            tokenType: responseHeaders.get('token-type'),
            client: responseHeaders.get('client'),
            expiry: responseHeaders.get('expiry'),
          },
        };
      }
      console.log('signup-err',res)

      let errorMessage = 'Unexpected Login Response.';
      if (typeof res === 'string') {
        errorMessage = res;
      }

      const error = new ApiError(errorMessage);
      error.showUser = true;
      throw error;
    });
}
