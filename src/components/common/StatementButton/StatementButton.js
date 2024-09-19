/* eslint-disable max-len */
import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import styles from './StatementButton.module.scss';

const StatementButton = props => {
  const { label, icon, selected, fullIcon, ...rest } = props;
  // prettier-ignore
  const buttonClasses = `${styles.statementButton} ${styles.contained} ${selected ? styles.selected : ''}`;
  const iconClasses = `${styles.icon} ${fullIcon ? styles.iconRounded : ''}`;
  return (
    <Button
      style={{ backgroundColor: selected ? '#5fc6c4' : 'transparent' }}
      className={buttonClasses}
      variant="text"
      {...rest}
    >
      {label}
      <img src={icon} alt="icon" className={iconClasses} />
    </Button>
  );
};

StatementButton.propTypes = {
  label: PropTypes.string,
  selected: PropTypes.bool,
  fullIcon: PropTypes.bool,
  icon: PropTypes.object,
};

export default StatementButton;
