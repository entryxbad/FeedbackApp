import React, { useEffect, useState } from 'react'
import {
  TouchableOpacity,
  useWindowDimensions,
  StyleSheet,
  View,
  Text
} from 'react-native'
import { fetchAnswers } from './hooks'

export const Answers = ({ questionId, onHandleAnswer }) => {
  const { styles } = useStyle()
  const [data, setData] = useState([])

  useEffect(() => {
    // Делаем запрос на список ответов
    fetchAnswers(questionId)
      .then((response) => {
        setData(response.data)
        //console.log('Resp Ans', response.data)
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
    }
  })
  return { styles }
}
