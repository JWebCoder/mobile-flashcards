import React, {Component} from 'react'

// navigation
import { StackNavigator } from 'react-navigation';

// native
import { StyleSheet, Text, View, AsyncStorage, StatusBar, Platform } from 'react-native'
import { Constants } from 'expo'

// utils
import { setLocalNotification } from './helpers/utils'

// views
import Decks from './views/Decks'
import DeckDetails from './views/DeckDetails'
import AddCard from './views/AddCard'
import AddDeck from './views/AddDeck'
import Quiz from './views/Quiz'

const Stack = StackNavigator({
  Decks: {
    screen: Decks
  },
  DeckDetails: {
    screen: DeckDetails
  },
  AddCard: {
    screen: AddCard
  },
  Quiz: {
    screen: Quiz
  },
  AddDeck: {
    screen: AddDeck
  }
}, {
  cardStyle: {
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  }
})

export default class App extends Component {

  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Stack/>
      </View>
    )
  }
}
