import React from 'react';
import Slider from 'react-rangeslider';
import styles from './index.module.scss';
import 'react-rangeslider/lib/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SliderComponent = function({ color, handleChange, data }) {
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

export default SliderComponent;