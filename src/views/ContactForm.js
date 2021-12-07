
import { useEffect, useState } from "react";
import { Form, Button, Message, Icon } from 'semantic-ui-react';
import { useParams } from 'react-router';
import PostalAddresses from "./PostalAddresses";
import EmailAddresses from "./EmailAddresses";
import { Link } from "react-router-dom";

const ContactForm = (props) => {

    // create a template for person without information
    const emptyPerson = {
        firstname: '', lastname: '', id: null,
        emailaddresses: [], postaladdresses: []
    }

    // initialize a state variable and a setter function
    const [person, setPerson] = useState(emptyPerson);

    // set states for saving prompt message
    const [showSaved, setShowSaved] = useState(false);

    // get encrypted id from url
    let { id } = useParams();

    // execute when the DOM content has been loaded
    useEffect(() => {
        (async () => {

            // execute when id is not present, then exit immediately after
            if (!id) { return setPerson(emptyPerson); }

            // fetch data from jQuery api
            const response = await fetch('/contact/' + id);

            // jsonify received data, then store it into array
            const results = await response.json();

            // set new state of the 'person' state variable
            setPerson(results);
        })();
    }, []);

    // create variables from extracted data
    const { firstname, lastname, emailaddresses, postaladdresses } = person;

    // run when the form is submitted
    const saveContact = async () => {

        // packet containing the request
        const packet = {
            method: 'POST',
            headers: {'content-type':'application/json'},
            body: JSON.stringify(person)
        }

        // fetch route with a packet
        await fetch('/contact', packet);

        // set state of showSaved to 'true'
        setShowSaved(true);

        // set timeout to set state of showSaved to 'false' after some time
        setTimeout(() => { setShowSaved(false) }, 3000);
    }

    // handle events of changing field inputs
    const handleFieldChange = (field) => {

        // initialize variables extracted from field
        const { name, value } = field;

        // assign values of object: person's properties 
        person[name] = value;
 
        // set new state of state bag to new person clone
        setPerson({ ...person });
    }

    // render the following when this variable is called
    return (
        <>
            <Link to="/"><Button icon><Icon name="home" /></Button></Link>
            <Form onSubmit={saveContact}>
                <Form.Field>
                    <Form.Input
                        name='firstname'
                        label='First name'
                        value={firstname}
                        onChange={(e, field) => handleFieldChange(field)}
                    />
                </Form.Field>
                <Form.Field>
                    <Form.Input
                        name='lastname'
                        label='Last name'
                        value={lastname}
                        onChange={(e, field) => handleFieldChange(field)}
                    />
                </Form.Field>
                <EmailAddresses props={{ person, setPerson, emailaddresses }} />
                <PostalAddresses props={{ person, setPerson, postaladdresses }} />
                <Button>Save</Button>
                {showSaved ? <Message color="green">Saved</Message> : null}
            </Form>
        </>
    );
}

export default ContactForm;