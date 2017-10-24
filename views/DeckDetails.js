import React, {Component} from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { AppLoading } from 'expo'

// helper functions
import utils from '../helpers/utils'

// styles
const styles: StyleSheet.Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

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

export default class DeckDetails extends Component {
  state = {
    deck: {},
    ready: false
  }
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title} details`,
  })

  componentDidMount() {
    this.updateData()
  }

  startQuiz() {
    this.props.navigation.navigate('Quiz', {id: this.state.deck.id})
  }

  updateData(booble) {
    utils.getDeck(this.props.navigation.state.params.id).then(
      deck => {
        this.setState({deck, ready: true})
        if (booble) {
          this.props.navigation.state.params.updater()
        }
      }
    )
  }

  addCard() {
    this.props.navigation.navigate('AddCard', {id: this.state.deck.id, updater: (booble) => this.updateData(booble)})
  }

  render() {
    const { deck, ready } = this.state

    if (!ready) {
      return <AppLoading/>
    }

    return (
      <View style={styles.container}>
        <Text>
          {deck.questions.length} card(s)
        </Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.startQuiz()}
        >
          <Text style={styles.btnText}>Start quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.addCard()}
        >
          <Text style={styles.btnText}>Add new question</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
