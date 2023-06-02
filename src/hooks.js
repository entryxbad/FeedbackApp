import { useEffect, useRef, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import {
  getAnswersUrl,
  getQuestionsUrl,
  postReviewUrl
} from './constants/Constants'

//Запрос на получение вопросов
const fetchQuestion = async (robotId) => {
  try {
    const response = await axios.get(`${getQuestionsUrl}`, {
      params: { robotId }
    })

    AsyncStorage.setItem('questionType', JSON.stringify(response.data))

    console.log('Список вопросов', response.data)
    return response
    // Дальнейшая обработка списка вопросов
  } catch (error) {
    console.log('Ошибка при получении списка вопросов', error)
    // Обработка ошибки
  }
}

//Запрос на получение ответов
export const fetchAnswers = async (questionId) => {
  try {
    const response = await axios.get(`${getAnswersUrl}`, {
      params: { questionId }
    })
    console.log('Список ответов:', response.data)
    return response
  } catch (error) {
    console.log('Ошибка получения списка ответов', error)
  }
}

//Запрос на отправку ответов
export const sendAnswers = async (
  answer,
  question,
  robotId,
  userId,
  robotName = 'test'
) => {
  try {
    const data = {
      answer,
      question,
      robotId,
      userId,
      robotName
    }
    console.log('DATA HOOKS:', data)

    const response = await axios.post(`${postReviewUrl}`, data, {
      // headers: {
      //   'Content-Type': 'application/json'
      // }
    })

    console.log('Ответы отправлены', response.data)
  } catch (error) {
    console.log('Ошибка отправки ответов', error)
    // Обработка ошибки
  }
}

export const ANSWERS_STORAGE_KEY = 'pending-answers'
const CACHED_DATA_STORAGE_KEY = 'cached-data'

export const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (!value) {
      return null
    }
    return JSON.parse(value)
  } catch (error) {
    return null
  }
}

const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.log('Ошибка сохранения в локальное хранилище')
  }
}

const clearItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (error) {
    console.log('Ошибка очистки локального хранилища')
  }
}

export const useSender = () => {
  const sent = useRef(0)
  const failed = useRef(0)

  useEffect(() => {
    async function checker() {
      console.log('Finding new answers...')
      console.log(`Sent: ${sent.current}`)
      console.log(`Failed: ${failed.current}`)
      console.log(`Total attempts: ${sent.current + failed.current}`)

      // Достаем сохраненные ответы
      // const answers = await getItem(ANSWERS_STORAGE_KEY)
      // const robotData = await getItem('robotData') // Для того что бы достать robotId и robotName

      // let robotId, robotName
      // // Если их нет, то логаемся и выходим из функции
      // if (!answers) {
      //   console.log('No data to send, idle...')
      //   return
      // }

      // if (robotData) {
      //   robotId = robotData.id
      //   robotName = robotData.name
      // }

      // console.log('Found some answers, sending...', JSON.stringify(answers))
      // console.log('DATA ROBOT...', JSON.stringify(robotData))
      // setTimeout(() => {
      //   clearItem(ANSWERS_STORAGE_KEY)
      // }, 5000)

      // const data = Object.values(answers)
      //   .flat()
      //   .map((answerObj) => ({
      //     answer: answerObj.answer.text,
      //     question: answerObj.question.text,
      //     robotId,
      //     robotName
      //   }))

      // const mapAnswers = data.map((obj) => {
      //   return sendAnswers(obj.answer, obj.question, obj.robotId, obj.robotName)
      // })
      // console.log('data:', data)
      // Promise.all(mapAnswers)
      //   // Успешно отправили на сервер
      //   .then(() => {
      //     // Увеличиваем счетчик
      //     sent.current++
      //     console.log('Data has been sent')
      //     console.log('Clearing storage...')
      //     // Чистим хранилище так как все ответы мы уже отправили
      //     clearItem(ANSWERS_STORAGE_KEY)
      //   })
      //   .catch(() => {
      //     // Увеличиваем счетчик
      //     failed.current++
      //     console.log('Could not send data, maybe next time')
      //   })
    }

    // Создаем интервал который будет слать запросы на сервер с заданной переодичностью
    const sid = setInterval(checker, 5000)
    return () => {
      clearInterval(sid)
    }
  }, [])
}

export const useQuiz = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getQuestions = (robotId) => {
    setLoading(true)
    return fetchQuestion(robotId)
      .then((response) => {
        console.log('Response from server:', response.data)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setData(response.data)
        return response
      })
      .catch((error) => {
        setError(error)
        throw error
      })
      .finally(() => {
        setLoading(false)
      })
  }

  // const append = async (payload) => {
  //   const answers = await getItem(ANSWERS_STORAGE_KEY)

  //   if (!answers) {
  //     const newAnswers = {
  //       [Date.now()]: payload
  //     }

  //     setItem(ANSWERS_STORAGE_KEY, newAnswers)
  //     return
  //   }

  //   const next = { ...answers, [Date.now()]: payload }

  //   setItem(ANSWERS_STORAGE_KEY, next)
  // }

  useEffect(() => {
    // Делаем запрос на список вопросов
    getItem('robotData').then((value) => {
      console.log('ROBOT DATA', value)
      getQuestions(value.id).then((response) => {
        // Сохраняем вопросы локально
        setItem(CACHED_DATA_STORAGE_KEY, response)
      })
    })
  }, [])

  return [data, loading, error]
}
