import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

// styles
const styles: StyleSheet.Styles = StyleSheet.create({
  container: {
    flex: 0.7,
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
  },

  text: {
    fontSize: 20
  }
})

export default class Question extends Component {
  state = {
    toogle: false
  }

  componentWillReceiveProps() {
    this.setState({
      toogle: false
    })
  }

  render () {
    const { question, answer } = this.props

    return (
      <View style={styles.container}>
        {!this.state.toogle && (
          <Text style={styles.text}>
            {question}
          </Text>
        )}
        {this.state.toogle && (
          <Text style={styles.text}>
            {answer}
          </Text>
        )}

        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.setState({toogle: !this.state.toogle})}
        >
          {!this.state.toogle && (
              <Text style={styles.btnText}>Show answer</Text>
          )}
          {this.state.toogle && (
            <Text style={styles.btnText}>Show question</Text>
          )}
        </TouchableOpacity>
      </View>
    )
  }
}
