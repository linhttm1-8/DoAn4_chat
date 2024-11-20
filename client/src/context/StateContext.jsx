import { createContext, useContext, useReducer } from "react";


export const StateContent = createContext()
export const StateProvider = ({ initialState, reducer, children }) => (
    <StateContent.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContent.Provider>
)
export const useStateProvider = () => useContext(StateContent);
