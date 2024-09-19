import React from 'react';
import Grid from '@material-ui/core/Grid';
// import { GAOnboardingEvent } from 'utils/gaEvents';

import OnboardingButton from 'components/common/OnboardingButton';
import PropTypes from 'prop-types';
import aLotTime from 'assets/img/onboarding/aLotTime.png';
import muchMoreTime from 'assets/img/onboarding/muchMoreTime.png';
import bitMoreTime from 'assets/img/onboarding/bitMoreTime.png';
import littleBitTime from 'assets/img/onboarding/littleBitTime.png';
import { useTranslation } from 'react-i18next';

import styles from '../Onboarding.module.scss';
import { fireGA4PageView } from '../../../../utils/utils';
import { GA4_SCREEN_12 } from '../../../../utils/constants';

const TimeAvailablilty = props => {
  const { onSelect } = props;
  const { t } = useTranslation();
  fireGA4PageView(GA4_SCREEN_12);

  const onItemClick = status => {
    // GAOnboardingEvent({ question: 'Q#2: goals', answer: status });
    if (onSelect) onSelect({ TimeAvailablilty: status });
  };
  const questionData = {
    title: t('timeAvailability'),
    subtitle: '',
    options: [
      {
        label: t('perDay'),
        icon: littleBitTime,
      },
      {
        label: t('perWeek'),
        icon: bitMoreTime,
      },
      {
        label: t('perMonth'),
        icon: muchMoreTime,
      },
      {
        label: t('more'),
        icon: aLotTime,
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

TimeAvailablilty.propTypes = {
  onSelect: PropTypes.func,
  // questionData: PropTypes.object,
};

export default TimeAvailablilty;
