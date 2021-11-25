
import { useEffect, useState } from "react";
import { Form, Button } from 'semantic-ui-react';
import { useParams } from 'react-router';

const ContactForm = (props) => {

    // initialize a state variable and a setter function
    const [person, setPerson] = useState({
        firstname: '', lastname: '', id: null,
        emailaddresses: [], postaladdresses:[]
    })

    // get encrypted id from url
    const { id } = useParams();

    // execute when the DOM content has been loaded
    useEffect(() => {
        (async () => {
            // fetch data from jQuery api
            const response = await fetch('/contact/' + id);

            // jsonify received data, then store it into array
            const results = await response.json();

            // set new state of the 'person' state variable
            setPerson(results);
        })();
    }, []);

    // create variables from extracted data
    const { firstname, lastname } = person;

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

    // render the following when the this variable is called
    return (
        <>
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
                <Button>Save</Button>
            </Form>
        </>
    );
}

export default ContactForm;