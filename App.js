/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import PopupExample from './example/PopupExample'
import React,{Component} from 'react';
import {View} from 'react-native';
class App extends Component {
    render() {
        return (
            <View style={{flex:1,backgroundColor:'white'}}>
                <PopupExample/>
            </View>
        );
    }
}
export default App;
