
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { List } from 'semantic-ui-react';

const ContactsList = () => { 

    // initialize a state variable and a setter function
    const [contacts, setContacts] = useState([]);

    // execute when the DOM content has been loaded
    useEffect(() => {
        (async () => {
            // fetch data from jQuery api
            const response = await fetch('/contacts');
            
            // jsonify received data, then store it into array
            const { contacts } = await response.json();

            // set new state of the 'contacts' state variable
            setContacts(contacts);
        })();
    }, []);

    // render the following when the this variable is called
    return (
        <>  
            <h1>Contacts List</h1>
            <List size="massive" divided>
                {contacts.map(contact => { return (
                    <List.Item>
                        <Link to={`/contact/${contact.id}`}>
                            <List.Content>
                                <List.Header as="a">
                                    {contact.firstname} {contact.lastname}
                                </List.Header>
                            </List.Content>
                        </Link>
                    </List.Item>
                    )
                })}
            </List>
        </>
    );
}

// let other components reference this file
export default ContactsList;