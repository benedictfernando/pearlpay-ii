
import { useContext, useEffect, useState } from "react";
import { Form, Button, Message, Icon } from 'semantic-ui-react';
import { useParams } from 'react-router';
import PostalAddresses from "./PostalAddresses";
import EmailAddresses from "./EmailAddresses";
import { Link } from "react-router-dom";
import { PersonStateContext, PersonDispatchContext } from "../providers/personProvider";
import TitleLabel from "./TitleLabel";

const ContactForm = () => {

    // initialize state and dispatch person's context
    const personState = useContext(PersonStateContext);
    const personDispatch = useContext(PersonDispatchContext);

    // set states for saving prompt message
    const [showSaved, setShowSaved] = useState(false);

    // get encrypted id from url
    let { id } = useParams();

    // execute when the DOM content has been loaded
    useEffect(() => {
        (async () => {

            // execute when id is not present, then exit immediately after
            if (!id) { return personDispatch({ type: 'empty' }); }

            // fetch data from jQuery api
            const response = await fetch('/contact/' + id);

            // jsonify received data, then store it into array
            const payload = await response.json();

            // set new state of the 'person' state variable
            personDispatch({ type: 'load', payload });
        })();
    }, []);

    // create variables from extracted data
    const { firstname, lastname } = personState;

    // run when the form is submitted
    const saveContact = async () => {

        // packet containing the request
        const packet = {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(personState)
        }

        // fetch route with a packet
        await fetch('/contact', packet);

        // set state of showSaved to 'true'
        setShowSaved(true);

        // set timeout to set state of showSaved to 'false' after some time
        setTimeout(() => { setShowSaved(false) }, 3000);
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
                        onChange={(e, payload) => personDispatch({ type: 'handleFieldChange', payload })}
                    />
                </Form.Field>
                <Form.Field>
                    <Form.Input
                        name='lastname'
                        label='Last name'
                        value={lastname}
                        onChange={(e, payload) => personDispatch({ type: 'handleFieldChange', payload })}
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