import React, {Component} from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { AppLoading } from 'expo'

// components
import Question from '../components/Question'

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
    padding: 10,
    flex: 1,
    alignItems: 'center',
    marginTop: 20
  },
  btnSuccess:{
    backgroundColor: 'green',
  },
  btnError:{
    backgroundColor: 'red',
  },
  btnText: {
    color: 'white'
  },
  title: {
    fontSize: 20
  }
})

export default class DeckDetails extends Component {
  state = {
    deck: {},
    ready: false,
    correct: 0,
    incorrect: 0,
    ended: false
  }
  static navigationOptions = ({ navigation }) => ({
    title: `Quiz`,
  })

  componentDidMount() {
    this.updateData()
  }

  updateData() {
    utils.getDeck(this.props.navigation.state.params.id).then(
      deck => {
        this.setState({deck, ready: true, questions: deck.questions})
      }
    )
  }

  end() {
    utils.clearLocalNotification().then(utils.setLocalNotification)
    this.setState({
      ended: true
    })
  }

  removeQuestion() {
    const { questions } = this.state
    questions.splice(0,1)
    this.setState({
      questions
    })
  }

  handleCorrect() {
    const { questions, correct } = this.state
    if (this.state.questions.length > 1) {
      this.removeQuestion()
    } else {
      this.end()
    }

    this.setState({
      correct: correct + 1
    })
  }

  handleIncorrect() {
    const { questions, incorrect } = this.state
    if (this.state.questions.length > 1) {
      this.removeQuestion()
    } else {
      this.end()
    }

    this.setState({
      incorrect: incorrect + 1
    })
  }

  restartQuiz() {
    this.setState({
      ready: false,
      correct: 0,
      incorrect: 0,
      ended: false
    })

    this.updateData()
  }

  goBack() {
    this.props.navigation.goBack()
  }

  render() {
    const { deck, ready, questions, correct, incorrect, ended } = this.state

    if (!ready) {
      return <AppLoading/>
    }

    if (!ended) {
      return (
        <View style={styles.container}>
          <Text>{questions.length - 1} remaining</Text>
          <Question question={questions[0].question} answer={questions[0].answer}/>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity
              style={[styles.btn, styles.btnSuccess]}
              onPress={() => this.handleCorrect()}
            >
              <Text style={styles.btnText}>Correct</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, styles.btnError]}
              onPress={() => this.handleIncorrect()}
            >
              <Text style={styles.btnText}>Incorrect</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    if (ended) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>The end</Text>
          <Text>Correct: {correct}</Text>
          <Text>Incorrect: {incorrect}</Text>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity
              style={[styles.btn, styles.btnSuccess]}
              onPress={() => this.restartQuiz()}
            >
              <Text style={styles.btnText}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, styles.btnError]}
              onPress={() => this.goBack()}
            >
              <Text style={styles.btnText}>Back to Deck</Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }
  }
}
