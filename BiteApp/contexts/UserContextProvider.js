import React, { useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserContext from './UserContext';

const initialState = {
  preferences: [],
  skills: {},
  history: [],
  PostsViewed: 0,
  likedContents: [],
};

const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_PREFERENCES':
        return { ...state, preferences: [...new Set(action.payload)] };
      case 'RESET':
        return initialState;
      case 'SET_SKILLS':
        return { ...state, skills: [...new Set(action.payload)] };
      case 'ADD_TO_HISTORY':
        return { ...state, history: [...state.history, action.payload] };
      case 'ADD_PREFERRED_TOPIC':
        return { ...state, preferences: Array.from(new Set([...state.preferences, ...action.payload])) };
      case 'LOAD_STATE':
        return { ...state, ...action.payload };
      case 'INCREMENT_POSTS_VIEWED':
        return { ...state, PostsViewed: state.PostsViewed + 1 };
      case 'TOGGLE_CONTENT_LIKE':
        const updatedLikes = [...state.likedContents];
        const contentIndex = updatedLikes.findIndex(content => content.id === action.payload.id);
        
        if (contentIndex !== -1) {
          updatedLikes.splice(contentIndex, 1);
        } else {
          updatedLikes.push(action.payload);
        }

        return { ...state, likedContents: updatedLikes };
      default:
        return state;
    }
  };

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const loadState = async () => {
      try {
        const savedState = await AsyncStorage.getItem('userContext');
        if (savedState) {
          dispatch({ type: 'LOAD_STATE', payload: JSON.parse(savedState) });
        }
      } catch (error) {
        console.error('Failed to load user context from storage:', error);
      }
    };

    loadState();
  }, []);

  useEffect(() => {
    const saveState = async () => {
      try {
        await AsyncStorage.setItem('userContext', JSON.stringify(state));
      } catch (error) {
        console.error('Failed to save user context to storage:', error);
      }
    };

    saveState();
  }, [state]);

  return (
    <UserContext.Provider value={{ userContext: state, setUserContext: dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
