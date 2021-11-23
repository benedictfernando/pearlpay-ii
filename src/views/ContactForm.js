
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

    // render the following when the this variable is called
    return (
        <>
            <Form>
                <Form.Field>
                    <Form.Input
                        name='firstname'
                        label='First name'
                        value={person.firstname}
                    />
                </Form.Field>
                <Form.Field>
                    <Form.Input
                        name='lastname'
                        label='Last name'
                        value={person.lastname}
                    />
                </Form.Field>
                <Button>Save</Button>
            </Form>
        </>
    );
}

export default ContactForm;