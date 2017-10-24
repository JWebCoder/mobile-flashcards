import React, {Component} from 'react'
import { Text, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { AppLoading } from 'expo'

// routing
import { NavigationActions } from 'react-navigation'

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
    name: ''
  }
  static navigationOptions = ({ navigation }) => ({
    title: 'Add new deck',
  })

  saveDeck() {
    utils.saveDeck(
      this.state.name
    ).then(
      ({title, id}) => {
        this.props.navigation.state.params.updater()
        this.props.navigation.goBack()
        this.props.navigation.navigate(
          'DeckDetails',
          {title, id, updater: () => this.props.navigation.state.params.updater()}
        )
      }
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection:'row', margin: 5}}>
          <TextInput
            style={{flex:0.8, borderWidth:1, height:30, padding: 5}}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
            placeholder='Insert the deck name'
          />
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.saveDeck()}
        >
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
