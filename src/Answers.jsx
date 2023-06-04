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

  // Функция для проверки на пустую строку
  const checkInputSendler = () => {
    if (answerValue.trim() !== '') {
      onHandleAnswer({ text: String(answerValue) })
    } else {
      Alert.alert('Пожалуйста, заполните поле')
    }
  }

  // Функция для проверки формата email
  const checkEmailFormat = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    if (emailRegex.test(answerValue)) {
      // Отправка значения, если формат email корректный
      onHandleAnswer({ text: String(answerValue) })
    } else {
      // Вывод ошибки, если формат email некорректный
      Alert.alert('Некорректный формат email-адреса')
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
              if (
                (text.length === 2 && !text.includes('.')) ||
                (text.length === 5 && !text.includes('.', 3))
              ) {
                setAnswerValue(text + '.')
              } else {
                setAnswerValue(text.replace(/[^\d.]/g, ''))
              }
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
            onChange={(event) => {
              const text = event.nativeEvent.text
              const reg = text.replace(
                /^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/,
                '+7 ($2) $3-$4-$5'
              )
              setAnswerValue(reg)
            }}
            value={answerValue}
            placeholder='Введите номер телефона'
            keyboardType='numeric'
            maxLength={18}
          />

          <TouchableOpacity onPress={checkInputSendler} style={styles.button}>
            <Text style={styles.title}>Отправить</Text>
          </TouchableOpacity>
        </View>
      )
    case 'Оценка до 5':
      const ratingColorsFive = [
        '#E53935',
        '#FF5722',
        '#FF9800',
        '#FFC107',
        '#8BC34A',
        '#4CAF50'
      ]

      return (
        <View style={styles.ratingContainer}>
          {Array.from({ length: 6 }, (_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                onHandleAnswer({ text: String(index) })
              }}
              style={[
                styles.ratingButton,
                {
                  backgroundColor:
                    ratingColorsFive[index % ratingColorsFive.length]
                }
              ]}
            >
              <Text style={styles.title}>{index}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )
    case 'Оценка до 10':
      const ratingColors = [
        '#ff0000',
        '#ff3300',
        '#ff6600',
        '#ff9900',
        '#ffcc00',
        '#f5e000',
        '#99cc00',
        '#a3cc00',
        '#80b300',
        '#669900',
        '#008000'
      ]

      return (
        <View style={styles.ratingContainer}>
          {Array.from({ length: 11 }, (_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                onHandleAnswer({ text: String(index) })
              }}
              style={[
                styles.ratingButtonTen,
                { backgroundColor: ratingColors[index % ratingColors.length] }
              ]}
            >
              <Text style={styles.titleTen}>{index}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )
    case 'email':
      return (
        <View>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setAnswerValue(text)}
            value={answerValue}
            placeholder='Введите свой e-mail'
          />

          <TouchableOpacity onPress={checkEmailFormat} style={styles.button}>
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
    },
    ratingContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 10,
      marginBottom: 10
    },
    ratingButton: {
      width: width * 0.1,
      height: height * 0.15,
      marginHorizontal: 5,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center'
    },
    ratingButtonTen: {
      width: width * 0.08,
      height: height * 0.15,
      marginHorizontal: 5,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center'
    },
    ratingButtonText: {
      fontSize: width * 0.03,
      color: '#FFF'
    }
  })
  return { styles }
}
