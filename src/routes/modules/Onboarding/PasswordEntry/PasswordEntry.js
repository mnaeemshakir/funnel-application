import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import doorImageLight from 'assets/img/onboarding/Step1.png';
// import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TextField } from '@material-ui/core';
import styles from './PasswordEntry.module.scss';
import { fireGA4PageView, isNull } from '../../../../utils/utils';
import { GA4_SCREEN_10 } from '../../../../utils/constants';

const PasswordEntry = props => {
  const { onSelect, value } = props;
  const [password, setPassword] = useState('');

  React.useEffect(() => {
    fireGA4PageView(GA4_SCREEN_10);
  }, []);

  const { t } = useTranslation();
  React.useEffect(() => {
    if (value) {
      setPassword(value);
    }
  }, value)


  const onItemClick = () => {
    // GAOnboardingEvent({ question: 'Q#2: goals', answer: status });
    if (onSelect) onSelect({ "Password": password });
  };
  const onPasswordChange = e => {
    const value = e.target.value;
    setPassword(value);
  }

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
          // alignContent="space-between"
          className={styles.mainContainer}
        >
          <Grid>
            <Grid item xs={12} className={`${styles.contentSpacing} ${styles.contentWidth}`}>
              <p className={styles.heading}>{t('enterPassword')}</p>
            </Grid>
            <Grid item xs={12} className={`${styles.contentSpacing} ${styles.contentWidth}`}>
              <TextField
                id="outlined-multiline-static"
                placeholder={t("Password")}
                value={password}
                onChange={onPasswordChange}
                variant="outlined"
                type="password"
                fullWidth
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
                disabled={isNull(password)}
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

PasswordEntry.propTypes = {
  // appreciationTexts: PropTypes.object,
  onSelect: PropTypes.func,
};

export default PasswordEntry;
