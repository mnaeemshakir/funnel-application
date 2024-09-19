import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
// import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TextField } from '@material-ui/core';
import GA4React, { useGA4React } from 'ga-4-react';
import styles from './EmailEntry.module.scss';
import { fireGA4PageView, isNull } from '../../../../utils/utils';
import { GA4_SCREEN_3 } from '../../../../utils/constants';

const EmailEntry = props => {
  const { onSelect, value } = props;
  const [email, setEmail] = useState('');
  const { t } = useTranslation();

  React.useEffect(() => {
    fireGA4PageView(GA4_SCREEN_3);
  }, []);

  React.useEffect(() => {
    if (value) {
      setEmail(value);
    }
  }, value);

  const onItemClick = () => {
    // GAOnboardingEvent({ question: 'Q#2: goals', answer: status });
    if (onSelect) onSelect({ Email: email });
  };
  const validateEmail = email => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
  };
  const onEmailChange = e => {
    const value = e.target.value;
    setEmail(value);
  };

  return (
    <Grid container direction="row" className={styles.successRoot}>
      <div className={styles.contentContainer}>
        <Grid
          xs={10}
          sm={6}
          md={4}
          lg={4}
          xl={3}
          item
          container
          justifyContent="center"
          className={styles.mainContainer}
        >
          <Grid>
            <Grid item xs={12} className={`${styles.contentSpacing} ${styles.contentWidth}`}>
              <p className={styles.heading}>{t('addEmail')}</p>
            </Grid>
            <Grid item xs={12} className={`${styles.contentSpacing} ${styles.contentWidth}`}>
              <TextField
                placeholder={t('email')}
                value={email}
                onChange={onEmailChange}
                variant="outlined"
                fullWidth
                type=""
                className={styles.field}
              />
            </Grid>
          </Grid>
          <Grid xs={12}>
            <Grid item justifyContent="center" xs={12} sm={12} className={styles.buttonContainer}>
              <Button
                variant="contained"
                color="primary"
                className={`${styles.button} ${styles.contained} ${styles.buttonFullWidth}`}
                onClick={onItemClick}
                disabled={isNull(validateEmail(email))}
              >
                {t('continue')}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};

EmailEntry.propTypes = {
  onSelect: PropTypes.func,
};

export default EmailEntry;
