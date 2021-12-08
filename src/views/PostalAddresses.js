
import { useContext } from "react";
import { Button, Icon, Input, Table } from "semantic-ui-react";
import { PersonContext } from "../providers/personProvider";

const PostalAddresses = () => {

    // extract state variable, setter function & postal addresses from 'props'
    const { state, dispatch } = useContext(PersonContext);

    // extract postal address/es from person object
    const { postaladdresses } = state;

    // render the following when this variable is called
    return (
        <>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>
                            <Button icon type="button" onClick={() =>
                                dispatch({ type: 'addPostalAddress' })}>
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
                                    <Button icon type="button" onClick={() => dispatch({
                                        type: 'removePostalAddress', payload: { idx }
                                    })}>
                                        <Icon name="minus"></Icon>
                                    </Button>
                                </Table.Cell>
                                <Table.Cell>
                                    <Input
                                        name="street"
                                        placeholder="e.g. Gutierrez"
                                        value={pa.street}
                                        onChange={(e, field) => dispatch({
                                            type: 'handlePostalAddressChange', payload: { field, idx }
                                        })}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Input
                                        name="city"
                                        placeholder="e.g. Taguig"
                                        value={pa.city}
                                        onChange={(e, field) => dispatch({
                                            type: 'handlePostalAddressChange', payload: { field, idx }
                                        })}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Input
                                        name="zipcode"
                                        placeholder="e.g. 999"
                                        value={pa.zipcode}
                                        onChange={(e, field) => dispatch({
                                            type: 'handlePostalAddressChange', payload: { field, idx }
                                        })}
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