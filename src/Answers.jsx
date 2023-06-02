import React, { useEffect, useState } from 'react'
import {
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
  View,
  Text,
  TextInput,
  Alert
} from 'react-native'
import { fetchAnswers } from './hooks'

export const Answers = ({ questionId, onHandleAnswer, questionType }) => {
  const { styles } = useStyle()
  const [data, setData] = useState([])
  const [answerValue, setAnswerValue] = useState('')

  useEffect(() => {
    // Делаем запрос на список ответов
    fetchAnswers(questionId)
      .then((response) => {
        setData(response.data)
        console.log('RESP ANSWERS:', response.data)
      })
      .catch((error) => {
        console.log('AnswerComp', error)
      })
  }, [questionId])

  console.log('QUEST ID', questionId)

  const checkInputSendler = () => {
    if (answerValue.trim() !== '') {
      onHandleAnswer({ text: String(answerValue) })
    } else {
      Alert.alert('Пожалуйста, заполните поле')
    }
  }

  switch (questionType) {
    case 'Мнение':
      return (
        <View>
          {data.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.option}
              onPress={() => onHandleAnswer(option)}
            >
              <Text style={styles.questions}>{option.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )
    case 'Простой вопрос':
      return (
        <View>
          <TouchableOpacity
            onPress={() => {
              onHandleAnswer({ text: String('Да') })
            }}
            style={styles.button}
          >
            <Text style={styles.title}>Да</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onHandleAnswer({ text: String('Нет') })
            }}
            style={styles.button}
          >
            <Text style={styles.title}>Нет</Text>
          </TouchableOpacity>
        </View>
      )
    case 'Возраст':
      return (
        <View>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setAnswerValue(text)}
            value={answerValue}
            placeholder='Введите ваш возраст'
            keyboardType='numeric'
            maxLength={2}
          />
          <TouchableOpacity onPress={checkInputSendler} style={styles.button}>
            <Text style={styles.title}>Отправить</Text>
          </TouchableOpacity>
        </View>
      )
    case 'Дата рождения':
      return (
        <View>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              const reg = /(\d{2})(\d{2})(\d{4})(\d{0,})/
              setAnswerValue(text.replace(reg, `$1.$2.$3`))
            }}
            value={answerValue}
            placeholder='Введите дату рождения'
            keyboardType='numeric'
            maxLength={10}
          />

          <TouchableOpacity onPress={checkInputSendler} style={styles.button}>
            <Text style={styles.title}>Отправить</Text>
          </TouchableOpacity>
        </View>
      )
    case 'Номер телефона':
      return (
        <View>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              const reg =
                /^[\d]{1}\ \([\d]{2,3}\)\ [\d]{2,3}-[\d]{2,3}-[\d]{2,3}$/
              setAnswerValue(text.replace(reg, `$1 - ($2) $3-$5-$6`))
            }}
            value={answerValue}
            placeholder='Введите номер телефона'
            keyboardType='numeric'
          />

          <TouchableOpacity onPress={checkInputSendler} style={styles.button}>
            <Text style={styles.title}>Отправить</Text>
          </TouchableOpacity>
        </View>
      )
    case 'Оценка до 5':
      return (
        <View>
          <TouchableOpacity
            onPress={() => {
              onHandleAnswer({ text: String('1') })
            }}
            style={styles.button}
          >
            <Text style={styles.title}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onHandleAnswer({ text: String('2') })
            }}
            style={styles.button}
          >
            <Text style={styles.title}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onHandleAnswer({ text: String('3') })
            }}
            style={styles.button}
          >
            <Text style={styles.title}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onHandleAnswer({ text: String('4') })
            }}
            style={styles.button}
          >
            <Text style={styles.title}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onHandleAnswer({ text: String('5') })
            }}
            style={styles.button}
          >
            <Text style={styles.title}>5</Text>
          </TouchableOpacity>
        </View>
      )
    case 'Оценка до 10':
      return (
        <View>
          <TouchableOpacity
            onPress={() => {
              onHandleAnswer({ text: String('1') })
            }}
            style={styles.button}
          >
            <Text style={styles.titleTen}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onHandleAnswer({ text: String('2') })
            }}
            style={styles.button}
          >
            <Text style={styles.titleTen}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onHandleAnswer({ text: String('3') })
            }}
            style={styles.button}
          >
            <Text style={styles.titleTen}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onHandleAnswer({ text: String('4') })
            }}
            style={styles.button}
          >
            <Text style={styles.titleTen}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onHandleAnswer({ text: String('5') })
            }}
            style={styles.button}
          >
            <Text style={styles.titleTen}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onHandleAnswer({ text: String('6') })
            }}
            style={styles.button}
          >
            <Text style={styles.titleTen}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onHandleAnswer({ text: String('7') })
            }}
            style={styles.button}
          >
            <Text style={styles.titleTen}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onHandleAnswer({ text: String('8') })
            }}
            style={styles.button}
          >
            <Text style={styles.titleTen}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onHandleAnswer({ text: String('9') })
            }}
            style={styles.button}
          >
            <Text style={styles.titleTen}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onHandleAnswer({ text: String('10') })
            }}
            style={styles.button}
          >
            <Text style={styles.titleTen}>10</Text>
          </TouchableOpacity>
        </View>
      )
    case 'email':
      return (
        <View>
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              const reg = /(^[\w-\.])+@[\w-]+\).([a-z]{2,4})$/i
              setAnswerValue(text.replace(reg, `$1@$2.$3`))
            }}
            value={answerValue}
            placeholder='Введите свой e-mail'
          />

          <TouchableOpacity onPress={checkInputSendler} style={styles.button}>
            <Text style={styles.title}>Отправить</Text>
          </TouchableOpacity>
        </View>
      )
    case 'ФИО':
      return (
        <View>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setAnswerValue(text)}
            value={answerValue}
            placeholder='Введите ФИО'
          />

          <TouchableOpacity onPress={checkInputSendler} style={styles.button}>
            <Text style={styles.title}>Отправить</Text>
          </TouchableOpacity>
        </View>
      )
    default:
      return (
        <View>
          <Text>Неизвестный тип вопроса </Text>
        </View>
      )
  }
}

const useStyle = () => {
  const { height, width } = useWindowDimensions()

  const styles = StyleSheet.create({
    option: {
      width: width * 0.8,
      padding: 8,
      textAlign: 'center',
      marginBottom: 15,
      backgroundColor: '#1a75d4',
      borderRadius: width * 0.01
    },
    questions: {
      color: '#fff',
      fontSize: width * 0.028
    },
    button: {
      backgroundColor: '#1a75d4',
      borderRadius: width * 0.01,
      width: width * 0.5,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 5
    },
    title: {
      fontSize: width * 0.028,
      padding: 10,
      color: '#ffff'
    },
    titleTen: {
      fontSize: width * 0.022,
      padding: 2,
      color: '#ffff'
    },
    input: {
      width: width * 0.5,
      height: height * 0.08,
      borderWidth: 2,
      borderRadius: width * 0.01,
      borderColor: '#B3B3B3',
      marginTop: 30,
      marginBottom: 30,
      padding: 10,
      fontSize: width * 0.015
    }
  })
  return { styles }
}
