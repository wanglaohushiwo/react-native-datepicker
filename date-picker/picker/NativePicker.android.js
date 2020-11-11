import React from 'react';
import { PixelRatio, ScrollView, StyleSheet, Text, View } from 'react-native';
import PickerMixin from './PickerMixin';
const ratio = PixelRatio.get();
const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    left: 0,
    top: -99,
    borderColor: '#aaa',
    borderTopWidth: 1 / ratio,
    borderBottomWidth: 1 / ratio,
  },

  scrollView: {
    height: 0,
  },

  selectedItemText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },

  itemText: {
    fontSize: 20,
    color: '#aaa',
    textAlign: 'center',
  },
});
class Picker extends React.Component{
  onItemLayout = (e: any) => {
    const { height, width } = e.nativeEvent.layout;
    // console.log('onItemLayout', height);
    if (this.itemHeight !== height || this.itemWidth !== width) {
      this.itemWidth = width;
      if (this.indicatorRef) {
        this.indicatorRef.setNativeProps({
          style: [
            styles.indicator,
            {
              top: height * 3,
              height,
              width,
            },
          ],
        });
      }
    }
    if (this.itemHeight !== height) {
      this.itemHeight = height;
      if (this.scrollerRef) {
        (this.scrollerRef).setNativeProps({
          style: {
            height: height * 7,
          },
        });
      }
      if (this.contentRef) {
        this.contentRef.setNativeProps({
          style: {
            paddingTop: height * 3,
            paddingBottom: height * 3,
          },
        });
      }

      // i do no know why!...
      setTimeout(() => {
        this.props.select(
          this.props.selectedValue,
          this.itemHeight,
          this.scrollTo,
        );
      }, 0);
    }
  };

  componentDidUpdate() {
    this.props.select(this.props.selectedValue, this.itemHeight, this.scrollTo);
  }

  componentWillUnmount() {
    this.clearScrollBuffer();
  }

  clearScrollBuffer() {
    if (this.scrollBuffer) {
      clearTimeout(this.scrollBuffer);
    }
  }

  scrollTo = (y: any) => {
    if (this.scrollerRef) {
      this.scrollerRef.scrollTo({
        y,
        animated: false,
      });
    }
  };

  fireValueChange = (selectedValue: any) => {
    if (
      this.props.selectedValue !== selectedValue &&
      this.props.onValueChange
    ) {
      this.props.onValueChange(selectedValue);
    }
  };

  onScroll = (e: any) => {
    const { y } = e.nativeEvent.contentOffset;
    this.clearScrollBuffer();
    this.scrollBuffer = setTimeout(() => {
      this.clearScrollBuffer();
      this.props.doScrollingComplete(y, this.itemHeight, this.fireValueChange);
    }, 50);
  };

  render() {
    const { children, itemStyle, selectedValue, style } = this.props;
    const items = React.Children.map(children, (item: any, index) => {
      const totalStyle = [styles.itemText];
      if (selectedValue === item.props.value) {
        totalStyle.push(styles.selectedItemText);
      }
      return (
        <View
          ref={el => ((this)[`item${index}`] = el)}
          onLayout={index === 0 ? this.onItemLayout : undefined}
          key={item.key}
        >
          <Text
            style={[{ includeFontPadding: false }, totalStyle, itemStyle]}
            numberOfLines={1}
          >
            {item.props.label}
          </Text>
        </View>
      );
    });
    return (
      <View style={style}>
        <View ref={el => (this.indicatorRef = el)} style={styles.indicator} />
        <ScrollView
          style={styles.scrollView}
          ref={el => (this.scrollerRef = el)}
          onScroll={this.onScroll}
          showsVerticalScrollIndicator={false}
          overScrollMode="never"
          renderToHardwareTextureAndroid
          scrollEventThrottle={10}
          needsOffscreenAlphaCompositing
          collapsable
          horizontal={false}
          removeClippedSubviews
        >
          <View ref={el => (this.contentRef = el)}>{items}</View>
        </ScrollView>
      </View>
    );
  }
}

export default PickerMixin(Picker);
