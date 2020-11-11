import React from 'react';
import { View,Button } from 'react-native';
import en from '../date-picker/locales/en';
import zh from '../date-picker/locales/zh';
import I18n from 'react-native-i18n';
import DatePicker from '../date-picker/index';
export default class PopupExample extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = value => {
            this.setState({ value });
        };
        this.state = {
            value: '',
        };
    }
    render() {
        return (
            <DatePicker
                value={this.state.value}
                mode="date"
                defaultDate={new Date()}
                maxDate={new Date()}
                onChange={this.onChange}
                format="YYYY-MM-DD"
            >
                <Item/>
            </DatePicker>
        );
    }
};
const Item = props =>{
    return <Button title={props.extra} onPress={props.onPress}/>
}
I18n.fallbacks = true;
I18n.translations = {
    en,zh
}
