/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {useSender} from './src/hooks';
import {AuthProvider} from './src/context/AuthContext';
import {AppNav} from './src/navigation/AppNav';

function App() {
  useSender();

  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}

export default App;
