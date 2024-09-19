import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
// import { useHistory } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
import styles from './Appreciation.module.scss';
import GA4React, { useGA4React } from "ga-4-react";
import { fireGA4PageView } from '../../../../utils/utils';


const Appreciation = props => {
  const { appreciationTexts, onSelect, GA4_NAME } = props;
  fireGA4PageView(GA4_NAME)
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
            <Grid item className={`${styles.imageContainer} ${styles.contentSpacing}`}>
              <img
                src={appreciationTexts.image}
                alt="checkout"
                width="70%"
                className={styles.imageLight}
              />
            </Grid>
            <Grid item xs={12} className={`${styles.contentSpacing} ${styles.contentWidth}`}>
              <p className={styles.heading}>{appreciationTexts.heading}</p>
            </Grid>
            <Grid item xs={12} className={`${styles.contentSpacing} ${styles.contentWidth}`}>
              <p className={`${styles.text} ${styles.textCenter} ${styles.textLight}`}>
                {appreciationTexts.description}
              </p>
              <p className={`${styles.text} ${styles.textCenter} ${styles.textLight} ${styles.textDescription}`}>
                {appreciationTexts.description2}
              </p>
            </Grid>
          </Grid>
          <Grid xs={12}>
            <Grid item justifyContent="center" xs={12} sm={12} className={styles.buttonContainer}>
              <Button
                variant="contained"
                color="primary"
                className={`${styles.button} ${styles.contained} ${styles.buttonFullWidth}`}
                onClick={onSelect}
              >
                {appreciationTexts.buttonText}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};

Appreciation.propTypes = {
  appreciationTexts: PropTypes.object,
  onSelect: PropTypes.func,
  GA4_NAME: PropTypes.string,
};

export default Appreciation;
