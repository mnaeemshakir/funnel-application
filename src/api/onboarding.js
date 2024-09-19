import {
  apiEndpoint,
  checkResponseStatus,
  checkResponseContentType,
  ApiError,
  fetchWithQueryParams,
} from './baseApi';
import { getFromStorage } from '../utils/storage';

const questionsURI = '/onboarding/questions';
const emorionsURI = '/mood_processor/emotions';
const statementsURI = '/onboarding/statements';
const getQuestionResponseURI = '/onboarding/answers_v3';
const trainingDaysURI = '/onboarding/training_days';

export async function getQuestions(lang) {
  const url = new URL(questionsURI, apiEndpoint);

  return fetch(url.href, {
    method: 'GET',
    headers: {
      Connection: 'keep-alive',
      'Accept-Language': lang,
    },
  })
    .then(checkResponseStatus)
    .then(checkResponseContentType)
    .then(res => {
      if (typeof res === 'object') {
        return {
          data: res,
        };
      }

      let errorMessage = 'Unexpected Login Response.';
      if (typeof res === 'string') {
        errorMessage = res;
      }

      const error = new ApiError(errorMessage);
      error.showUser = true;
      throw error;
    });
}

export async function getEmotions(lang) {
  const query = { state: 1 };
  const url = new URL(emorionsURI, apiEndpoint);
  const search = new URLSearchParams(query).toString();
  url.search = search;

  return fetch(url.href, {
    method: 'GET',
    headers: {
      Connection: 'keep-alive',
      'Accept-Language': lang,
    },
  })
    .then(checkResponseStatus)
    .then(checkResponseContentType)
    .then(res => {
      if (typeof res === 'object') {
        return {
          data: res,
        };
      }

      let errorMessage = 'Unexpected Login Response.';
      if (typeof res === 'string') {
        errorMessage = res;
      }

      const error = new ApiError(errorMessage);
      error.showUser = true;
      throw error;
    });
}

export async function getStatements(lang) {
  const url = new URL(statementsURI, apiEndpoint);

  return fetch(url.href, {
    method: 'GET',
    headers: {
      Connection: 'keep-alive',
      'Accept-Language': lang,
    },
  })
    .then(checkResponseStatus)
    .then(checkResponseContentType)
    .then(res => {
      if (typeof res === 'object') {
        return {
          data: res,
        };
      }

      let errorMessage = 'Unexpected Login Response.';
      if (typeof res === 'string') {
        errorMessage = res;
      }

      const error = new ApiError(errorMessage);
      error.showUser = true;
      throw error;
    }).catch((error)=> {
     
    })
}

export async function getQuestionResponse(request) {
  const { loginInfo, query, headers } = request;
  const requestHeaders = {
    'access-token': getFromStorage('token'),
    'token-type': loginInfo.tokenType,
    client: loginInfo.client,
    expiry: loginInfo.expiry,
    uid: loginInfo.uid,
    ...headers,
  };

  return fetchWithQueryParams('POST', getQuestionResponseURI, {}, requestHeaders, query).then(
    res => {
      if (typeof res === 'object') {
        return {
          data: res,
        };
      }
      return res;
    },
  );
}

export async function setTrainingDays(request) {
  const { loginInfo, query } = request;
  const requestHeaders = {
    'access-token': getFromStorage('token'),
    'token-type': loginInfo.tokenType,
    client: loginInfo.client,
    expiry: loginInfo.expiry,
    uid: loginInfo.uid,
  };

  return fetchWithQueryParams('POST', trainingDaysURI, query, requestHeaders).then(res => {
    if (typeof res === 'object') {
      return {
        data: res,
      };
    }
    return res;
  });
}
