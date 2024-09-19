import React from 'react';
import Grid from '@material-ui/core/Grid';
// import { GAOnboardingEvent } from 'utils/gaEvents';

import OnboardingButton from 'components/common/OnboardingButton';
import PropTypes from 'prop-types';
import veryStable from 'assets/img/onboarding/very_stable.png';
import quiteStable from 'assets/img/onboarding/quite_stable.png';
import notStable from 'assets/img/onboarding/unstable.png';
import { useTranslation } from 'react-i18next';

import styles from '../Onboarding.module.scss';
import { fireGA4PageView } from '../../../../utils/utils';
import { GA4_SCREEN_7 } from '../../../../utils/constants';

const MoodStability = props => {
  const { t } = useTranslation();
  const { onSelect } = props;
  fireGA4PageView(GA4_SCREEN_7);
  const onItemClick = status => {
    if (onSelect) onSelect({ MoodStability: status });
  };
  const questionData = {
    title: t('moodStability'),
    subtitle: '',
    options: [
      {
        label: t('veryStable'),
        icon: veryStable,
      },
      {
        label: t('quiteStable'),
        icon: quiteStable,
      },
      {
        label: t('notStable'),
        icon: notStable,
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

MoodStability.propTypes = {
  onSelect: PropTypes.func,
  // questionData: PropTypes.object,
};

export default MoodStability;
