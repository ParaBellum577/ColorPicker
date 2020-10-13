import React,{ useEffect, useState, memo } from 'react';
import { Popover, OverlayTrigger, Button } from 'react-bootstrap';
import SliderComponent from './slider';
import styles from './index.module.scss';

import arrrowIcon from '../icons/caret-down-solid.svg';

const ColorPicker = function() {
  const colors = [
      {color: "RED", value: '#ff0000', rgb: '255.0.0'},
      {color: "YELLOW", value: '#ffff00', rgb: '255.255.0'},
      {color: "GREEN", value: '#00ff00', rgb: '0.255.0'},
      {color: "BLUE", value: '#0000ff', rgb: '0.0.255'},
  ];
  const [value, setValue] = useState('#000000');
  const [R, setR] = useState(0);
  const [G, setG] = useState(0);
  const [B, setB] = useState(0);

  const rgbToHex = (rgb) => {
    let hex = Number(rgb).toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }
      return hex;
  };

  useEffect(() => {
    const fullColorHex = (r,g,b) => {   
      const red = rgbToHex(r);
      const green = rgbToHex(g);
      const blue = rgbToHex(b);
      return setValue('#'+red+green+blue);
    };
    const RGB = [];
    RGB.push(R,G,B);
    fullColorHex(RGB[0],RGB[1],RGB[2]);
  }, [R,G,B, value]);

  const handleClose = () => {
    document.body.click()
  };

  const handleChangeColor = obj => {
     const currentColor = obj.rgb.split(".");
     setValue(obj.value);
     setR(currentColor[0]);
     setG(currentColor[1]);
     setB(currentColor[2]);
     handleClose();
  };

  const handleChangeSlider = (color, value) => {
    if(color === 'R') {
      setR(value);
    } else if (color === 'G') {
      setG(value);
    } else {
      setB(value);
    }
  };

 const popoverSlider = (
  <Popover
    placement='bottom'
    >
      <Popover.Content className={styles.popover}>  
        <SliderComponent 
          color="R"
          handleChange={handleChangeSlider}
          data={R}
        />
        <SliderComponent 
          color="G"
          handleChange={handleChangeSlider}
          data={G}
        />
        <SliderComponent 
          color="B"
          handleChange={handleChangeSlider}
          data={B}
        />
        <div className={styles.popoverButtons}>
          <Button onClick={handleClose} variant="secondary">CANCEL</Button>
          <Button onClick={handleClose} variant="success">OK</Button>
        </div>
      </Popover.Content>
  </Popover>
 );

 const popoverColor = (
  <Popover
    trigger="click"
    placement='bottom'
    target="arrow"
    >
      <Popover.Content className={styles.popover}>
          {
            colors.map(color => {
              return (
                <div key={color.value} className={styles.popoverColors} onClick={() => handleChangeColor(color)}>
                  <div>{color.color}</div>
                  <span style={{backgroundColor: color.value}}></span>
                </div>
              )
            })
          }
      </Popover.Content>
  </Popover>
 );

  return(
      <>
        <div className={styles.picker}>
            <div>{value}</div>
            <div className={styles.blockButtons}>
            <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popoverSlider}>
              <div className={styles.color} style={{backgroundColor: value}}></div>
            </OverlayTrigger>
              <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popoverColor}>
                <img src={arrrowIcon} id="arrow" alt="button" className={styles.popoverButton} />
              </OverlayTrigger>
            </div>
        </div>
      </>
    )
}

export default memo(ColorPicker);