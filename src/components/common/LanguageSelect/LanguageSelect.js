import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import IconButton from '@material-ui/core/IconButton';
import styles from '../NavBar/NavBar.module.scss';
import { languageMap } from '../../../utils/constants';
import EN from 'assets/img/en.png';
import DE from 'assets/img/de.png';
import FLAG from 'assets/img/flag.png';
import { Grid } from '@material-ui/core';


const LanguageSelect = ({ type, darkText, setUserLanguage, language }) => {
  const selected = localStorage.getItem('i18nextLng') || 'de';
  setUserLanguage(selected);
  const [lang, setLang] = React.useState(selected);
  React.useEffect(() => {
    i18next.changeLanguage(lang);
    document.body.dir = languageMap[lang].dir;
    if (lang !== language) {
      setUserLanguage(lang);
    }
  }, [lang]);

  // prettier-ignore
  const langButtonClass = darkText
    ? styles.langBtnBlack
    : type === 'home'
      ? styles.langBtn
      : styles.langBtnBlack;
  return (
    <div>
      <IconButton
        className={langButtonClass}
        onClick={() => {
          setLang(lang === 'en' ? 'de' : 'en');
        }}
      >
        <Grid>
        <img src={lang === "en" ? DE : EN} alt="checkout" className={styles.iconSize} />
        <img src={FLAG} alt="checkout" className={styles.iconSizeArrow} />
        </Grid>
      </IconButton>
    </div>
  );
};

LanguageSelect.propTypes = {
  type: PropTypes.string,
  language: PropTypes.string,
  darkText: PropTypes.bool,
  setUserLanguage: PropTypes.func,
};

export default LanguageSelect;
