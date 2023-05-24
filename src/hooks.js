import { useEffect, useRef, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import {
  getAnswersUrl,
  getQuestionsUrl,
  postAnswersUrl
} from './constants/Constants'

// const mapData = (payload) =>
//   payload
//     .split('\n')
//     .map((v) => v.trim())
//     .filter((v) => !v.includes('undefined') && !!v)
//     .map((v) => {
//       const [title, variants] = v.split(';')
//       const options = variants
//         .split(',')
//         .map((v, index) => ({ title: v.trim(), id: index }))
//       return { title, options }
//     })

// const mock = [
//   {
//     id: 1,
//     title: 'Часто ли вы посещаете наше заведение?',
//     options: [
//       { id: 4, title: 'Ответ 1 вопроса 1' },
//       { id: 5, title: 'Ответ 2 вопроса 1' },
//       { id: 6, title: 'Ответ 3 вопроса 1' },
//       { id: 7, title: 'Ответ 4 вопроса 1' }
//     ]
//   },
//   {
//     id: 2,
//     title: 'Понравилась ли вам еда?',
//     options: [
//       { id: 8, title: 'Ответ 1 вопроса 2' },
//       { id: 9, title: 'Ответ 2 вопроса 2' },
//       { id: 10, title: 'Ответ 3 вопроса 2' },
//       { id: 11, title: 'Ответ 4 вопроса 2' }
//     ]
//   },
//   {
//     id: 3,
//     title: 'Придете ли вы еще?',
//     options: [
//       { id: 12, title: 'Ответ 1 вопроса 3' },
//       { id: 13, title: 'Ответ 2 вопроса 3' },
//       { id: 14, title: 'Ответ 3 вопроса 3' },
//       { id: 15, title: 'Ответ 4 вопроса 3' }
//     ]
//   }
// ]

// export const fakeSend = (answers) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(answers)
//     }, 2000)
//   })
// }

// const fakeRequest = () => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(mock)
//     }, 2000)
//   })
// }

// const fakeError = () => {
//   return new Promise((_, reject) => {
//     setTimeout(() => {
//       reject('Connection error')
//     }, 2000)
//   })
// }

// {
//   headers: {authorization: `Bearer: ${token}`},
// }
//let token = await AsyncStorage.getItem('userToken');

//Запрос на получение вопросов
const fetchQuestion = async (robotId) => {
  try {
    const response = await axios.get(`${getQuestionsUrl}`, {
      params: { robotId }
    })

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
const sendAnswers = async (questionId, answerId) => {
  try {
    const data = {
      questionId,
      answerId
    }

    const response = await axios.post(`${postAnswersUrl}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log('Ответы отправлены', response.data)
  } catch (error) {
    console.log('Ошибка отправки ответов', error)
    // Обработка ошибки
  }
}

export const ANSWERS_STORAGE_KEY = 'pending-answers'
const CACHED_DATA_STORAGE_KEY = 'cached-data'

const getItem = async (key) => {
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
      const answers = await getItem(ANSWERS_STORAGE_KEY)
      // Если их нет, то логаемся и выходим из функции
      if (!answers) {
        console.log('No data to send, idle...')
        return
      }

      console.log('Found some answers, sending...', JSON.stringify(answers))
      setTimeout(() => {
        clearItem(ANSWERS_STORAGE_KEY)
      }, 5000)

      console.log('Obj Answers:', Object.values(answers))
      const data = Object.values(answers)
        .flat()
        .map((answerObj) => ({
          answerId: answerObj.answer.id,
          questionId: answerObj.question.id
        }))

      const mapAnswers = data.map((obj) => {
        return sendAnswers(obj.answerId, obj.questionId)
      })
      console.log('data:', data)
      Promise.all(mapAnswers)
        // Успешно отправили на сервер
        .then(() => {
          // Увеличиваем счетчик
          sent.current++
          console.log('Data has been sent')
          console.log('Clearing storage...')
          // Чистим хранилище так как все ответы мы уже отправили
          clearItem(ANSWERS_STORAGE_KEY)
        })
        .catch(() => {
          // Увеличиваем счетчик
          failed.current++
          console.log('Could not send data, maybe next time')
        })
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
        setData([response.data[0], response.data[1]])
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

  const getAnswers = () => {
    return fetchAnswers().then((response) => {
      //console.log('Response answers:', response)
      return response
    })
  }

  const append = async (payload) => {
    const answers = await getItem(ANSWERS_STORAGE_KEY)
    if (!answers) {
      const newAnswers = {
        [Date.now()]: payload
      }

      setItem(ANSWERS_STORAGE_KEY, newAnswers)
      return
    }

    const next = { ...answers, [Date.now()]: payload }

    setItem(ANSWERS_STORAGE_KEY, next)
  }

  useEffect(() => {
    // Делаем запрос на список вопросов
    getItem('robotData').then((value) => {
      console.log('ROBOT DATA', value.id)
      getQuestions(value.id).then((response) => {
        // Сохраняем вопросы локально
        setItem(CACHED_DATA_STORAGE_KEY, response)
      })
    })
  }, [])

  return [data, loading, error, append]
}
