import React, { createContext } from 'react'
import app from '../Firebase/firebase.config';
import {getAuth} from 'firebase/auth'

export const AuthContext = createContext();
const auth = getAuth(app);

export default function AuthProvider({children}) {
    const authInfo = {

    }
  return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
  )
}
