import PropTypes from 'prop-types';
import React,{Component} from 'react';
import PickerStyles from './picker/style/index';
import AntDatePicker from './datepicker/DatePicker';
import PopupDatePicker from './datepicker/Popup';
import { formatProps } from './utils';
import I18n from 'react-native-i18n';
export default class DatePicker extends Component{
    static defaultProps = {
        mode: 'datetime',
        triggerType: 'onPress',
        minuteStep: 1,
    };
    render() {
        const { children, value, defaultDate, itemStyle, ...restProps } = this.props;
        const okText = I18n.t("okText");
        const dismissText = I18n.t("dismissText");
        const extra = I18n.t("extra");
        const dataPicker = (
            <AntDatePicker
                minuteStep={this.props.minuteStep}
                mode={this.props.mode}
                minDate={this.props.minDate}
                maxDate={this.props.maxDate}
                defaultDate={defaultDate}
                date={value}
                onValueChange={this.props.onValueChange}
                itemStyle={itemStyle}
            />
        );
        const defaultPickereStyles = PickerStyles();
        return (
                    <PopupDatePicker
                        datePicker={dataPicker}
                        {...restProps}
                        styles={{...restProps.styles, ...defaultPickereStyles}}
                        date={value}
                        dismissText={this.props.dismissText || dismissText}
                        okText={this.props.okText || okText}
                    >
                        {children &&
                        React.isValidElement(children) &&
                        React.cloneElement(children, {
                            extra: value
                                ? formatProps(this.props, value)
                                : this.props.extra || extra,
                        })}
                    </PopupDatePicker>
        );
    }
}
