/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
//import { useSender } from './src/hooks'
import { AuthProvider } from './src/context/AuthContext'
import { AppNav } from './src/navigation/AppNav'
import axios from 'axios'
import * as Sentry from '@sentry/react-native'

axios.defaults.headers.common['Accept'] = 'application/json'

Sentry.init({
  dsn: 'https://7b692151bd324111932217bb89916ce4@o4505313209483264.ingest.sentry.io/4505314031304704',
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0
})

function App() {
  //useSender()

  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  )
}

export default Sentry.wrap(App)
//export default App
