import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MomentUtils from '@date-io/moment';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import Snackbar from './components/common/Snackbar';
import RouteComponents from './routes/modules';
import routesConfig from './routes/dictionary.json';
import RouteFactory from './utils/routing/RouteFactory';
import { GA4, paypalClientId } from './utils/envConstants';
import GA4React, { useGA4React } from "ga-4-react";


const theme = createTheme({
  typography: {
    fontFamily: 'DM Sans Display, sans-serif',
  },
  palette: {
    primary: {
      main: '#008196',
    },
    secondary: {
      main: '#5fc6c4',
    },
  },
});
// ReactGA.initialize('UA-121641163-1', {
//   titleCase: false,
// });
// ReactGA.pageview(window.location.pathname + window.location.search);
const ga4react = new GA4React(
  GA4,
  {
    /* ga custom config, optional */
  },
  [
    /* additional code, optional */
  ],
  5000 /* timeout, optional, defaults is 5000 */,
);

ga4react.initialize().then(
  ga4 => {
    //ga4.pageview(window.location.pathname + window.location.search);
    //ga4.gtag('event', 'pageview', window.location.pathname + window.location.search);
  },
  err => console.log(err)
);

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <PayPalScriptProvider
          options={{
            'client-id': paypalClientId,
            currency: 'EUR',
            vault: true,
            intent: 'subscription',
          }}
        >
          <BrowserRouter>
            <RouteFactory routes={RouteComponents} config={routesConfig} />
          </BrowserRouter>
          <Snackbar />
        </PayPalScriptProvider>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  );
};

export default App;
