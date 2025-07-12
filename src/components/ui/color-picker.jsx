import { useState } from "react";
import { Input } from 'antd';
import { ChromePicker } from 'react-color'
import OutsideClick from "./outsideClick";

import classes from "./color-picker.module.scss";

const ColorPicker = (props) => {
  const { value, onChange } = props;
  const [showPicker, setShowPicker] = useState(false);

  const handleButtonClick = () => {
    setShowPicker(true)
  }

  const onColorClicked = (event) => {
    onChange(event.hex);
  };

  const handleClose = () => {
    setShowPicker(false);
  };

  const refs = OutsideClick(handleClose);

  return (
      <div>
          <div className={ classes.swatch } onClick={ handleButtonClick } ref={ refs.button } >
            <div className={classes.color} style={{backgroundColor: value}} />
          </div>
          { showPicker && <div className={ classes.popover } ref={ refs.popover } >
              <div className={classes.cover}>
                <ChromePicker className={classes.colorPicker} color={ value } onChangeComplete={ onColorClicked } />
                <Input hidden type="text" value={ value } onChange={ onChange }/>
              </div>
          </div> }
    </div>
  );
};

export default ColorPicker;
