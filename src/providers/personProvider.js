
const { createContext, useReducer } = require("react");

// create a separate person context for state & dispatch
export const PersonStateContext = createContext();
export const PersonDispatchContext = createContext();

// initialize an empty person object
const emptyPerson = {
    firstname: '', lastname: '', id: null,
    emailaddresses: [], postaladdresses: []
}

// make the provider below accessible to other files & folders
export const PersonProvider = (props) => {

    const reducer = (person, action) => {

        // extract function type to be run and data to be used
        const { type, payload } = action;
        const { name, value, idx, field } = payload || {};

        // introduce a switch case for reducer function
        switch (type) {

            // dispatch empty person object
            case 'empty':
                return emptyPerson;

            // load data from api server
            case 'load':
                return { ...person, ...payload };

            // handle events of changing field inputs
            case 'handleFieldChange':
                person[name] = value;
                return { ...person };

            // handle events of changing email address inputs 
            case 'handleEmailAddressChange':
                person.emailaddresses[idx] = field.value;
                return { ...person };

            // execute when emailaddress table's add button is clicked
            case 'addEmailAddressField':
                person.emailaddresses.push('');
                return { ...person };

            // execute when emailaddress table's remove button is clicked
            case 'removeEmailAddressField':
                person.emailaddresses.splice(idx, 1);
                return { ...person };

            // handle events of changing postal address inputs 
            case 'handlePostalAddressChange':
                person.postaladdresses[idx][field.name] = field.value;
                return { ...person };

            // execute when postaladdress table's add button is clicked
            case 'addPostalAddress':
                person.postaladdresses = person.postaladdresses || [];
                person.postaladdresses.push({ street: '', city: '', zipcode: '' });
                return { ...person };

            // execute when postaladdress table's remove button is clicked
            case 'removePostalAddress':
                person.postaladdresses = person.postaladdresses || [];
                person.postaladdresses.splice(idx, 1);
                return { ...person };
        }
    }

    // collect the state of the person object
    const [state, dispatch] = useReducer(reducer, emptyPerson);

    // return person's context, plus provider that subscribes to changes made to person object
    return (
        <PersonStateContext.Provider value={state}>
            <PersonDispatchContext.Provider value={dispatch}>
                {props.children}
            </PersonDispatchContext.Provider>
        </PersonStateContext.Provider>
    );
}