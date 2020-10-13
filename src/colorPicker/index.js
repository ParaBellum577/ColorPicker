import React,{ useEffect, useState, memo } from 'react';
import { Popover, PopoverBody } from 'reactstrap';
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
  const [colorValue, setColorValue] = useState('#000000');
  const [popoverOneOpen, setPopoverOneOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
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
      return setColorValue('#'+red+green+blue);
    };
    const RGB = [];
    RGB.push(R,G,B);
    fullColorHex(RGB[0],RGB[1],RGB[2]);
  }, [R,G,B, colorValue]);

  const toggleOne = () => setPopoverOneOpen(!popoverOneOpen);
  const toggle = () => setPopoverOpen(!popoverOpen);  

  const handleChangeColor = obj => {
     const currentColor = obj.rgb.split(".");
     setColorValue(obj.value);
     setR(currentColor[0]);
     setG(currentColor[1]);
     setB(currentColor[2]);
     setPopoverOpen(false);
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

  return(
      <>
        <div className={styles.picker}>
            <div>{colorValue}</div>
            <div className={styles.blockButtons}>
              <div id="color" className={styles.color} style={{backgroundColor: colorValue}}></div>
                    <Popover
                        trigger="click"
                        placement='bottom'
                        target="color"
                        toggle={toggleOne}
                        isOpen={popoverOneOpen} >
                          <PopoverBody className={styles.popover}>  
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
                          </PopoverBody>
                    </Popover>
                <img src={arrrowIcon} id="arrow" alt="button" className={styles.popoverButton} />
                  <Popover
                    trigger="click"
                    placement='bottom'
                    target="arrow"
                    toggle={toggle}
                    isOpen={popoverOpen} >
                      <PopoverBody className={styles.popover}>
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
                      </PopoverBody>
                  </Popover>
            </div>
        </div>
      </>
    )
}

export default memo(ColorPicker);