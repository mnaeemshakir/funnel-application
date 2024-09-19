import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
// import { GAOnboardingEvent } from 'utils/gaEvents';
import Button from '@material-ui/core/Button';

import { useTranslation } from 'react-i18next';
import AgreementSlider from 'components/common/AgreementSlider';
import PropTypes from 'prop-types';

import styles from '../Onboarding.module.scss';

const StatementSelection = props => {
  const { onSelect, values } = props;
  const { t } = useTranslation();
  const statements = [
    {
      label: t('statement1'),
      key: 1,
    },
    {
      label: t('statement2'),
      key: 2,
    },
    {
      label: t('statement3'),
      key: 3,
    },
    {
      label: t('statement4'),
      key: 4,
    },
    {
      label: t('statement5'),
      key: 5,
    },
  ];
  const [sliderValues, setSliderValues] = React.useState({
    1: 30,
    2: 30,
    3: 30,
    4: 30,
    5: 30,
  });

  const onSliderChange = (key, value) => {
    setSliderValues({ ...sliderValues, [key]: value });
  }
  const onNextClick = () => {
    onSelect({ sliderValues });
  }
  React.useEffect(() => {
    if (values)
      setSliderValues(values)
  }, [values]);

  return (
    <Grid container justifyContent="center" className={styles.happinessIndex}>
      <Grid className={styles.upperContainer}>
        <Grid
          item
          container
          justifyContent="center"
          alignContent="center"
          className={styles.container}
        // spacing={2}
        >
          <Grid item xs={12}>
            <p className={styles.heading}>{t('resoneteWithYou')}</p>
          </Grid>
          <Grid item xs={12} className={styles.subtitleContainer}>
          </Grid>
          {statements.map(statement => (
            <AgreementSlider
              key={statement.key}
              label={statement.label}
              value={sliderValues[statement.key]}
              onChange={(value) => onSliderChange(statement.key, value)}
            />
          ))}
        </Grid>

        <Grid
          xs={12}
          justifyContent="center"
          alignContent="center"
          className={styles.container}
          spacing={2}
        >
          <Grid item justifyContent="center" xs={12} sm={12} className={styles.buttonContainer}>
            <Button
              variant="contained"
              color="primary"
              className={`${styles.button} ${styles.contained} ${styles.buttonFullWidth}`}
              onClick={onNextClick}
            >
            {t('continue')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

StatementSelection.propTypes = {
  onSelect: PropTypes.func,
  // questionData: PropTypes.object,
};

export default StatementSelection;
