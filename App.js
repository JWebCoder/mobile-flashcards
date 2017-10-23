import React, {Component} from 'react'

// navigation
import { StackNavigator } from 'react-navigation';

// native
import { StyleSheet, Text, View, AsyncStorage } from 'react-native'

// views
import Decks from './views/Decks'
import DeckDetails from './views/DeckDetails'

const Stack = StackNavigator({
  Decks: {
    screen: Decks
  },
  DeckDetails: {
    screen: DeckDetails
  }
})

export default class App extends Component {
  render() {
    return (
      <Stack/>
    )
  }
}

const styles: StyleSheet.Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
