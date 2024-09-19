import React from 'react';
import Grid from '@material-ui/core/Grid';
import { GAOnboardingEvent } from 'utils/gaEvents';

import OnboardingButton from 'components/common/OnboardingButton';
import PropTypes from 'prop-types';
import Perfect from 'assets/img/onboarding/Perfect.png';
import Good from 'assets/img/onboarding/good.png';
import Fine from 'assets/img/onboarding/fine.png';
import NotGood from 'assets/img/onboarding/notGood.png';
import VeryBad from 'assets/img/onboarding/verybad.png';
import { useTranslation } from 'react-i18next';

import styles from '../Onboarding.module.scss';

const MentalHealthRating = props => {
  const { onSelect } = props;
  const { t } = useTranslation();

  const onItemClick = status => {
    // GAOnboardingEvent({ question: 'Q#2: goals', answer: status });
    if (onSelect) onSelect({ MentalHealth: status });
  };
  const questionData = {
    title: t('mentalHealth'),
    subtitle: '',
    options: [
      {
        label: t('perfect'),
        icon: Perfect,
      },
      {
        label: t('good'),
        icon: Good,
      },
      {
        label: t('fine'),
        icon: Fine,
      },
      {
        label: t('notGood'),
        icon: NotGood,
      },
      {
        label: t('veryBad'),
        icon: VeryBad,
      },
    ],
  };

  return (
    <Grid container justifyContent="center" className={styles.happinessIndex}>
      <Grid
        item
        container
        justifyContent="center"
        alignContent="center"
        className={styles.container}
        spacing={2}
      >
        <Grid item xs={12}>
          <p className={styles.heading}>{questionData.title}</p>
        </Grid>
        <Grid item xs={12} className={styles.subtitleContainer}>
          <p className={`${styles.text} ${styles.textDark}`}>{questionData.subtitle}</p>
        </Grid>
        {questionData.options.map(option => {
          return (
            <OnboardingButton
              key={option.label}
              label={option.label}
              icon={option.icon}
              onClick={() => onItemClick(option.label)}
            />
          );
        })}
      </Grid>
    </Grid>
  );
};

MentalHealthRating.propTypes = {
  onSelect: PropTypes.func,
  // questionData: PropTypes.object,
};

export default MentalHealthRating;
