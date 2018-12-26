import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import FactorListScreen from '../screens/FactorListScreen';

const EditFactorNavigation = createStackNavigator({
  FactorList: FactorListScreen,
});

EditFactorNavigation.navigationOptions = {
  tabBarLabel: 'Income',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

export default EditFactorNavigation;
