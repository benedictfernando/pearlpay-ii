
import { useContext, useEffect, useState } from "react";
import { Form, Button, Message, Icon } from 'semantic-ui-react';
import { useParams } from 'react-router';
import PostalAddresses from "./PostalAddresses";
import EmailAddresses from "./EmailAddresses";
import { Link } from "react-router-dom";
import { PersonContext } from "../providers/personProvider";
import TitleLabel from "./TitleLabel";

const ContactForm = () => {

    // create a template for person without information
    const emptyPerson = {
        firstname: '', lastname: '', id: null,
        emailaddresses: [], postaladdresses: []
    }

    // initialize a state variable and a setter function
    const { state, dispatch } = useContext(PersonContext);

    // set states for saving prompt message
    const [showSaved, setShowSaved] = useState(false);

    // get encrypted id from url
    let { id } = useParams();

    // execute when the DOM content has been loaded
    useEffect(() => {
        (async () => {

            // execute when id is not present, then exit immediately after
            if (!id) { return dispatch(emptyPerson); }

            // fetch data from jQuery api
            const response = await fetch('/contact/' + id);

            // jsonify received data, then store it into array
            const results = await response.json();

            // set new state of the 'person' state variable
            dispatch(results);
        })();
    }, []);

    // create variables from extracted data
    const { firstname, lastname } = state;

    // run when the form is submitted
    const saveContact = async () => {

        // packet containing the request
        const packet = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(state)
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
        state[name] = value;

        // set new state of state bag to new person clone
        dispatch({ ...state });
    }

    // render the following when this variable is called
    return (
        <>
            <Link to="/"><Button icon><Icon name="home" /></Button></Link>
            <TitleLabel />
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
                <EmailAddresses />
                <PostalAddresses />
                <Button>Save</Button>
                {showSaved ? <Message color="green">Saved</Message> : null}
            </Form>
        </>
    );
}

export default ContactForm;