import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Switch,
} from 'react-native';

import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {
  static defaultProps = {
    ...React.Component.defaultProps,
    image: require('../assets/images/cash-in-hand.png'),
    valueText: "$2000",
    valueStyle: {color: 'green'},
    name: "spendable dollars!",
    onPress: () => {},
    valueReceived: true
  }
  render() {
    const containerStyle = this.props.valueReceived? {opacity: 0.5} : {};
    return (
      <View style={[styles.welcomeContainer,containerStyle]}>
        <Image
          source={this.props.image}
          style={styles.welcomeImage}
        />
        <View style={{width: '58%'}}>
          <Text style={styles.getStartedText}>
            <Text style={[styles.getStartedText, this.props.valueStyle]}>
              {this.props.valueText}
            </Text>
          </Text>
          <Text style={styles.getStartedText}>
            {this.props.endText}
          </Text>
        </View>
        <View style={styles.actionContainer}>
          <Switch
            value={!this.props.valueReceived}
            trackColor="#2ecc71"
            onValueChange={() => this._update()}
          />
        </View>
      </View>
    );
  }
  _update(){
    console.log(this.props)
    let value = this.props.valueReceived? 0 : this.props.maxAmount
    this.props.onPress(value);
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  actionContainer: {
    width: 50,
    flexDirection: 'row'
  },
  welcomeContainer: {
    //alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'row'
  },
  welcomeImage: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
    marginTop: -10,
    marginLeft: 5,
    marginRight: 10,
  },
  reloadImage: {
    width: 30,
    height: 30,
    paddingLeft: 20
  },
  arrowImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: 10,
    //marginRight: 20,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    //textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
