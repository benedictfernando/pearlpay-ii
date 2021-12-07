
const { useState, createContext } = require("react");

// create context for our person object
export const PersonContext = createContext();

// make the provider below accessible to other files & folders
export const PersonProvider = (props) => {

    // collect the state of the person object
    const [person, setPerson] = useState({});

    // return person's context, plus provider that subscribes to changes made to person object
    return (
        <PersonContext.Provider value={{ person, setPerson }}>
            {props.children}
        </PersonContext.Provider>
    );
}