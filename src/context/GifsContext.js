import React, { useState } from 'react'

// we dont pass anything inside the object as the function gifscontextprovider set it 
// within the property value when declaring context.provider
const Context = React.createContext({})

// all the content inside the gifscontexprovider tags is in children so we have to renderit 
export function GifsContextProvider({ children }) {
    // we now have a state inside our provider, this is usefull to acces to an specific gifs in the detail
    // a global state, set by the hook useGifs, who's importing this context and setting the gifs inside 
    const [gifs, setGifs] = useState([]);

    return (
        <Context.Provider value={{ gifs, setGifs }} >
            {children}
        </Context.Provider>
    )
}
export default Context;