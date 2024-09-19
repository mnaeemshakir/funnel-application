import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import doorImageLight from 'assets/img/onboarding/Step1.png';
// import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TextField } from '@material-ui/core';
import GA4React, { useGA4React } from 'ga-4-react';
import styles from './GreatfulItemEntry.module.scss';
import { fireGA4PageView, isNull } from '../../../../utils/utils';
import { GA4_SCREEN_5 } from '../../../../utils/constants';

const GreatfulItemEntry = props => {
  const { onSelect, value } = props;
  const [data, setData] = useState('');
  const { t } = useTranslation();

  React.useEffect(() => {
    fireGA4PageView(GA4_SCREEN_5);
  }, []);
  React.useEffect(() => {
    if (value) {
      setData(value);
    }
  }, value);

  const onItemClick = () => {
    if (onSelect) onSelect({ GreatfulItemEntry: data });
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
              <p className={styles.heading}>{t('greatefulItems')}</p>
              <div className={styles.descMargin}>
                <p className={`${styles.text} ${styles.textCenter} ${styles.textLight}`}>
                  {t('greatefulItemsDesc')}
                </p>
              </div>
            </Grid>
            <Grid item xs={12} className={`${styles.contentSpacing} ${styles.contentWidth}`}>
              <TextField
                id="outlined-multiline-static"
                placeholder={t('writeHere')}
                multiline
                rows={5}
                variant="outlined"
                fullWidth
                value={data}
                onChange={e => {
                  setData(e.target.value);
                }}
                InputProps={{
                  // classes: { input: hintStyle.input },
                  className: `${styles.text} ${styles.textCenter} ${styles.textLight}`,
                }}
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
                disabled={isNull(data)}
              >
                {t('continue')}
              </Button>
            </Grid>
            <Grid item justifyContent="center" xs={12} sm={12} className={styles.buttonContainer}>
              <Button
                onClick={onItemClick}
                variant="text"
                className={`${styles.text} ${styles.textCenter} ${styles.textLight}`}
              >
                {' '}
                {t('skip')}
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
