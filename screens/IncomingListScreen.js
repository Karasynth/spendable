import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from 'react-native';
import { WebBrowser } from 'expo';
import { connect } from 'react-redux';
import { MonoText } from '../components/StyledText';
import Card from '../components/IncomeCard';
import HomeCard from '../components/Home-Card';
import AppBar from '../components/AppBar';

class FactorListScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    let total = 0;
    let listItems = [];
    this.props.data.map( (item, i) => {
      if (item.get('type') !== 'income') {
        return;
      };
      let element = (
        <Card 
          image={require('../assets/images/money.png')}
          startText=""
          valueText={item.get('amount')}
          valueStyle={{}}
          endText={item.get('name')}
          onPress={ (val) => this._updateReceivedIncome(i, item, val) }
          valueReceived={item.get('amount') === item.get('value')}
          incremental={item.get('incremental')}
          maxAmount={item.get('amount')}
        />
      );
      listItems.push(element);
      if (item.get('amount') !== item.get('value')) {
        total += item.get('amount');
      }
    });
    return (
      <View style={styles.container}>
        <AppBar 
            title="Incoming"
            image={require('../assets/images/money.png')}
            backgroundColor="#666666"
        />
        <View style={{backgroundColor: '#eee'}}>
          <HomeCard 
            image={require('../assets/images/money-bag.png')}
            startText="Total money incoming:"
            valueText={"$" + total}
            valueStyle={{color: 'green'}}
            endText=""
            onPress={null}
          ></HomeCard>
        </View>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          {listItems}
        </ScrollView>
        {/* <View style={styles.tabBarInfoContainer}>
          <Image
            source={require('../assets/images/stack-of-money.png')}
            style={styles.balanceImage}
          />
          <View style={{marginLeft: 10,}}>
            <Text style={styles.tabBarInfoText}>Maximum Overdraft:</Text>
            <TextInput 
              value={"2000"}
              style={styles.balanceInput}
              keyboardType="number-pad"
            />
          </View>
        </View> */}
      </View>
    );
  }

  _renderList(){
   
  }

  _updateReceivedIncome = (index, item, val) => {
    this.props.dispatch({
      type: 'updateFactor',
      index,
      data: item.set("value", val)
    });
  };
}

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
    //paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  welcomeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'row'
  },
  welcomeImage: {
    width: 64,
    height: 64,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: 10,
    marginRight: 20,
  },
  balanceImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: 10,
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
    flexDirection: 'row',
    padding: 20
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
  balanceInput: {
    borderWidth: 1, 
    borderColor: "#eee", 
    borderRadius: 5, 
    width: "100%",
    backgroundColor: 'white',
    //marginLeft: 10,
    paddingLeft: 5
  },
});

function select(state){
  return {
    data: state.spendableFactors.data,
  }
}

export default connect(select)(FactorListScreen);