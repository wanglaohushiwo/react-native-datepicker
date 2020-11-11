### react-native-datepicker
React Native DatePicker component for both Android and iOS having the same display effect。这个库是将ant-design for rn里的datepicker控件独立开来的一个纯js控件，核心代码没有改动，简化了原控件的使用。ant-design for rn的项目地址https://github.com/ant-design/ant-design-mobile-rn;  
使用中需要注意点如下  
1.直接把项目中的date-picker/datepicker拷到项目中就可以使用，需要安装I18n(见第二点说明)  
2.项目中使用用了I18n做多语言设置，所以得安装I18n,库地址https://github.com/AlexanderZaytsev/react-native-i18n；  
如果不要使用多语言的话，则可以将date-picker里用到I18n的地方替换成默认值就可以（date-picker/DatePicker.js,date-picker/index.js）  
3.没有解决ant-design中当选择年份过少时，滑动年份或者月份会带动其他picker滑动的bug。issue地址https://github.com/ant-design/ant-design-mobile-rn/issues/137  
4.用系统自带的modal做底部弹出效果,没有做出bottom to up的弹出效果（这个有时间再优化），使用中如果对效果不满意，可以修改date-picker/picker/Popup.js优化（原生的modal限制性太多，建议用第三方的modal替换）。  
5.DatePicker onChange回调函数的value会返回完全格式的值（2020-111T03:10:58.699Z），需要自己处理，date-picker/utils里提供了格式化的方法formatIt。  

###Example

![image](https://github.com/wanglaohushiwo/react-native-datepicker/blob/master/images/example.gif)  


### Usage

```javascript
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
            console.log("value is ",value)
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
```
### Properties
参考ant-design中datepicker的api说明https://rn.mobile.ant.design/components/date-picker-cn/
注意：DatePicker children 需要是自定义组件(组件内需处理onPress,extra属性

