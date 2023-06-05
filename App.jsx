/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import { useSender } from './src/hooks'
import { AuthProvider } from './src/context/AuthContext'
import { AppNav } from './src/navigation/AppNav'
import axios from 'axios'

axios.defaults.headers.common['Accept'] = 'application/json'

function App() {
  useSender()

  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  )
}

export default App
