import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import CoverLight from 'assets/img/checkout_header.png';
import CoverDark from 'assets/img/checkout_header.png';
import CheckoutImage1 from 'assets/img/checkout_1.png';
import CheckoutImage2 from 'assets/img/checkout_2.png';
import CheckoutImage3 from 'assets/img/checkout_3.png';
import Rating from 'assets/img/4kRatings.svg';
import Downloads from 'assets/img/400PlusDownloads.svg';
import Apple from 'assets/img/AppOfTheDay.svg';
import Lock from 'assets/img/Lock.svg';
import ABOUT_MINDSHINE from 'assets/img/about_mindshine.png';
import AWARD_1 from 'assets/img/award_1.png';
import AWARD_2 from 'assets/img/award_2.png';
import PayPalLogo from 'assets/img/PayPalLogo.svg';
import Textfield from 'components/common/Textfield/Textfield';
import NavBar from 'components/common/NavBar';
import Carousel from 'react-elastic-carousel';
import PriceSwitch from 'components/common/PriceSwitch';
import FullRating from 'assets/img/FullRating.png';
import {
  fullPrice,
  stripePlanYearly,
  severity,
  off10Price,
  off20Price,
  off30Price,
  off40Price,
  off50Price,
  off60Price,
  off75Price,
  stripePlanLifeTime,
  lifetimePrice,
  lifetimeOff10Price,
  lifetimeOff20Price,
  lifetimeOff30Price,
  lifetimeOff40Price,
  lifetimeOff50Price,
  lifetimeOff60Price,
  lifetimeOff75Price,
  GA4_SCREEN_14,
} from 'utils/constants';
import {
  stripeToken,
  paypalPlanFullPriceId,
  paypalPlanOff10Id,
  paypalPlanOff20Id,
  paypalPlanOff30Id,
  paypalPlanOff40Id,
  paypalPlanOff50Id,
  paypalPlanOff60Id,
  paypalPlanOff75Id,
  paypalPlanLifeTimeId,
  paypalPlanLifeTimeOff10Id,
  paypalPlanLifeTimeOff20Id,
  paypalPlanLifeTimeOff30Id,
  paypalPlanLifeTimeOff40Id,
  paypalPlanLifeTimeOff50Id,
  paypalPlanLifeTimeOff60Id,
  paypalPlanLifeTimeOff75Id,
} from 'utils/envConstants';

import { loadStripe } from '@stripe/stripe-js';
import { PayPalButtons } from '@paypal/react-paypal-js';
import Check from 'components/common/icons/Check';

import { Elements } from '@stripe/react-stripe-js';
import {
  GAValidateCouponClickEvent,
  GAValidateCouponCompletedEvent,
  GAStripeSubscribeClickEvent,
  GAStripeSubscribeCompletedEvent,
} from 'utils/gaEvents';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import ChevronRight from '@material-ui/icons/ChevronRight';
import styles from './Checkout.module.scss';
import SplitForm from './Checkout.form';
import { fireGA4PageView, isNull } from '../../../utils/utils';
import mainStyles from '../Onboarding/Onboarding.module.scss';
import ratingBoxStyles from '../Success/RatingBox.module.scss';

const inlineStyles = {
  button: {
    textTransform: 'capitalize',
  },
};

