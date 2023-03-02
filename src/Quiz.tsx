import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {useQuiz} from './hooks';

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    backgroundColor: '#112e80',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: 5,
  },
  title: {
    padding: 20,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#BEBEBE',
    borderRadius: 5,
    marginBottom: 24,
    fontSize: 25,
    color: '#ffff',
  },
  option: {
    padding: 8,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#BEBEBE',
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#20356e',
  },
  questions: {
    color: '#ffff',
    fontSize: 20,
  },
  loadTitle: {
    fontSize: 25,
    padding: 10,
    color: '#ffff',
  },
});

export const Quiz = ({navigation}) => {
  const [data, loading, error, append] = useQuiz();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  const currentQuestion = data[currentQuestionIndex];

  const nextQuestion = () => {
    if (currentQuestionIndex === data.length - 1) {
      setCurrentQuestionIndex(0);
      return;
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleAnswer = (option) => {
    if (currentQuestionIndex === data.length - 1) {
      setCurrentQuestionIndex(0);
      append(answers);
      setAnswers([]);
      navigation.navigate('Thankyou');
      return;
    }

    const newAnswer = {
      question: {id: currentQuestion.id, title: currentQuestion.title},
      answer: option,
    };

    setAnswers((prevAnswers) => [...prevAnswers, newAnswer]);
    nextQuestion();
  };

  if (loading || !currentQuestion) {
    return (
      <View style={styles.wrapper}>
        <ActivityIndicator size={50} color="#00ff00" />
        <Text style={styles.loadTitle}>Идет загрузка данных...</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <View>
        <Text style={styles.title}>{currentQuestion.title}</Text>
        {currentQuestion.options.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.option}
            onPress={() => handleAnswer(option)}>
            <Text style={styles.questions}>{option.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
