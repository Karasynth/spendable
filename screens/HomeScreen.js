import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import { WebBrowser } from 'expo';
import { StackActions, NavigationActions } from 'react-navigation';
import { MonoText } from '../components/StyledText';
import HomeCard from '../components/Home-Card';
import AppBar from '../components/AppBar';

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor() {
    super();
    this._handleIncomePress = this._handleIncomePress.bind(this);
  }
  render() {
    let totalIncoming = 0;
    let totalOutgoing = 0;
    this.props.data.map( (item, i) => {
      let matchedAmount = item.get('amount') === item.get('value');
      if (item.get('type') === 'income') {
        if (!matchedAmount) {
          totalIncoming += item.get('amount');
        }
      }
      else if (item.get('type') === 'outcome') {
        if (item.get('incremental')){
          totalOutgoing += item.get('amount') - item.get('value');
        }
        else if (!matchedAmount) {
          totalOutgoing += item.get('amount');
        };
      };
    });
    let spendable = ( this.props.balance + this.props.overdraftLimit ) + (totalIncoming - totalOutgoing);
    return (
      <View style={styles.container}>
        <AppBar 
        
        />
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={{backgroundColor: '#eee', paddingTop: 10}}>
            <HomeCard 
              image={require('../assets/images/cash-in-hand.png')}
              startText="You've got "
              valueText={"$" + spendable}
              valueStyle={{color: 'green'}}
              endText="spendable dollars!"
              onPress={null}
            />
          </View>
          <HomeCard 
            image={require('../assets/images/money.png')}
            startText="You've got "
            valueText={"$" + totalIncoming}
            valueStyle={{}}
            endText="coming in soon."
            onPress={this._handleIncomePress}
          />
          <HomeCard 
            image={require('../assets/images/bill.png')}
            startText="You've got "
            valueText={"$" + totalOutgoing}
            valueStyle={{color: '#e74c3c'}}
            endText="coming out soon."
            onPress={this._handleOutgoingPress}
          />
          <HomeCard 
            image={require('../assets/images/stack-of-money.png')}
            startText="Current Balance:"
            valueText=""
            endText=" "
            onPress={null}
          >
            <TextInput 
              value={"" + this.props.balance}
              onChangeText={this._handleBalanceChange}
              style={styles.balanceInput}
              keyboardType="number-pad"
            /> 
          </HomeCard>
          <HomeCard 
            image={require('../assets/images/receipt.png')}
            startText="Max Overdraft:"
            valueText=""
            endText=" "
            onPress={null}
          >
            <TextInput 
              value={"" + this.props.overdraftLimit}
              onChangeText={this._handleOverdraftChange}
              style={styles.balanceInput}
              keyboardType="number-pad"
            /> 
          </HomeCard>
        </ScrollView>

        {/* <View style={styles.tabBarInfoContainer}>
          <Image
            source={require('../assets/images/stack-of-money.png')}
            style={styles.balanceImage}
          />
          <View style={{marginLeft: 10,}}>
            <Text style={styles.tabBarInfoText}>Current Balance:</Text>
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

  _handleIncomePress = () => {
    const action = StackActions.push({
      routeName: 'Incoming',
      params: {
        type: 'income',
        color: "#666666",
        title: "Incoming",
        icon: require('../assets/images/money.png'),
      },
    });
    this.props.navigation.dispatch(action);
  };

  _handleOutgoingPress = () => {
    const action = StackActions.push({
      routeName: 'Incoming',
      params: {
        type: 'outcome',
        color: "#e74c3c",
        title: "Outgoing",
        icon: require('../assets/images/bill.png'),
      },
    });
    this.props.navigation.dispatch(action);
  };

  _handleBalanceChange = (val) => {
    let newValue = val? parseFloat(val) : 0;
    console.log(val);
    console.log(newValue);
    this.props.dispatch({
      data: newValue,
      type: "setBalance",
    });
  }

  _handleOverdraftChange = (val) => {
    let newValue = val? parseFloat(val) : 0;
    console.log(val);
    console.log(newValue);
    this.props.dispatch({
      data: newValue,
      type: "setOverdraft",
    });
  }

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

function select(state){
  return {
    balance: state.spendableFactors.balance,
    overdraftLimit: state.spendableFactors.overdraftLimit,
    data: state.spendableFactors.data,
  }
}

export default connect(select)(HomeScreen);

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
