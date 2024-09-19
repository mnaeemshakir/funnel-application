/* eslint-disable max-len */
import React from 'react';
import Box from '@material-ui/core/Box';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import styles from './AgreementSlider.module.scss';

const AgreementSlider = props => {
  const { label, onChange, value, ...rest } = props;
  const { t } = useTranslation();
  // prettier-ignore

  const CustomSlider = withStyles({
    thumb: {
      marginTop: -4,
    },
    rail: {
      opacity: 1,
      height: 4,
      backgroundImage:
        'linear-gradient(90deg, #FF9166 -0.83%, #FFD04D 23.33%, #FFE394 48.54%, #5FC6C4 74.49%, #008196 100%)',
    },
    track: {
      background: 'none',
    },
  })(Slider);

  return (
    <Grid className={styles.sliderContainer}>
      <Typography id="input-slider" gutterBottom>
        {label}
      </Typography>
      <CustomSlider size="medium" defaultValue={30} value={value} onChangeCommitted={(_, value) => onChange(value)} aria-label="Default" />
      <Grid className={styles.sliderLables}>
        <Typography gutterBottom className={styles.label}>
          {t('doNotAgree')}
        </Typography>
        <Typography gutterBottom className={styles.label}>
          {t('totallyAgree')}
        </Typography>
      </Grid>
    </Grid>
  );
};

AgreementSlider.propTypes = {
  label: PropTypes.string,
};

export default AgreementSlider;
