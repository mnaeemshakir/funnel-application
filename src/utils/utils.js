/**
 * isNull checks that passed value is empty, undefined or null
 * @param {any} value
 * @returns {boolean}
 */

import GA4React from 'ga-4-react';
import { GA4 } from './envConstants';

export const isNull = value => {
  return (
    value === '' ||
    value === undefined ||
    value === null ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' && Object.keys(value).length === 0)
  );
};

export const fireGA4PageView = eventName => {
  const ga4react = new GA4React(GA4);
  ga4react.pageview(eventName, eventName, eventName);
};
