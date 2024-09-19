import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Success from 'assets/img/Success.png';
import FullRating from 'assets/img/FullRating.png';
// import doorImageLight from 'assets/img/onboarding/Step1.png';
import { useHistory } from 'react-router-dom';
import NavBar from 'components/common/NavBar';
import { useTranslation } from 'react-i18next';
import Lottie from 'react-lottie';
import ACCOUNT_ANIMATION from 'assets/account_animation_v3.json';
import styles from './Success.module.scss';
import ratingBoxStyles from './RatingBox.module.scss';
import { fireGA4PageView } from '../../../utils/utils';
import { GA4_SCREEN_13 } from '../../../utils/constants';

const SuccessPage = props => {
  const { loggedIn } = props;
  const history = useHistory();
  const [showGetAccess, setShowGetAccess] = React.useState(false);
  const { t } = useTranslation();
  fireGA4PageView(GA4_SCREEN_13);
  React.useEffect(() => {
    setTimeout(() => {
      setShowGetAccess(true)
    }, 6000)
  })
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: ACCOUNT_ANIMATION,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const appreciationTexts = {
    heading: t('settingUp'),
    description: t('weCanHelpYou'),
    buttonText: t('next'),
  };
  const ratings = [
    {
      name: 'Spinning wherl',
      heading: t('rating1Heading'),
      text: t('rating1Text'),
    },
    {
      name: 'Irina Dan',
      heading: t('rating2Heading'),
      text: t('rating2Text'),
    },
    {
      name: 'Lori Krieger',
      heading: t('rating3Heading'),
      text: t('rating3Text'),
    },
  ];
  if (!loggedIn) {
    history.push('/');
  }

  const onItemClick = () => {
    history.push('/about');
  };

  return (
    <Grid container direction="row" className={styles.successRoot}>
      <NavBar showLogin={false} darkText />
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
              <Lottie options={defaultOptions} loop={false} />
              <p className={styles.heading}>{appreciationTexts.heading}</p>
            </Grid>
            <Grid item xs={12} className={`${styles.contentSpacing} ${styles.contentWidth}`}>
              <p className={`${styles.text} ${styles.textCenter} ${styles.textLight}`}>
                {appreciationTexts.description}
              </p>
            </Grid>
          </Grid>
          <div className={styles.stickyBottom}>
            {showGetAccess && <Grid xs={12}>
              <Grid item justifyContent="center" xs={12} sm={12} className={styles.buttonContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  className={`${styles.button} ${styles.contained} ${styles.buttonFullWidth}`}
                  onClick={onItemClick}
                >
                  {t('getAccess')}
                </Button>
              </Grid>
            </Grid>}
          </div>
          <Grid className={styles.marginBottomReview} id="text-buttons">
            {ratings.map(item => (
              <Grid className={ratingBoxStyles.boxRoot}>
                <Grid className={ratingBoxStyles.upperBox}>
                  <img
                    src={FullRating}
                    alt="checkout"
                    // width="100%"
                    className={ratingBoxStyles.fullRating}
                  />
                  <p className={ratingBoxStyles.name}>{item.name}</p>
                </Grid>
                <Grid className={ratingBoxStyles.bottomBox}>
                  <p className={ratingBoxStyles.heading}>{item.heading}</p>
                  <p className={ratingBoxStyles.text}>{item.text}</p>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};

SuccessPage.propTypes = {
  loggedIn: PropTypes.bool,
};

export default SuccessPage;
