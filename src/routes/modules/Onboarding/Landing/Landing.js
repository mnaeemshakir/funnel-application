import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import styles from './Landing.module.scss';
import Marquee from "react-fast-marquee";
import { Trans, useTranslation } from 'react-i18next';

import LandingImg from 'assets/img/onboarding/Landing.png';
import fit from 'assets/img/onboarding/fit.png';
import foucs from 'assets/img/onboarding/foucs.png';
import freundin from 'assets/img/onboarding/freundin.png';
import gq from 'assets/img/onboarding/gq.png';
import instyle from 'assets/img/onboarding/instyle.png';
import ScienceBased from 'assets/img/onboarding/ScienceBased.png';
import Tailored from 'assets/img/onboarding/Tailored.png';
import PerfectFit from 'assets/img/onboarding/PerfectFit.png';
import Ready from 'assets/img/onboarding/Ready.png';
import get_condifent_DE from 'assets/img/onboarding/get_condifent_DE.png';
import get_condifent_EN from 'assets/img/onboarding/get_condifent_EN.png';
import Less_Stress_DE from 'assets/img/onboarding/Less_Stress_DE.png';
import Less_Stress_EN from 'assets/img/onboarding/Less_Stress_EN.png';
import love_yourself_DE from 'assets/img/onboarding/love_yourself_DE.png';
import love_yourself_EN from 'assets/img/onboarding/love_yourself_EN.png';
import More_Motivation_DE from 'assets/img/onboarding/More_Motivation_DE.png';
import More_Motivation_EN from 'assets/img/onboarding/More_Motivation_EN.png';

import { fireGA4PageView } from '../../../../utils/utils';


