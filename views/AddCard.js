import React, {Component} from 'react'
import { Text, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
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
    question: '',
    answer: ''
  }
  static navigationOptions = ({ navigation }) => ({
    title: 'Add new card',
  })

  saveCard() {
    utils.saveCard(
      this.props.navigation.state.params.id,
      this.state.question,
      this.state.answer
    ).then(
      () => {
        this.props.navigation.state.params.updater(true)
      }
    )
    this.props.navigation.goBack()
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection:'row', margin: 5}}>
          <TextInput
            style={{flex:0.8, borderWidth:1, height:30, padding: 5}}
            onChangeText={(question) => this.setState({question})}
            value={this.state.question}
            placeholder='Insert the question'
          />
        </View>
        <View style={{flexDirection:'row', margin: 5}}>
          <TextInput
            style={{flex:0.8, borderWidth:1, height:30, padding: 5}}
            onChangeText={(answer) => this.setState({answer})}
            value={this.state.answer}
            placeholder='Insert the answer'
          />
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.saveCard()}
        >
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
