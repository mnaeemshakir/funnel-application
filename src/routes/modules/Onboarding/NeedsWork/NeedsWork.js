import React from 'react';
import Grid from '@material-ui/core/Grid';
import { GAOnboardingEvent } from 'utils/gaEvents';

import OnboardingButton from 'components/common/OnboardingButton';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import styles from '../Onboarding.module.scss';
import { fireGA4PageView } from '../../../../utils/utils';
import { GA4_SCREEN_9 } from '../../../../utils/constants';


const NeedsWork = props => {
  const { questionData, onSelect } = props;
  fireGA4PageView(GA4_SCREEN_9);

  const { t } = useTranslation();
  const onItemClick = status => {
    if (onSelect) onSelect({ NeedsWork: status });
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
          <p className={styles.heading}>{t('needsWork')}</p>
        </Grid>
        <Grid item xs={12} className={styles.subtitleContainer}>
          {/* <p className={`${styles.text} ${styles.textDark}`}>{questionData.subtitle}</p> */}
        </Grid>
        {questionData.options.map(option => {
          return (
            <OnboardingButton
              key={option.label}
              label={option.label}
              icon={option.image_url}
              onClick={() => onItemClick(option.id)}
            />
          );
        })}
      </Grid>
    </Grid>
  );
};

NeedsWork.propTypes = {
  onSelect: PropTypes.func,
  // questionData: PropTypes.object,
};

export default NeedsWork;
