import { useEffect, useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { getItem, sendAnswers, useQuiz } from '../hooks'
import { loadRobotDataFromStorage } from '../utils/storageUtils'
import { Answers } from './Answers'
import Preloader from './Preloader'

export const Quiz = ({ navigation }) => {
  const [data, loading, error, append] = useQuiz()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  // const [answers, setAnswers] = useState([])
  const [robotData, setRobotData] = useState(null)

  useEffect(() => {
    const fetchRobotData = async () => {
      const data = await loadRobotDataFromStorage()
      setRobotData(data)
    }
    fetchRobotData()
  }, [])

  const currentQuestion = data[currentQuestionIndex]

  const nextQuestion = () => {
    if (currentQuestionIndex === data.length - 1) {
      setCurrentQuestionIndex(0)
      return
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1)
  }

  const handleAnswer = async (answer) => {
    const robotData = await getItem('robotData') // Для того что бы достать robotId и robotName

    console.log('ROBOTDATAAAAA:', robotData)

    let robotId, robotName, question, userId

    answer = answer.text

    if (robotData) {
      robotId = robotData.id
      userId = robotData.userId
      robotName = 'test'
    }

    question = data[currentQuestionIndex].text

    console.log('ANSWER:', answer)

    try {
      await sendAnswers(answer, question, robotId, userId, robotName)
    } catch (error) {
      console.log('Ошибка отправки ответа', error)
    } finally {
      if (currentQuestionIndex === data.length - 1) {
        navigation.navigate('Thankyou')
      } else {
        nextQuestion()
      }
    }
  }

  // Preloader
  if (loading || !currentQuestion) {
    return <Preloader />
  }

  console.log('CURRENT:', currentQuestion)

  return (
    <LinearGradient
      className='flex-1 relative'
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={['#3490f3', '#4283f1', '#5175ed']}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior='height'
          className='flex-1 w-full h-full justify-center items-center p-1'
        >
          <View>
            <Text className='rounded-xl text-4xl text-center mb-6 p-5 border-2 text-white border-white font-RoundedNormal'>
              {currentQuestion.text}
            </Text>
            <Answers
              questionId={currentQuestion.id}
              onHandleAnswer={handleAnswer}
              questionType={currentQuestion.type}
              onSkip={nextQuestion}
              key={currentQuestion.id}
            />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </LinearGradient>
  )
}
