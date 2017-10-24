import React, {Component} from 'react'
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { AppLoading } from 'expo'

// helper functions
import utils from '../helpers/utils'

// components
import Deck from '../components/Deck'

// styles
const styles: StyleSheet.Styles = StyleSheet.create({
  btn: {
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    margin: 5
  },

  btnText: {
    color: 'white'
  }
})

export default class Decks extends Component {
  state = {
    ready: false,
    decks: []
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
  })

  componentDidMount() {
    this.updateData()
  }

  updateData() {
    utils.getDecks().then(
      (decks) => {
        if (!decks) {
          return utils.rebuildDecks()
        }
        return decks
      }
    ).then(
      (decks) => {
        this.setState({
          decks,
          ready: true
        })
      }
    )
  }

  render() {
    const { ready } = this.state

    if (!ready) {
      return <AppLoading/>
    }

    return (
      <View style={{flex:1}}>
        <ScrollView style={{height: 20}}>
          {this.state.decks.map(
            (deck, index) => <Deck updater={() => this.updateData()} key={index} id={deck.id} title={deck.title} number={deck.questions.length}/>
          )}
        </ScrollView>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 40}}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.props.navigation.navigate('AddDeck', {updater:() => this.updateData()})}
          >
            <Text style={styles.btnText}>Add new deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
