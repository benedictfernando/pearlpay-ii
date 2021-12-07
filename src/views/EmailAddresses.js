
import { useContext } from 'react';
import { Button, Table, Icon, Input } from 'semantic-ui-react';
import { PersonContext } from '../providers/personProvider';

const EmailAddresses = () => {

    // extract state variable, setter function & email addresses from 'props'
    const { person, setPerson } = useContext(PersonContext);

    // handle events of changing email address inputs 
    const handleEmailAddressChange = ({field, idx}) => {
        
        // assign values to person's email addresses
        person.emailaddresses[idx] = field.value;

        // set new state of state bag to new person clone
        setPerson({ ...person });
    }

    // execute when emailaddress table's add button is clicked
    const addEmailAddressField = () => {

        // push an empty field to the 'emailaddresses' array
        person.emailaddresses.push('');

        // set new state of state bag to new person clone
        setPerson({ ...person });
    }

    // execute when emailaddress table's remove button is clicked
    const removeEmailAddressField = (idx) => {

        // put out email address/es from the array
        person.emailaddresses.splice(idx, 1);

        // set new state of state bag to new person clone
        setPerson({ ...person });
    }

    // extract email address/es from person object
    const { emailaddresses } = person;

    return (
        <>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>
                            <Button icon type="button" onClick={addEmailAddressField}>
                                <Icon name="plus"></Icon>
                            </Button>
                            &nbsp;Email addresses
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {emailaddresses?.map((item, idx) => {
                        return (
                            <Table.Row key={idx}>
                                <Table.Cell>
                                    <Button icon type="button"
                                    onClick={()=>{removeEmailAddressField(idx)}}>
                                        <Icon name="minus"></Icon>
                                    </Button>
                                    <Input 
                                        name="emailaddresses"
                                        placeholder="e.g. test@test.com"
                                        value={item}
                                        onChange={(e, field) => handleEmailAddressChange({field, idx})}
                                    />
                                </Table.Cell>
                            </Table.Row>    
                        )
                    })}
                </Table.Body>
            </Table>
        </>
    )
}

export default EmailAddresses;