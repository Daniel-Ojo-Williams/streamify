import axios from "axios";
import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('user', JSON.stringify(action.payload))
      return action.payload
    case 'LOGOUT':
      localStorage.removeItem('user');
      return null
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [user, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem('user')))

  useEffect(() => {
    // --| Do a health check to see if user token is still active and valid
    const healthCheck = async () => {
      try {
        await axios.get('http://localhost:5000/health', { withCredentials: true });
      } catch (error) {
        if (error.response.status === 401) {
          localStorage.removeItem('user')
          dispatch({ type: 'LOGOUT' })
        }
      }
    }

    healthCheck();
  }, [])

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      { children }
    </AuthContext.Provider>
  )
}