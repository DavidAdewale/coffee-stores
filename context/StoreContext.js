import { createContext, useContext, useReducer } from 'react';

const StoreContext = createContext();

const initalState = {
  latLng: '',
  coffeeStores: [],
};

function storeReducer(state, action) {
  switch (action.type) {
    case 'set/latLng':
      return { ...state, latLng: action.payload };
    case 'set/stores':
      return { ...state, coffeeStores: action.payload };
    default:
      return state;
  }
}

function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(storeReducer, initalState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined)
    throw new Error('StoreContext was used outside of StoreContext Provider');
  return context;
}

export { StoreProvider, useStore };