const Landing = props => {
  const { onSelect, GA4_NAME } = props;
  const { t } = useTranslation();
  fireGA4PageView(GA4_NAME)
  const imageMap = {
    get_condifent_EN,
    get_condifent_DE,
    Less_Stress_DE,
    Less_Stress_EN,
    love_yourself_DE,
    love_yourself_EN,
    More_Motivation_DE,
    More_Motivation_EN,
  };
  return (
    <Grid container direction="row" className={styles.successRoot}>
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
              <p className={styles.heading}>
                <Trans i18nKey="learnToLiveHappier" >
                  <span className={`${styles.heading} ${styles.happier}`}></span>
                </Trans>
              </p>
              {/* <p >Happier</p> */}
            </Grid>
            <Grid item className={`${styles.imageContainer} ${styles.contentSpacing}`}>
              <img
                src={LandingImg}
                alt="checkout"
                width="70%"
                className={styles.imageLight}
              />
            </Grid>
            <Grid item xs={12} className={`${styles.contentSpacing} ${styles.contentWidth}`}>
              <p className={`${styles.text} ${styles.textCenter} ${styles.textLight}`}>
                {t('mindshineGuidedCoaching')}
              </p>
            </Grid>
          </Grid>
          <Grid xs={12}>
            <Grid item justifyContent="center" xs={12} sm={12} className={styles.buttonContainer}>
              <Button
                variant="contained"
                color="primary"
                className={`${styles.button} ${styles.contained} ${styles.buttonFullWidth}`}
                onClick={onSelect}
              >
                {t('getStarted')}
              </Button>
            </Grid>
          </Grid>
          <Grid xs={12}>
            <Marquee gradient={false} className={styles.marquee}>
              <img
                src={fit}
                alt="checkout"
                className={styles.imageStyles}
              />
              <img
                src={foucs}
                alt="checkout"
                className={styles.imageStyles}
              />
              <img
                src={freundin}
                alt="checkout"
                className={styles.imageStyles}
              />
              <img
                src={gq}
                alt="checkout"
                className={styles.imageStyles}
              />
              <img
                src={instyle}
                alt="checkout"
                className={styles.imageStyles}
              />
            </Marquee>
            <Grid item xs={12} className={`${styles.contentSpacing} ${styles.contentWidth}`}>
              <p className={`${styles.text} ${styles.textCenter} ${styles.textLight}`}>
                {t('seriesOfExercises')}
              </p>
            </Grid>
            <Grid className={styles.exerciseImages} spacing={2}>
              <Grid className={styles.imageGrid}>
                <img
                  src={imageMap[t('lessStressImg')]}
                  width="100%"
                />
              </Grid>
              <Grid className={styles.imageGrid}>
                <img
                  src={imageMap[t('getConfidentImg')]}
                  width="100%"
                />
              </Grid>
              <Grid className={styles.imageGrid}>
                <img
                  src={imageMap[t('loveYourselfImg')]}
                  width="100%"
                />
              </Grid>
              <Grid className={styles.imageGrid}>
                <img
                  src={imageMap[t('moveMotivation')]}
                  width="100%"
                />
              </Grid>
            </Grid>
            <Grid item xs={12} className={`${styles.contentSpacing} ${styles.contentWidth}`}>
              <p className={`${styles.text} ${styles.textCenter} ${styles.textLight}`}>
                {t('takeQuestionnaire')}
              </p>
            </Grid>
            <Grid item justifyContent="center" xs={12} sm={12} className={styles.buttonContainer}>
              <Button
                variant="contained"
                color="primary"
                className={`${styles.button} ${styles.contained} ${styles.buttonFullWidth}`}
                onClick={onSelect}
              >
                {t('takeQuestionnaireButton')}
              </Button>
            </Grid>
          </Grid>

        </Grid>
      </div>

      <Grid
        xs={12}
        className={styles.heightSizeContainer}
      >


        <Grid className={styles.scienceBased}>
          <Grid
            item
            xs={10}
            sm={6}
            md={4}
            lg={4}
            xl={3}
            className={`${styles.contentSpacing} ${styles.contentWidth}`}>
            <p className={styles.heading}>{t('whyItWorks')}</p>
          </Grid>
          <Grid className={styles.imageGrid}>
            <img
              src={ScienceBased}
              width="50%"
            />
          </Grid>
          <Grid
            item
            xs={10}
            sm={6}
            md={4}
            lg={4}
            xl={3}
            className={`${styles.contentSpacing} ${styles.contentWidth}`}>
            <p className={styles.smallerHeading}>{t('scienceBases')}</p>
          </Grid>


          <Grid
            item
            xs={10}
            sm={6}
            md={4}
            lg={4}
            xl={3}
            className={`${styles.contentSpacing} ${styles.contentWidth}`}>
            <p className={`${styles.text} ${styles.textCenter} ${styles.textLight}`}>
              {t('scienceText')}
            </p>
          </Grid>
        </Grid>
        <Grid className={styles.tailerMade}>
          <Grid className={styles.imageGrid}>
            <img
              src={Tailored}
              width="50%"
            />
          </Grid>
          <Grid item
            xs={10}
            sm={6}
            md={4}
            lg={4}
            xl={3} className={`${styles.contentSpacing} ${styles.contentWidth}`}>
            <p className={styles.smallerHeading}>{t('tailored')}</p>
          </Grid>


          <Grid item
            xs={10}
            sm={6}
            md={4}
            lg={4}
            xl={3} className={`${styles.contentSpacing} ${styles.contentWidth}`}>
            <p className={`${styles.text} ${styles.textCenter} ${styles.textLight}`}>
              {t('tailoredText')}
            </p>
          </Grid>
        </Grid>

        <Grid className={styles.actionableSteps}>
          <Grid className={styles.imageGrid}>
            <img
              src={PerfectFit}
              width="50%"
            />
          </Grid>
          <Grid item
            xs={10}
            sm={6}
            md={4}
            lg={4}
            xl={3} className={`${styles.contentSpacing} ${styles.contentWidth}`}>
            <p className={styles.smallerHeading}>{t('actionable')}</p>
          </Grid>


          <Grid item
            xs={10}
            sm={6}
            md={4}
            lg={4}
            xl={3} className={`${styles.contentSpacing} ${styles.contentWidth}`}>
            <p className={`${styles.text} ${styles.textCenter} ${styles.textLight}`}>
              {t('actionableText')}
            </p>
          </Grid>
        </Grid>

        <Grid className={styles.Ready}>
          <Grid className={styles.imageGrid}>
            <img
              src={Ready}
              width="50%"
            />
          </Grid>

          <Grid item
            xs={10}
            sm={6}
            md={4}
            lg={4}
            xl={3} className={`${styles.contentSpacing} ${styles.contentWidth}`}>
            <p className={`${styles.text} ${styles.textCenter} ${styles.textLight}`}>
              {t('takeQuestionnaire')}
            </p>
          </Grid>
        </Grid>

        <Grid item justifyContent="center" xs={12} sm={12} className={styles.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            className={`${styles.button} ${styles.contained} ${styles.buttonFullWidth}`}
            onClick={onSelect}
          >
            {t('takeQuestionnaireButton')}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

Landing.propTypes = {
  appreciationTexts: PropTypes.object,
  onSelect: PropTypes.func,
  GA4_NAME: PropTypes.string,
};

export default Landing;
