import React, { useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  useWindowDimensions
} from 'react-native'

import { useQuiz } from './hooks'

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
    if (currentQuestionIndex === data.length - 1) {
      setCurrentQuestionIndex(0)
      append(answers)
      setAnswers([])
      navigation.navigate('Thankyou')
      return
    }

    const newAnswer = {
      question: { id: currentQuestion.id, title: currentQuestion.title },
      answer: option
    }

    setAnswers((prevAnswers) => [...prevAnswers, newAnswer])
    nextQuestion()
  }

  if (loading || !currentQuestion) {
    return (
      <View style={styles.wrapper}>
        <ActivityIndicator size={50} color='#1a75d4' />
        <Text style={styles.loadTitle}>Идет загрузка данных...</Text>
      </View>
    )
  }

  return (
    <View style={styles.wrapper}>
      <View>
        <Text style={styles.title}>{currentQuestion.title}</Text>
        {currentQuestion.options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.option}
            onPress={() => handleAnswer(option)}
          >
            <Text style={styles.questions}>{option.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}
//   return (
//     <View style={styles.wrapper}>
//       <View>
//         <Text style={styles.title}>{currentQuestion.text1}</Text>
//         {currentQuestion.options.map((option) => (
//           <TouchableOpacity
//             key={option.id}
//             style={styles.option}
//             onPress={() => handleAnswer(option)}>
//             <Text style={styles.questions}>{option.title}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// };

const useStyle = () => {
  const { height, width } = useWindowDimensions()

  const styles = StyleSheet.create({
    wrapper: {
      display: 'flex',
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      width: width,
      height: height,
      padding: 5
    },
    title: {
      padding: 20,
      textAlign: 'center',
      borderWidth: width * 0.001,
      borderColor: '#BEBEBE',
      borderRadius: width * 0.01,
      marginBottom: 24,
      fontSize: width * 0.028,
      color: '#ffff'
    },
    option: {
      width: width * 0.8,
      padding: 8,
      textAlign: 'center',
      borderWidth: width * 0.001,
      borderColor: '#BEBEBE',
      borderRadius: width * 0.01,
      marginBottom: 15,
      backgroundColor: '#20356e'
    },
    questions: {
      color: '#ffff',
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
