import React from 'react';
import Grid from '@material-ui/core/Grid';
import NavBar from 'components/common/NavBar';
import SuspenseLoader from 'components/common/SuspenseLoader';
import Step1 from 'assets/img/onboarding/Step1.png';
import Step2 from 'assets/img/onboarding/Step2.png';
import Step3 from 'assets/img/onboarding/Step3.png';
import Step4 from 'assets/img/onboarding/Step4.png';

import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ChevronLeft } from '@material-ui/icons';

import { signup } from 'api/signup';
import HappinessIndex from './HappinessIndex/HappinessIndex';
import Appreciation from './Appreciation';
import Landing from './Landing';

import styles from './Onboarding.module.scss';
import { GA4_SCREEN_0, GA4_SCREEN_1, GA4_SCREEN_2, languageMap, severity } from '../../../utils/constants';
import MentalHealthRating from './MentalHealthRating/MentalHealthRating';
import MoodStability from './MoodStability/MoodStability';
import TimeAvailablilty from './TimeAvailablilty/TimeAvailablilty';
import NeedsWork from './NeedsWork/NeedsWork';
import StatementSelection from './StatementSelection/StatementSelection';
import FeelingSlider from './FeelingSlider/FeelingSlider';
import GreatfulItemEntry from './GreatfulItemEntry';
import NameEntry from './NameEntry';
import PasswordEntry from './PasswordEntry';
import EmailEntry from './EmailEntry';
import EmotionSelection from './EmotionSelection/EmotionSelection';
import { fireGA4PageView, isNull } from '../../../utils/utils';
import { setToStorage } from '../../../utils/storage';
import { useTranslation } from 'react-i18next';

