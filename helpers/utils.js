import { AsyncStorage } from 'react-native'
import shortid from 'shortid'
import db from './db'
import { Notifications, Permissions } from 'expo'

const FLASHDECKS = 'flashdecks'
const NOTIFICATIONS = 'notifications'

export function getDecks() {
  return AsyncStorage.getItem(FLASHDECKS).then(
    (results) => JSON.parse(results)
  )
}

export function getDeck(id) {
  return AsyncStorage.getItem(FLASHDECKS).then(
    (results) => JSON.parse(results)
  ).then(
    (cards) => cards.filter(
      card => card.id === id
    )[0]
  )
}

export function saveCard(id, question, answer) {
  return AsyncStorage.getItem(FLASHDECKS).then(
    (results) => JSON.parse(results)
  ).then(
    (cards) => cards.map(
      (card) => {
        if (card.id === id) {
          card.questions.push({question, answer})
        }
        return card
      }
    )
  ).then(
    update => rebuildDecks(update)
  )
}


export function saveDeck(name) {
  return AsyncStorage.getItem(FLASHDECKS).then(
    (results) => JSON.parse(results)
  ).then(
    (cards) => {
      const newDeck = {
        id: shortid.generate(),
        title: name,
        questions: []
      }
      cards.push(newDeck)

      return [cards, newDeck]
    }
  ).then(
    newData => {
      return AsyncStorage.removeItem(FLASHDECKS).then(
        () => AsyncStorage.setItem(FLASHDECKS, JSON.stringify(newData[0]))
      ).then(
        () => newData[1]
      )
    }
  )
}

export function rebuildDecks(update) {
  return AsyncStorage.removeItem(FLASHDECKS).then(
    () => {
      return AsyncStorage.setItem(FLASHDECKS, JSON.stringify(update || db))
    }
  ).then(
    () => {
      return getDecks()
    }
  )
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATIONS)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title: 'No more studying?',
    body: "👋 don't forget to study today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATIONS).then(
    JSON.parse
  ).then(
    (data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATIONS, JSON.stringify(true))
            }
          })
      }
    })
}

export default {
  getDecks,
  getDeck,
  rebuildDecks,
  saveCard,
  saveDeck,
  clearLocalNotification,
  setLocalNotification
}
