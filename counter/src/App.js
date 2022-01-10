import React, { createContext, useContext, useState } from "react";

//an initial state for the counter variables
const initialState = {
  count1: 0,
  count2: 0,
};

//use State Hook for using and updating the value
const useValue = () => useState(initialState);

//context for using it at multiple places in the application
const Context = createContext(null);

//using Global State for having a Global error and value
const useGlobalState = () => {
  const value = useContext(Context);
  if (value === null) throw new Error("Please add GlobalStateProvider");
  return value;
};

// State Provider
const GlobalStateProvider = ({ children }) => (
  <Context.Provider value={useValue()}>{children}</Context.Provider>
);

//Counter Component with name parameter
const Counter = ({ name }) => {
  // getting state
  const [state, setState] = useGlobalState();

  //counter value
  const count = state[name] || 0;

  //function to increment value by deconstructing state at first
  const increment = () => {
    setState({ ...state, [name]: count + 1 });
  };

  //function to decrement value by deconstructing state at first
  const decrement = () => {
    setState({ ...state, [name]: count - 1 });
  };

  //render part of the application
  return (
    <div>
      {count}
      <button onClick={increment}>+1</button>
      <button onClick={decrement}>-1</button>
    </div>
  );
};

//App Component using Global State Provider
const App = () => (
  <GlobalStateProvider>
    <h1>Count1</h1>
    <Counter name="count1" />
    <Counter name="count1" />
    <h1>Count2</h1>
    <Counter name="count2" />
    <Counter name="count2" />
  </GlobalStateProvider>
);

export default App;
