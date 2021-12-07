
import { useContext } from "react";
import { Button, Icon, Input, Table } from "semantic-ui-react";
import { PersonContext } from "../providers/personProvider";

const PostalAddresses = () => {

    // extract state variable, setter function & postal addresses from 'props'
    const { person, setPerson } = useContext(PersonContext);

    // execute when postaladdress table's add button is clicked
    const addPostalAddress = () => {

        // provide an alternate empty array if postal addresses doesn't exist yet
        person.postaladdresses = person.postaladdresses || [];

        // push an empty field to the 'postaladdresses' array
        person.postaladdresses.push({street: '', city: '', zipcode: ''});

        // set new state of state bag to new person clone
        setPerson({ ...person });
    }    

    // execute when postaladdress table's remove button is clicked
    const removePostalAddress = (idx) => {
        
        // provide an alternate empty array if postal addresses doesn't exist yet
        person.postaladdresses = person.postaladdresses || [];
        
        // put out postal address/es from the array
        person.postaladdresses.splice(idx, 1);

        // set new state of state bag to new person clone
        setPerson({ ...person });
    }

    // handle events of changing postal address inputs 
    const handlePostalAddressChange = (field, idx) => {
        
        // initialize variables extracted from field
        const { name, value } = field;

        // assign values of object: postal addresses properties 
        person.postaladdresses[idx][name] = value;

        // set new state of state bag to new person clone
        setPerson({ ...person });
    }

    // extract postal address/es from person object
    const { postaladdresses } = person;

    // render the following when this variable is called
    return (
        <>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>
                            <Button icon type="button" onClick={addPostalAddress}>
                                <Icon name="plus"></Icon>
                            </Button>
                        </Table.HeaderCell>
                        <Table.HeaderCell>Street</Table.HeaderCell>
                        <Table.HeaderCell>City</Table.HeaderCell>
                        <Table.HeaderCell>Zip code</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {postaladdresses?.map((pa, idx) => {
                        return (
                            <Table.Row>
                                <Table.Cell>
                                    <Button icon type="button" onClick={()=>{removePostalAddress(idx)}}>
                                        <Icon name="minus"></Icon>
                                    </Button>
                                </Table.Cell>
                                <Table.Cell>
                                    <Input 
                                        name="street"
                                        placeholder="e.g. Gutierrez"
                                        value={pa.street}
                                        onChange={(e, field)=>handlePostalAddressChange(field, idx)}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Input 
                                        name="city"
                                        placeholder="e.g. Taguig"
                                        value={pa.city}
                                        onChange={(e, field)=>handlePostalAddressChange(field, idx)}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Input 
                                        name="zipcode"
                                        placeholder="e.g. 999"
                                        value={pa.zipcode}
                                        onChange={(e, field)=>handlePostalAddressChange(field, idx)}
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

export default PostalAddresses;