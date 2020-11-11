import React from 'react';
import PopupPicker from '../picker/Popup';
class PopupDatePicker extends React.Component{
  static defaultProps = {
    pickerValueProp: 'date',
    pickerValueChangeProp: 'onDateChange',
  };

  onOk = (v: any) => {
    const { onChange, onOk } = this.props;
    if (onChange) {
      onChange(v);
    }
    if (onOk) {
      onOk(v);
    }
  }

  render() {
    return (<PopupPicker
      picker={this.props.datePicker}
      value={this.props.date}
      {...this.props}
      onOk={this.onOk}
    />);
  }
}

export default PopupDatePicker;
