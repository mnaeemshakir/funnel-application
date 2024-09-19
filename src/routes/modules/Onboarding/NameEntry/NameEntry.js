import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import doorImageLight from 'assets/img/onboarding/Step1.png';
// import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TextField } from '@material-ui/core';
import styles from './NameEntry.module.scss';
import { fireGA4PageView, isNull } from '../../../../utils/utils';
import { GA4_SCREEN_8 } from '../../../../utils/constants';

const GreatfulItemEntry = props => {
  const { onSelect, value } = props;
  const [name, setName] = useState('');
  const { t } = useTranslation();

  React.useEffect(() => {
    fireGA4PageView(GA4_SCREEN_8);
  }, []);
  React.useEffect(() => {
    if (value) {
      setName(value);
    }
  }, value);

  const onItemClick = () => {
    // GAOnboardingEvent({ question: 'Q#2: goals', answer: status });
    if (onSelect) onSelect({ Name: name });
  };
  const onNameChange = e => {
    const value = e.target.value;
    setName(value);
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
          // alignContent="space-between"
          className={styles.mainContainer}
        >
          <Grid>
            <Grid item xs={12} className={`${styles.contentSpacing} ${styles.contentWidth}`}>
              <p className={styles.heading}>{t('whatToCall')}</p>
            </Grid>
            <Grid item xs={12} className={`${styles.contentSpacing} ${styles.contentWidth}`}>
              <TextField
                id="outlined-multiline-static"
                placeholder={t('name')}
                value={name}
                onChange={onNameChange}
                variant="outlined"
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
                disabled={isNull(name)}
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

GreatfulItemEntry.propTypes = {
  // appreciationTexts: PropTypes.object,
  onSelect: PropTypes.func,
};

export default GreatfulItemEntry;