const Checkout = props => {
  const {
    stripeCoupon,
    linkEmail,
    validateCoupon,
    setCouponState,
    percentOff,
    loggedIn,
    subscribeEmailUser,
    subscribeLoginUser,
    showSnackbar,
    uid,
    tokenType,
    client,
    expiry,
    setUserPremium,
    couponId,
    language,
    clearUserValidationCoupon,
    setUserFreshSignup,
    isPremium,
    validateUser,
    setUserPaypalToken,
    userPaypalToken,
  } = props;
  const history = useHistory();
  const { t } = useTranslation();
  const [option, setOption] = React.useState('card');
  const [discountCode, setDiscountCode] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [activeStripePlan, setActiveStripePlan] = React.useState(stripePlanYearly);
  const [activePlan, setActivePlan] = React.useState('yearly');
  const [priceList, setPriceList] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const formRef = React.createRef();
  const { initialMinute = 23, initialSeconds = 34, initialHours = 4 } = props;
  const [hours, setHours] = React.useState(initialHours);
  const [minutes, setMinutes] = React.useState(initialMinute);
  const [seconds, setSeconds] = React.useState(initialSeconds);

  React.useEffect(() => {
    fireGA4PageView(GA4_SCREEN_14);
  }, []);
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

  React.useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          setHours(hours - 1);
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  React.useEffect(() => {
    setUserFreshSignup(false);
    // if (!loggedIn) {
    //   validateCoupon({ coupon: stripeCoupon })
    //     .then(res => {
    //       const { data } = res;
    //       setCouponState({
    //         percentOff: data.percent_off,
    //         id: data.id,
    //         name: data.name,
    //         valid: data.valid,
    //       });
    //     })
    //     .catch(() => {
    //       setCouponState({
    //         percentOff: 0,
    //         id: '',
    //         name: '',
    //         valid: false,
    //       });
    //       clearUserValidationCoupon();
    //     });
    // }
  }, []);

  React.useEffect(() => {
    if (!loggedIn) {
      history.push('/');
      return;
    }
    if (isPremium) {
      navigateToSuccess();
      return;
    }
    if (!isNull(userPaypalToken)) {
      callSubscribeLoginUser(userPaypalToken, 'paypal');
    }
  }, []);

  React.useEffect(() => {
    setDiscountCode(stripeCoupon);
  }, [stripeCoupon]);

  React.useEffect(() => {
    setActiveStripePlan(activePlan === 'yearly' ? stripePlanYearly : stripePlanLifeTime);
    generatePiceList();
  }, [activePlan, language, percentOff]);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigateToLogin();
  };

  const generatePiceList = () => {
    const yearly = {
      id: 'yearly',
      price: fullPrice,
      duration: t('twelveMonths'),
      description: t('recurringPayment'),
      toogleTag: t('bestValue'),
    };
    const lifetime = {
      id: 'lifetime',
      price: lifetimePrice,
      duration: t('lifetime'),
      description: t('oneTime'),
    };

    yearly.discountPrice = discounts().yearlyOff;
    lifetime.discountPrice = discounts().lifeTimeOff;

    setPriceList([yearly, lifetime]);
  };

  const onPaypalSubscribeApprove = data => {
    const token = {
      id: data.subscriptionID,
      card: { country: '' },
    };
    handleSubscribe(token, 'paypal');
  };

  const subscriptionCreation = (data, actions, planId) => {
    return actions.subscription.create({
      plan_id: planId,
    });
  };
  const isPlanYearly = () => activePlan === 'yearly';

  const discounts = () => {
    const yearlyPlan = activePlan === 'yearly';
    switch (percentOff) {
      case 10:
        return {
          yearlyOff: off10Price,
          lifeTimeOff: lifetimeOff10Price,
          planId: yearlyPlan ? paypalPlanOff10Id : paypalPlanLifeTimeOff10Id,
        };
      case 20:
        return {
          yearlyOff: off20Price,
          lifeTimeOff: lifetimeOff20Price,
          planId: yearlyPlan ? paypalPlanOff20Id : paypalPlanLifeTimeOff20Id,
        };
      case 30:
        return {
          yearlyOff: off30Price,
          lifeTimeOff: lifetimeOff30Price,
          planId: yearlyPlan ? paypalPlanOff30Id : paypalPlanLifeTimeOff30Id,
        };
      case 40:
        return {
          yearlyOff: off40Price,
          lifeTimeOff: lifetimeOff40Price,
          planId: yearlyPlan ? paypalPlanOff40Id : paypalPlanLifeTimeOff40Id,
        };
      case 50:
        return {
          yearlyOff: off50Price,
          lifeTimeOff: lifetimeOff50Price,
          planId: yearlyPlan ? paypalPlanOff50Id : paypalPlanLifeTimeOff50Id,
        };
      case 60:
        return {
          yearlyOff: off60Price,
          lifeTimeOff: lifetimeOff60Price,
          planId: yearlyPlan ? paypalPlanOff60Id : paypalPlanLifeTimeOff60Id,
        };
      case 75:
        return {
          yearlyOff: off75Price,
          lifeTimeOff: lifetimeOff75Price,
          planId: yearlyPlan ? paypalPlanOff75Id : paypalPlanLifeTimeOff75Id,
        };
      default:
        return {
          planId: yearlyPlan ? paypalPlanFullPriceId : paypalPlanLifeTimeId,
        };
    }
  };

  const onPlanChange = plan => {
    setActivePlan(plan);
  };

  const navigateToSuccess = () => {
    setUserPremium();
    history.push('/premium');
  };

  const navigateToLogin = () => {
    history.push('/auth/login');
  };

  const handleStripeSubscribe = async () => {
    setIsLoading(true);
    GAStripeSubscribeClickEvent();
    const stripeData = await formRef.current.onSubscribe();

    const { token } = stripeData;
    if (isNull(token)) {
      showSnackbar({ message: t('invalidCardDetails'), severity: severity.error });
      setIsLoading(false);

      return;
    }
    handleSubscribe(token, 'stripe');
  };
  const onSessionTimeout = token => {
    setUserPaypalToken(token);
    handleDialogOpen(true);
  };

  const callSubscribeLoginUser = async (token, payment_provider) => {
    subscribeLoginUser({
      loginInfo: {
        tokenType,
        client,
        expiry,
        uid,
      },
      query: {
        subscription_id: token.id,
        plan: activeStripePlan,
        coupon: couponId,
        country: token.card.country,
        payment_provider,
        lifetime: !isPlanYearly(),
        currency: 'EUR',
      },
    })
      .then(res => {
        const { data } = res;
        if (data.success) {
          navigateToSuccess();
          setIsLoading(false);
        }
        setUserPaypalToken(null);
        GAStripeSubscribeCompletedEvent();
      })
      .catch(err => {
        setIsLoading(false);
        if (String(err).includes('Login Failed')) {
          onSessionTimeout(token);
          return;
        }
        setUserPaypalToken(null);
        showSnackbar({ message: err.error_message, severity: severity.error });
      });
  };

  const handleSubscribe = async (token, payment_provider) => {
    setIsLoading(true);
    if (!loggedIn) {
      validateUser({ email: linkEmail })
        .then(validation => {
          subscribeEmailUser({
            subscription_id: token.id,
            plan: activeStripePlan,
            coupon: stripeCoupon,
            email: linkEmail,
            subscription_token: validation.data.subscription_token,
            country: token.card.country,
            payment_provider,
            lifetime: !isPlanYearly(),
            currency: 'EUR',
          })
            .then(res => {
              const { data } = res;
              if (data.success) {
                navigateToSuccess();
                setIsLoading(false);
              }
            })
            .catch(err => {
              showSnackbar({ message: err.error_message, severity: severity.error });
              setIsLoading(false);
            });
        })
        .catch(err => {
          showSnackbar({ message: err.error_message, severity: severity.error });
          setIsLoading(false);
        });
    } else {
      callSubscribeLoginUser(token, payment_provider);
    }
  };

  const ValidateDiscuountCode = () => {
    GAValidateCouponClickEvent();
    validateCoupon({ coupon: discountCode })
      .then(res => {
        const { data } = res;
        setCouponState({
          percentOff: data.percent_off,
          id: data.id,
          name: data.name,
          valid: data.valid,
        });
        GAValidateCouponCompletedEvent(data.percent_off);
      })
      .catch(() => {
        showSnackbar({ message: t('invalidCoupon'), severity: severity.error });
        setDiscountCode('');
        setCouponState({
          percentOff: 0,
          id: '',
          name: '',
          valid: false,
        });
      });
  };
  const handleCodeChange = e => {
    setDiscountCode(e.target.value);
  };

  const stripePromise = loadStripe(stripeToken);

  return (
    <Grid container direction="row" className={styles.checkoutRoot}>
      <Grid item sm={12}>
        <NavBar darkText />
      </Grid>
      <Grid
        item
        container
        align="center"
        justifyContent="center"
        alignItems="center"
        className={styles.mainContainer}
      >
        <Grid item container xs={12} sm={9} md={6} className={styles.leftContainer}>
          {/* <div className={styles.}> */}
          <div className={styles.imageContainer}>
            <img src={CoverDark} alt="checkout" className={styles.imageDark} />
            <img src={CoverLight} alt="checkout" className={styles.imageLight} />
          </div>
          <Grid className={styles.textContainer}>
            <Grid className={`${styles.headerContiner} ${styles.contentContainer}`}>
              <p className={styles.heading}>
                <span>{t('dontMissOut1')}</span>
                <span style={{ color: '#5FC6C4' }}>{t('dontMissOut2')}</span>
              </p>
            </Grid>
            <Grid className={`${styles.headerContiner} ${styles.contentContainer}`}>
              <p className={styles.halfPriceText}>
                <span>{t('autumSale')}</span>
              </p>
            </Grid>
            <Grid className={`${styles.timerContainer} ${styles.contentContainer}`}>
              <p className={styles.timerText}>
                12 : 0{hours} : {minutes} : {seconds < 10 ? ` 0${seconds} ` : seconds}
              </p>
            </Grid>
            <Grid className={`${styles.headerContiner} ${styles.contentContainer}`}>
              <p className={styles.description}>{t('save')}</p>
            </Grid>
            <Grid className={styles.descriptionContainer}>
              <Carousel showArrows={false} enableAutoPlay>
                <Grid
                  item
                  xs={12}
                  alignItems="center"
                  className={`${styles.itemContainer} ${styles.contentContainer}`}
                >
                  <img src={CheckoutImage1} alt="checkout" className={styles.iconSize} />
                  <Grid>
                    <p className={styles.halfPriceTextLeft}>{t('unlimitiedRoutines')}</p>
                    <p className={styles.textSmallDescription}>{t('unlimitiedRoutinesDesc')}</p>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  alignItems="center"
                  className={`${styles.itemContainer} ${styles.contentContainer}`}
                >
                  <img src={CheckoutImage2} alt="checkout" className={styles.iconSize} />
                  <Grid>
                    <p className={styles.halfPriceTextLeft}>{t('moodTracker')}</p>
                    <p className={styles.textSmallDescription}>{t('moodTrackerDesc')}</p>
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  alignItems="center"
                  className={`${styles.itemContainer} ${styles.contentContainer}`}
                >
                  <img src={CheckoutImage3} alt="checkout" className={styles.iconSize} />
                  <Grid alignItems="center">
                    <p className={styles.halfPriceTextLeft}>{t('progrssInsights')}</p>
                    <p className={styles.textSmallDescription}>{t('progrssInsightsDesc')}</p>
                  </Grid>
                </Grid>
              </Carousel>
            </Grid>
          </Grid>
          <Grid item xs={12} className={styles.swithcContainer}>
            {/* <PriceSwitch onPlanChange={onPlanChange} priceList={priceList} discount={percentOff} /> */}
            <Button
              href="#payment"
              variant="contained"
              color="primary"
              className={`${styles.button} ${styles.contained} ${styles.buttonFullWidth}`}
              // onClick={onNextClick}
            >
              {t('price')}
            </Button>
          </Grid>
          <Grid className={`${styles.textContainer} ${styles.aboutMindshineContainer}`} id="about">
          </Grid>
        </Grid>
        <Grid
          item
          container
          xs={12}
          sm={9}
          md={6}
          className={styles.rightContainer}
          justifyContent="center"
          alignItems="center"
          align="center"
          id="payment"
        >
          <Grid item container xs={12} sm={9} spacing={0} className={styles.fromContainer}>
            <RadioGroup
              name="payment-option"
              value={option}
              onChange={({ target: { value } }) => setOption(value)}
              className={styles.radioGroup}
            >
              <div className={styles.selectionLabel}>
                <FormControlLabel value="card" control={<Radio />} label={t('creditCard')} />
                <div className={styles.labelImage}>
                  <img src={Lock} alt="Secure" />
                  <p>{t('secure')}</p>
                </div>
              </div>

              {option === 'card' ? (
                <Grid
                  item
                  container
                  spacing={2}
                  justifyContent="center"
                  className={styles.topSpacing}
                  style={{ paddingBottom: '1rem' }}
                >
                  <Grid item xs={12} sm={12}>
                    <Elements stripe={stripePromise}>
                      <SplitForm ref={formRef} />
                    </Elements>
                  </Grid>
                </Grid>
              ) : null}
              <div className={styles.divider} />
              <div className={styles.selectionLabel}>
                <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
                <img src={PayPalLogo} alt="Paypal" />
              </div>
            </RadioGroup>
            {loggedIn && <div className={styles.divider} />}

            {loggedIn && (
              <Grid
                item
                container
                justifyContent="center"
                xs={12}
                sm={12}
                className={`${styles.containerCode}`}
              >
                <Textfield
                  label=""
                  placeholder={t('discountCode')}
                  name="discountCode"
                  className={`${styles.fieldMedium} `}
                  value={discountCode}
                  onChange={handleCodeChange}
                />
                <Button
                  variant="text"
                  color="primary"
                  disabled={isLoading}
                  className={`${styles.button}`}
                  onClick={ValidateDiscuountCode}
                >
                  {t('validate')}
                </Button>
              </Grid>
            )}
            <Grid
              container
              item
              justifyContent="center"
              xs={12}
              sm={12}
              className={styles.buttonContainer}
            >
              {option === 'card' && (
                <Button
                  variant="contained"
                  color="primary"
                  className={`${styles.button} ${styles.contained} ${styles.buttonFullWidth}`}
                  disabled={isLoading}
                  onClick={handleStripeSubscribe}
                >
                  {t('subscribe')}
                </Button>
              )}
              {option === 'paypal' && (
                <div className={styles.radioGroup}>
                  <PayPalButtons
                    disabled={isLoading}
                    style={{
                      color: 'black',
                      height: 55,
                      shape: 'pill',
                      tagline: false,
                      label: 'pay',
                    }}
                    forceReRender={[percentOff]}
                    fundingSource="paypal"
                    createSubscription={(data, actions) =>
                      subscriptionCreation(data, actions, discounts().planId)
                    }
                    onApprove={onPaypalSubscribeApprove}
                  />
                </div>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={9} md={6} className={styles.footer}>
            <Grid
              item
              xs={12}
              alignItems="center"
              className={`${styles.itemContainer} ${styles.contentContainer}`}
            >
              <p className={styles.guaranteeTextTop}>{t('priceGaurntee')}</p>
              <p className={styles.guaranteeTextTop}>{t('priceGaurnteeDesc')}</p>
            </Grid>
            <p>
              {t('checkoutTermsAndContitionsStart')}{' '}
              <a href="google.com" className={styles.link}>
                {t('checkoutTermsOfService')}
              </a>{' '}
              {t('checkoutTermsAndContitionsMid')}{' '}
              <a href="google.com" className={styles.link}>
                {t('checkoutDataUsePolicy')}
              </a>{' '}
              {t('checkoutTermsAndContitionsEnd')}
            </p>

            <Grid className={styles.descriptionContainer}>
              <Carousel showArrows={false} enableAutoPlay={false}>
                <Grid className={ratingBoxStyles.boxRoot}>
                  <Grid className={ratingBoxStyles.upperBox}>
                    <img
                      src={FullRating}
                      alt="checkout"
                      // width="100%"
                      className={ratingBoxStyles.fullRating}
                    />
                    <p className={ratingBoxStyles.name}>{ratings[0].name}</p>
                  </Grid>
                  <Grid className={ratingBoxStyles.bottomBox}>
                    <p className={ratingBoxStyles.heading}>{ratings[0].heading}</p>
                    <p className={ratingBoxStyles.text}>{ratings[0].text}</p>
                  </Grid>
                </Grid>
                <Grid className={ratingBoxStyles.boxRoot}>
                  <Grid className={ratingBoxStyles.upperBox}>
                    <img
                      src={FullRating}
                      alt="checkout"
                      // width="100%"
                      className={ratingBoxStyles.fullRating}
                    />
                    <p className={ratingBoxStyles.name}>{ratings[1].name}</p>
                  </Grid>
                  <Grid className={ratingBoxStyles.bottomBox}>
                    <p className={ratingBoxStyles.heading}>{ratings[1].heading}</p>
                    <p className={ratingBoxStyles.text}>{ratings[1].text}</p>
                  </Grid>
                </Grid>
                <Grid className={ratingBoxStyles.boxRoot}>
                  <Grid className={ratingBoxStyles.upperBox}>
                    <img
                      src={FullRating}
                      alt="checkout"
                      // width="100%"
                      className={ratingBoxStyles.fullRating}
                    />
                    <p className={ratingBoxStyles.name}>{ratings[2].name}</p>
                  </Grid>
                  <Grid className={ratingBoxStyles.bottomBox}>
                    <p className={ratingBoxStyles.heading}>{ratings[2].heading}</p>
                    <p className={ratingBoxStyles.text}>{ratings[2].text}</p>
                  </Grid>
                </Grid>
              </Carousel>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose} disableEscapeKeyDown disableBackdropClick>
        <DialogTitle id="alert-dialog-title">{t('sessionExpired')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{t('relogin')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus style={inlineStyles.button}>
            {t('login')}
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

Checkout.propTypes = {
  loggedIn: PropTypes.bool,
  isPremium: PropTypes.bool,
  stripeCoupon: PropTypes.string,
  linkEmail: PropTypes.string,
  // subscriptionToken: PropTypes.string,
  validateCoupon: PropTypes.func,
  setCouponState: PropTypes.func,
  percentOff: PropTypes.number,
  subscribeLoginUser: PropTypes.func,
  subscribeEmailUser: PropTypes.func,
  showSnackbar: PropTypes.func,
  setUserPremium: PropTypes.func,
  couponId: PropTypes.string,
  uid: PropTypes.string,
  tokenType: PropTypes.string,
  client: PropTypes.string,
  expiry: PropTypes.string,
  language: PropTypes.string,
  clearUserValidationCoupon: PropTypes.func,
  setUserFreshSignup: PropTypes.func,
  validateUser: PropTypes.func,
  setUserPaypalToken: PropTypes.func,
  userPaypalToken: PropTypes.object,
};

export default Checkout;
