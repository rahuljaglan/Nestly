// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

// import React, { useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { AuthProvider } from './src/context/AuthContext';
// import RootNavigator from './src/navigation/RootNavigator';
// import { getAuth, signOut } from 'firebase/auth';

// const App = () => {
//   useEffect(() => {
//     const auth = getAuth();
//     signOut(auth).then(() => {
//       console.log('🚪 Forced logout on app start');
//     });
//   }, []);

//   return (
//     <AuthProvider>
//       <NavigationContainer>
//         <RootNavigator />
//       </NavigationContainer>
//     </AuthProvider>
//   );
// };

// export default App;
