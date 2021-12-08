
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, List } from 'semantic-ui-react';

const ContactsList = () => {

    // initialize a state variable and a setter function
    const [contacts, setContacts] = useState([]);

    // execute when the DOM content has been loaded
    useEffect(() => {
        (async () => {
            // fetch data from jQuery api
            const response = await fetch('/contacts');

            // jsonify received data, then store it into array
            const results = await response.json();

            // set new state of the 'contacts' state variable
            setContacts(results.contacts);
        })();
    }, []);

    // render the following when the this variable is called
    return (
        <>
            <h1>Contacts List</h1>
            <Link to="/new">
                <Button icon>
                    <Icon name="add"></Icon>
                </Button>
            </Link>
            <List size="massive" divided>
                {contacts.map(contact => {
                    return (
                        <List.Item key={contact.id}>
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