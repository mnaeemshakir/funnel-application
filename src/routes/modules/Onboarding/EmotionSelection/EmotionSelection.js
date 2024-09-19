import React, { useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { GAOnboardingEvent } from 'utils/gaEvents';
import Carousel from 'react-elastic-carousel';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import styles from './EmotionSelection.module.scss';
import './EmotionSelection.css';
import mainStyles from '../Onboarding.module.scss';
import GA4React, { useGA4React } from "ga-4-react";
import { fireGA4PageView } from '../../../../utils/utils';
import { GA4_SCREEN_4 } from '../../../../utils/constants';


const EmotionSelection = props => {
  const { emotions, onSelect, values } = props;
  const [paging, setPaging] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const { t } = useTranslation();
  const carousel = useRef(null);
  const [selectedOptions, setSelectedOptions] = React.useState({});
  const [anySelected, setAnySelected] = React.useState(false);

  
  React.useEffect(() => {
    fireGA4PageView(GA4_SCREEN_4);

    const options = {};
    emotions?.forEach(item => {
      options[item.id] = { ...item, selected: values?.some(value => item.id === value) ?? false };
    });
    setSelectedOptions(options);

    // const a = [...selectedOptions];
    // const pagged = [];
    // while (a.length) {
    //   pagged.push(a.splice(0, 9));
    // }
    // setPaging(pagged);
  }, [emotions, values]);

  React.useEffect(() => {
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

  React.useEffect(() => {
    const a = [...emotions];
    const pagged = [];
    while (a.length) {
      pagged.push(a.splice(0, 9));
    }
    setPaging(pagged);
  }, [emotions, selectedOptions]);

  const onNextClick = status => {
    // GAOnboardingEvent({ question: 'Q#1: mood', answer: status });
    if (onSelect) onSelect({ mood: getSelected() });
  };
  const EmotionItem = data => {
    const { item } = data;
    const selectedItem = selectedOptions[item.id];
    return (
      <div
        key={item.id}
        style={{ borderColor: selectedItem?.selected ? '#5fc6c4' : 'transparent' }}
        className={styles.emotionButton}
        onClick={() => onItemClick(item)}
      >
        <Grid>
          <img className={styles.image} src={item.icon} />
          <p className={styles.text}>{item.name}</p>
        </Grid>
      </div>
    );
  };

  const Page = data => {
    const { pageItems } = data;
    const _pageItems = [...pageItems];
    const rows = [];
    while (_pageItems.length) {
      rows.push(_pageItems.splice(0, 3));
    }
    return (
      <div className={styles.page}>
        {rows.map(row => {
          return (
            <div className={styles.row}>
              {row.map(emotion => (
                <EmotionItem item={emotion} />
              ))}
            </div>
          );
        })}
      </div>
    );
  };

  const onChange = data => {
    const { index } = data;
    setSelectedPage(index + 1);
  };

  const onPrevIconClick = () => {
    if (selectedPage !== 1) carousel.current.slidePrev();
  };
  const onNextIconClick = () => {
    if (selectedPage !== paging.length) carousel.current.slideNext();
  };
  return (
    <Grid
      container
      justifyContent="center"
      className={`${mainStyles.happinessIndex} ${styles.EmotionSelection}`}
    >
      <Grid item justifyContent="center" className={styles.container} spacing={2}>
        <Grid item xs={12} className={styles.contentContainer}>
          <p className={styles.heading}>{t('howDoYouFeel')}</p>
          <p className={`${mainStyles.text} ${mainStyles.textCenter} ${mainStyles.textLight}`}>
          {t('howDoYouFeelDesc')}
          </p>
        </Grid>
        <Grid
          item
          container
          align="center"
          justifyContent="center"
          className={styles.badgeContainer}
        >
          <Carousel
            ref={carousel}
            onChange={onChange}
            className={styles.redcontainer}
            showArrows={false}
          >
            {paging.map(pageItems => (
              <Page pageItems={pageItems} />
            ))}
          </Carousel>
          <Grid className={styles.arrowContainer}>
            <ChevronLeftIcon
              onClick={onPrevIconClick}
              color={selectedPage === 1 ? 'disabled' : 'primary'}
              fontSize="large"
            />
            <ChevronRightIcon
              onClick={onNextIconClick}
              color={selectedPage === paging.length ? 'disabled' : 'primary'}
              fontSize="large"
            />
          </Grid>
        </Grid>
        <Grid item justifyContent="center" xs={12} sm={12} className={mainStyles.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            className={`${mainStyles.button} ${mainStyles.contained} ${mainStyles.buttonFullWidth}`}
            onClick={onNextClick}
            disabled={!anySelected}
          >
            {t('continue')}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

EmotionSelection.propTypes = {
  onSelect: PropTypes.func,
};

export default EmotionSelection;
