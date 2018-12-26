import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {
  static defaultProps = {
    ...React.Component.defaultProps,
    image: require('../assets/images/money-bag.png'),
    title: "Spendable",
    backgroundColor: '#2ecc71'
  }
  render() {
    return (
        <View style={[styles.container, {backgroundColor: this.props.backgroundColor, maxHeight: 90}]}>
            <Image
              source={this.props.image}
              style={styles.iconImage}
            />
            <Text style={styles.titleText}>
                {this.props.title}
            </Text>
        </View>
    );
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: "row",
    height: 50,
    paddingTop: 40,
    paddingLeft: 15
  },
  iconImage: {
      width: 40,
      height: 40,
      marginRight: 10
  },
  titleText: {
      color: 'white',
      fontSize: 24,
  },
});
