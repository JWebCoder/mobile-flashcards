import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

// navigation
import { withNavigation } from 'react-navigation';

// styles
const styles: StyleSheet.Styles = StyleSheet.create({
  container: {
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5
  }
})

const Deck = ({id, title, number, updater, navigation}) => (
  <View>
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('DeckDetails', {title, id, updater})}
    >
      <Text>{title}</Text>
      <Text>{number || 0} card(s)</Text>
    </TouchableOpacity>
  </View>
)

export default withNavigation(Deck)
