import React from 'react';
import {Text, TouchableWithoutFeedback, View, Modal, StyleSheet, TouchableHighlight} from 'react-native';
import PopupMixin from './PopupMixin';
const modalStyles = StyleSheet.create({
    modalContent:{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
    },
    modalOverlay: {
       flex:1,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
});
const getModal = (props: any, visible: any, { getContent, hide, onDismiss, onOk }: any) => {
  const { styles, title, okText, dismissText } = props;

  const titleEl =
    typeof title === 'string' ? (
      <Text style={[styles.title]}>{title}</Text>
    ) : (
      title
    );
  const okEl =
    typeof okText === 'string' ? (
      <Text style={[styles.actionText, styles.okText]}>{okText}</Text>
    ) : (
      okText
    );
  const dismissEl =
    typeof dismissText === 'string' ? (
      <Text style={[styles.actionText, styles.dismissText]}>{dismissText}</Text>
    ) : (
      dismissText
    );

  return (
    <Modal
      animationType="fade"
      onRequestClose={onDismiss}
      transparent={true}
      visible={visible}
    >
         <TouchableWithoutFeedback onPress={onDismiss}>
             <View style={modalStyles.modalOverlay}/>
         </TouchableWithoutFeedback>
                <View style={modalStyles.modalContent}>
                    <View style={[styles.header]}>
                        <TouchableHighlight
                            onPress={onDismiss}
                            style={[styles.headerItem]}
                            activeOpacity={props.actionTextActiveOpacity}
                            underlayColor={props.actionTextUnderlayColor}
                        >
                            {dismissEl}
                        </TouchableHighlight>
                        <View style={[styles.headerItem]}>{titleEl}</View>
                        <TouchableHighlight
                            onPress={onOk}
                            style={[styles.headerItem]}
                            activeOpacity={props.actionTextActiveOpacity}
                            underlayColor={props.actionTextUnderlayColor}
                        >
                            {okEl}
                        </TouchableHighlight>
                    </View>
                    {getContent()}
                </View>
    </Modal>
  );
};

export default PopupMixin(getModal, {
  actionTextUnderlayColor: '#ddd',
  actionTextActiveOpacity: 1,
  triggerType: 'onPress',
  styles: {},
  WrapComponent: View,
});
