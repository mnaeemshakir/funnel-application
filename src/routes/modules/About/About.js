import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import NavBar from 'components/common/NavBar';
import doorImageLight from 'assets/img/about_header.png';
import Button from '@material-ui/core/Button';
import AWARD_1 from 'assets/img/award_1.png';
import AWARD_2 from 'assets/img/award_2.png';
import { useHistory } from 'react-router-dom';
import styles from './About.module.scss';
import { fireGA4PageView } from '../../../utils/utils';
import { GA4_SCREEN_15 } from '../../../utils/constants';

const About = props => {
  const { isPremium } = props;
  const { t } = useTranslation();
  const history = useHistory();

  fireGA4PageView(GA4_SCREEN_15);

  const toAppleStore = () => {
    window.open('https://apps.apple.com/us/app/mindshine-mental-fitness/id1436991158', '_blank');
  };
  const toAppStore = () => {
    window.open(
      'https://play.google.com/store/apps/details?id=app.mindshine&hl=en&gl=US',
      '_blank',
    );
  };
  const successTexts = {
    congrats: t(isPremium ? 'premiumUser' : 'unlockMindShine'),
    headToApp: t(isPremium ? 'premiumText' : 'headToApp'),
    headToApp1: t(isPremium ? 'premiumText' : 'headToApp1'),
  };

  const onItemClick = () => {
    history.push('/checkout');
  };

  return (
    <Grid container direction="row" className={styles.successRoot}>
      <NavBar type="auth" darkText />
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
          alignContent="center"
          className={styles.mainContainer}
        >
          <Grid item className={`${styles.imageContainer} ${styles.contentSpacing}`}>
            <img src={doorImageLight} alt="checkout" width="100%" className={styles.imageLight} />
          </Grid>
          <Grid item xs={12} className={`${styles.contentSpacingHeading} ${styles.contentWidth}`}>
            <p className={styles.heading}>{t('learn')}</p>
          </Grid>
          <Grid item xs={12} className={`${styles.contentSpacing} ${styles.contentWidth}`}>
            <p className={`${styles.text} ${styles.textCenter} ${styles.textLight}`}>
              {t('aboutText1')}
            </p>
            <p className={`${styles.text} ${styles.textCenter} ${styles.textLight}`}>
              {t('aboutText2')}
            </p>
            <p className={`${styles.text} ${styles.textCenter} ${styles.textLight}`}>
              {t('aboutText3')}
            </p>
          </Grid>
          <Grid
            item
            sm={12}
            container
            align="center"
            justifyContent="center"
            alignItems="center"
            className={`${styles.badgeContainer} ${styles.contentSpacing} ${styles.contentWidth}`}
          >
            <Grid item className={styles.smallImageContainer} onClick={toAppleStore}>
              <img className={styles.imageSizing} src={AWARD_1} alt="Apple store" />
            </Grid>
            <Grid className={styles.smallImageContainer} item onClick={toAppStore}>
              <img className={styles.imageSizing} src={AWARD_2} alt="Play store" />
            </Grid>
          </Grid>
          <div className={styles.stickyBottom}>
            <Grid xs={12}>
              <Grid item justifyContent="center" xs={12} sm={12} className={styles.buttonContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  className={`${styles.button} ${styles.contained} ${styles.buttonFullWidth}`}
                  onClick={onItemClick}
                >
                  {t('startLearning')}
                </Button>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </div>
    </Grid>
  );
};

About.propTypes = {
  isPremium: PropTypes.bool,
};

export default About;
