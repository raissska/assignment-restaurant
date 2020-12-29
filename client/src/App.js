import React, {useState} from 'react'
import Routes from "./components/routes";
import Nav from "./components/Nav";
import {Alert} from "./components/Alert";

export const EmplContext = React.createContext(null);
function App() {
    const [error, setError] = useState('')
    const [searchName, setSearchName] = useState('')

    const nameHandler = (value) => {
        setSearchName(value)
    }


    const errorHandler = (value) => {
        setError(value)
    }

    return (
        <EmplContext.Provider value={{errorHandler,searchName,nameHandler}}>
        <div className="App">
            <div className={'container'}>
                <Nav/>
                <Alert text={error}/>
                <Routes/>
            </div>
        </div>
        </EmplContext.Provider>
    )
}

export default App;
