import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions
} from 'react-native'

import { fetchAnswers, useQuiz } from './hooks'
import LinearGradient from 'react-native-linear-gradient'

const Answers = ({ questionId, onHandleAnswer }) => {
  const { styles } = useStyle()
  const [data, setData] = useState([])

  useEffect(() => {
    // Делаем запрос на список вопросов
    fetchAnswers(questionId)
      .then((response) => {
        setData(response.data)
        //console.log('Resp Ans', response)
      })
      .catch((error) => {
        console.log('AnswerComp', error)
      })
  }, [questionId])

  console.log('QUEST ID', questionId)

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
}

export const Quiz = ({ navigation }) => {
  const { styles } = useStyle()
  const [data, loading, error, append] = useQuiz()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([])

  const currentQuestion = data[currentQuestionIndex]

  const nextQuestion = () => {
    if (currentQuestionIndex === data.length - 1) {
      setCurrentQuestionIndex(0)
      return
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1)
  }

  const handleAnswer = (option) => {
    const newAnswer = {
      question: { id: currentQuestion.id, title: currentQuestion.title },
      answer: option
    }

    if (currentQuestionIndex === data.length - 1) {
      setCurrentQuestionIndex(0)
      append([...answers, newAnswer])
      setAnswers([])
      navigation.navigate('Thankyou')
    } else {
      setAnswers((prevAnswers) => [...prevAnswers, newAnswer])
      nextQuestion()
    }
  }

  if (loading || !currentQuestion) {
    return (
      <LinearGradient
        colors={['#009be5', '#fff', '#1976d3']}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <View style={styles.wrapper}>
          <ActivityIndicator size={50} color='#1a75d4' />
          <Text style={styles.loadTitle}>Идет загрузка данных...</Text>
        </View>
      </LinearGradient>
    )
  }

  return (
    <LinearGradient
      colors={['#009be5', '#fff', '#1976d3']}
      start={{ x: 1, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    >
      <View style={styles.wrapper}>
        <View>
          <Text style={styles.title}>{currentQuestion.text}</Text>
          <Answers
            questionId={currentQuestion.id}
            onHandleAnswer={handleAnswer}
          />
        </View>
      </View>
    </LinearGradient>
  )
}

const useStyle = () => {
  const { height, width } = useWindowDimensions()

  const styles = StyleSheet.create({
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: width,
      height: height,
      padding: 5
    },
    title: {
      padding: 20,
      textAlign: 'center',
      marginBottom: 24,
      fontSize: width * 0.028,
      color: '#000',
      borderRadius: width * 0.01,
      borderWidth: width * 0.002,
      borderColor: '#1a75d4'
    },
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
    loadTitle: {
      fontSize: width * 0.02,
      padding: 10,
      color: '#000'
    }
  })
  return { styles }
}
