import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-rangeslider';
import styles from './index.module.scss';
import 'react-rangeslider/lib/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SliderComponent ({ color, handleChange, data }) {
  const [volume, setVolume] = React.useState(data);
  const  handleOnChange = (value) => {
    setVolume(value);
    handleChange(color, value);
  }
  React.useEffect(() => {
    setVolume(data);
  },[data]);

  return(
      <div className={styles.sliders}>
        <span>{color}</span>
        <Slider
          value={volume}
          min={0}
          max={255}
          orientation="horizontal"
          onChange={handleOnChange}
        />
      </div>     
    )
};

SliderComponent.propTypes = {
  color: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  data: PropTypes.number.isRequired,
};