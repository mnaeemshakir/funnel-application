import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
// import { GAOnboardingEvent } from 'utils/gaEvents';
import Button from '@material-ui/core/Button';

import StatementButton from 'components/common/StatementButton';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import GA4React, { useGA4React } from 'ga-4-react';

import ICON1 from 'assets/img/s_icon_1.png';
import ICON2 from 'assets/img/s_icon_2.png';
import ICON3 from 'assets/img/s_icon_3.png';
import ICON4 from 'assets/img/s_icon_4.png';
import ICON5 from 'assets/img/s_icon_5.png';
import ICON6 from 'assets/img/s_icon_6.png';

import ICON7 from 'assets/img/s_icon_7.png';
import ICON8 from 'assets/img/s_icon_8.png';
import ICON9 from 'assets/img/s_icon_9.png';
import ICON10 from 'assets/img/s_icon_10.png';
import ICON11 from 'assets/img/s_icon_11.png';

import ICON12 from 'assets/img/s_icon_12.png';

import ICON13 from 'assets/img/s_icon_13.png';
import ICON14 from 'assets/img/s_icon_14.png';
import ICON15 from 'assets/img/s_icon_15.png';
import ICON16 from 'assets/img/s_icon_16.png';
import ICON17 from 'assets/img/s_icon_17.png';

import ICON18 from 'assets/img/s_icon_18.png';
import ICON19 from 'assets/img/s_icon_19.png';
import ICON20 from 'assets/img/s_icon_20.png';
import ICON21 from 'assets/img/s_icon_21.png';
import ICON22 from 'assets/img/s_icon_22.png';

import ICON23 from 'assets/img/s_icon_23.png';
import ICON24 from 'assets/img/s_icon_24.png';
import ICON25 from 'assets/img/s_icon_25.png';
import ICON26 from 'assets/img/s_icon_26.png';
import ICON27 from 'assets/img/s_icon_27.png';

import styles from '../Onboarding.module.scss';
import { fireGA4PageView } from '../../../../utils/utils';
import { GA4_SCREEN_11 } from '../../../../utils/constants';

const IMAGES_LIST = {
  2: {
    7: ICON11,
    8: ICON10,
    9: ICON9,
    10: ICON8,
    11: ICON7,
    12: ICON5, // dots
  },
  3: {
    13: ICON6,
    14: ICON11,
    15: ICON12,
    16: ICON6,
    17: ICON5,
  },
  4: {
    18: ICON17,
    19: ICON16,
    20: ICON15,
    21: ICON14,
    22: ICON5,
    23: ICON13,
    24: ICON5,
  },
  6: {
    31: ICON22,
    32: ICON21,
    33: ICON20,
    34: ICON19,
    35: ICON18,
    36: ICON5,
  },
  7: {
    37: ICON1,
    38: ICON2,
    39: ICON3,
    40: ICON4,
    41: ICON5,
    42: ICON5,
  },
  1: {
    1: ICON6,
    2: ICON5,
    3: ICON4,
    4: ICON3,
    5: ICON2,
    6: ICON1,
    43: ICON5,
    44: ICON5,
  },
  5: {
    25: ICON27,
    26: ICON26,
    27: ICON25,
    28: ICON24,
    29: ICON23,
    30: ICON5,
  },
};

const StatementSelection = props => {
  const { statement, onSelect, values } = props;
  const [selectedOptions, setSelectedOptions] = React.useState({});
  const [anySelected, setAnySelected] = React.useState(false);
  const { t } = useTranslation();
  const onItemSelection = () => {
    if (onSelect) {
      onSelect({ Statements: getSelected() });
    }
  };

  useEffect(() => {
    fireGA4PageView(GA4_SCREEN_11);

    const options = {};
    statement?.details.forEach(item => {
      options[item.id] = { ...item, selected: values?.some(value => item.id === value) ?? false };
    });
    setSelectedOptions(options);
  }, [statement, values]);

  useEffect(() => {
    setAnySelected(Object.values(selectedOptions).some(option => option.selected));
  }, [selectedOptions]);
  const getSelected = () =>
    Object.values(selectedOptions)
      .filter(option => option.selected)
      .map(option => option.id);

  const onItemClick = item => {
    const option = selectedOptions[item?.id];
    setSelectedOptions({
      ...selectedOptions,
      [item?.id]: {
        ...option,
        selected: !option.selected,
      },
    });
  };
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
            {/* <p className={`${styles.text} ${styles.textDark}`}>{questionData.subtitle}</p> */}
          </Grid>
          {Object.values(selectedOptions).map(option => {
            return (
              <StatementButton
                key={option.text}
                label={option.text}
                selected={option.selected}
                onClick={() => onItemClick(option)}
                icon={IMAGES_LIST[option.onboarding_option_statement_id][option.id]}
              />
            );
          })}
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
              onClick={onItemSelection}
              disabled={!anySelected}
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
