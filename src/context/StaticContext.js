import React from 'react'

// the object we define here is for components that doenst have access to the context 
// ( they are not included in inside the Provider tags) when we declare it 
const Context = React.createContext({
    name: 'this-would-be-without-provider',
    value: true
})
export default Context;