const Onboarding = props => {
  const {
    loggedIn,
    getQuestionsAPI,
    getStatementsAPI,
    getQuestionResponseAPI,
    getEmotionsAPI,
    // setTrainingDaysAPI,
    uid,
    tokenType,
    client,
    expiry,
    language,
    showSnackbar,
    setUserState
  } = props;
  const history = useHistory();
  const [panel, setPanel] = React.useState(1);
  const [statements, setStatements] = React.useState([]);
  const [statementsGerman, setStatementsGerman] = React.useState([]);
  const [questions, setQuestions] = React.useState([]);
  const [questionsGerman, setQuestionsGerman] = React.useState([]);
  const [emotions, setEmotions] = React.useState([]);
  const [emotionsGerman, setEmotionsGerman] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const [successTexts, setSuccessTexts] = React.useState({});
  const [successTextsGerman, setSuccessTextsGerman] = React.useState({});
  const [languageSuccessTexts, setLanguageSuccessTexts] = React.useState({});
  const [isFinalized, setIsFinalized] = React.useState(false);
  const [languageQuestions, setLanguageQuestions] = React.useState([]);
  const [languageStatements, setLanguageStatements] = React.useState([]);
  const [languageEmotions, setLanguageEmotions] = React.useState([]);
  const [withEmail, setWithEmail] = React.useState(false);
  const { t } = useTranslation();

  React.useEffect(() => {
    if (loggedIn) {
      history.push('/');
      return;
    }
    fireGA4PageView(GA4_SCREEN_0);
    setIsLoading(true);
    getStatementsAPI(languageMap.en.value)
      .then(res => {
        const { data } = res;
        const updatedData = data.reduce((result, statement) => {
          result[statement.onboarding_option_id] = {
            ...statement,
          };
          return result;
        }, {});
        setStatements(updatedData);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
    getStatementsAPI(languageMap.de.value)
      .then(res => {
        const { data } = res;
        const updatedData = data.reduce((result, statement) => {
          result[statement.onboarding_option_id] = {
            ...statement,
          };
          return result;
        }, {});
        setStatementsGerman(updatedData);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });

    getQuestionsAPI(languageMap.en.value)
      .then(res => {
        const { data } = res;
        setQuestions(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });

    getQuestionsAPI(languageMap.de.value)
      .then(res => {
        const { data } = res;
        setQuestionsGerman(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });

    getEmotionsAPI(languageMap.en.value)
      .then(res => {
        const { data } = res;
        setEmotions(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });

    getEmotionsAPI(languageMap.de.value)
      .then(res => {
        const { data } = res;
        setEmotionsGerman(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  // React.useEffect(() => {
  //   if (panel === 7) {
  //     setIsFinalized(true);
  //     getQuestionResponse();
  //   }
  // }, [panel]);

  React.useEffect(() => {
    setLanguageQuestions(language === languageMap.de.value ? questionsGerman : questions);
  }, [language, questionsGerman, questions]);

  React.useEffect(() => {
    setLanguageStatements(language === languageMap.de.value ? statementsGerman : statements);
  }, [language, statements, statementsGerman]);

  React.useEffect(() => {
    setLanguageSuccessTexts(language === languageMap.de.value ? successTextsGerman : successTexts);
  }, [language, successTexts, successTextsGerman]);

  React.useEffect(() => {
    setLanguageEmotions(language === languageMap.de.value ? emotionsGerman : emotions);
  }, [language, emotions, emotionsGerman]);
  React.useEffect(() => {
    //console.log('userData', userData);
  }, [userData]);

  const incrementPanel = () => {
    if (panel === 16) {
      // signupWithEmail();
      return;
    }
    setPanel(panel + 1);
  };
  const decrementPanel = () => {
    setPanel(panel > 1 ? panel - 1 : 1);
  };
  const updateUserData = status => {
    setUserData({ ...userData, ...status });
    incrementPanel();
  };

  const onEmailEntry = status => {
    updateUserData(status);
    signupWithEmail(userData.Name, status.Email, userData.Password);
  }
  const getReleventQuestion = type => {
    return languageQuestions?.find(element => element.key === type) ?? [];
  };

  const handleBackButton = () => {
    if (panel === 6) {
      if (withEmail) {
        setWithEmail(false);
        return;
      }
    }
    decrementPanel();
  };

  const onSignupComplete = () => {
    // incrementPanel();
    history.push('/');
  };

  const signupWithEmail = (name, email, password) => {
    signup({ first_name: name, email, password })
      .then(res => {
        const { loggedIn, data, loginInfo } = res;
        if (loggedIn) {
          setUserState({
            email: data.email,
            firstName: data.first_name,
            subscriptionPlan: data.subscription_plan,
            uid: loginInfo.uid,
            tokenType: loginInfo.tokenType,
            client: loginInfo.client,
            expiry: loginInfo.expiry,
            freshSignup: true,
          });
          if (!isNull(loginInfo.accessToken)) {
            setToStorage('token', loginInfo.accessToken);
          }
          onSignupComplete();

        }
      })
      .catch(err => {
        let message = '';
        const { errors } = err;
        message = errors?.full_messages[0] ?? '';
        showSnackbar({ message, severity: severity.error });
      });
  };

  const appreciationTexts = {
    Step1: {
      image: Step1,
      heading: t('thanks'),
      description: t('appriciationStep1'),
      description2: t('appriciationStep1Message2'),
      buttonText: t('buttonStep1'),
    },
    Step2: {
      image: Step2,
      heading: t('thanks'),
      description: t('appriciationStep2'),
      buttonText: t('buttonStep2'),
    },
    Step3: {
      image: Step3,
      heading: t('titleStep3'),
      description: t('appriciationStep3'),
      buttonText: t('buttonStep3'),
    },
    Step4: {
      image: Step4,
      heading: t('titleStep4'),
      description: t('appriciationStep4'),
      buttonText: t('buttonStep4'),
    },
  };
  return (
    <Grid container justifyContent="center" className={`${styles.onboardingRoot}`}>
      <NavBar showLogin={!isFinalized} darkText />
      {!(panel === 1 || isFinalized) && (
        <Grid className={`${styles.backContiner}`}>
          <ChevronLeft
            fontSize="large"
            className={`${styles.backButton}`}
            onClick={handleBackButton}
          />
        </Grid>
      )}
      <Grid
        item
        container
        xs={10}
        sm={6}
        md={6}
        lg={3}
        justifyContent="center"
        alignContent="center"
        className={styles.container}
        spacing={2}
      >
        {isLoading && (
          <div className={styles.loadingContainer}>
            <SuspenseLoader />
          </div>
        )}
        <div style={{ height: '100%' }}>
          {
            {
              1: (
                <Landing
                  appreciationTexts={appreciationTexts.Step1}
                  onSelect={incrementPanel}
                  // GA4_NAME={GA4_SCREEN_1}
                />
              ),
              2: <MentalHealthRating onSelect={updateUserData} />,
              3: (
                <MoodStability
                  onSelect={updateUserData}
                />
              ),
              4: <TimeAvailablilty onSelect={updateUserData} />,
              5: (
                <Appreciation
                  appreciationTexts={appreciationTexts.Step1}
                  onSelect={incrementPanel}
                  GA4_NAME={GA4_SCREEN_1}
                />
              ),
              6: (
                <NeedsWork
                  values={userData.NeedsWork}
                  onSelect={updateUserData}
                  questionData={getReleventQuestion('goals')}
                />
              ),
              7: (
                <StatementSelection
                  values={userData.Statements}
                  onSelect={updateUserData}
                  statement={languageStatements[userData?.NeedsWork]}
                />
              ),
              8: <HappinessIndex onSelect={updateUserData} />,
              9: <EmotionSelection onSelect={updateUserData} emotions={languageEmotions} />,

              10: <GreatfulItemEntry onSelect={updateUserData} value={userData.GreatfulItemEntry} />,
              11: (
                <Appreciation
                  appreciationTexts={appreciationTexts.Step4}
                  onSelect={incrementPanel}
                  GA4_NAME={GA4_SCREEN_2}
                />
              ),
              12: <NameEntry onSelect={updateUserData} value={userData.Name} />,
              13: <PasswordEntry onSelect={updateUserData} value={userData.Password} />,
              14: <EmailEntry onSelect={onEmailEntry} value={userData.Email} />,
            }[panel]
          }
        </div>
      </Grid>
    </Grid>
  );
};

Onboarding.propTypes = {
  getQuestionsAPI: PropTypes.func,
  getEmotionsAPI: PropTypes.func,
  getQuestionResponseAPI: PropTypes.func,
  setTrainingDaysAPI: PropTypes.func,
  uid: PropTypes.string,
  tokenType: PropTypes.string,
  client: PropTypes.string,
  expiry: PropTypes.string,
  language: PropTypes.string,
  loggedIn: PropTypes.bool,
  setUserState: PropTypes.func,
};

export default Onboarding;
