
import { useContext } from 'react';
import { Button, Table, Icon, Input } from 'semantic-ui-react';
import { PersonStateContext, PersonDispatchContext } from '../providers/personProvider';

const EmailAddresses = () => {

    // initialize state and dispatch person's context
    const state = useContext(PersonStateContext);
    const dispatch = useContext(PersonDispatchContext);

    // extract email address/es from person object
    const { emailaddresses } = state;

    return (
        <>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>
                            <Button icon type="button" onClick={() => dispatch({ type: 'addEmailAddressField' })}>
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
                                        onClick={() => dispatch({ type: 'removeEmailAddressField', payload: { idx } })}>
                                        <Icon name="minus"></Icon>
                                    </Button>
                                    <Input
                                        name="emailaddresses"
                                        placeholder="e.g. test@test.com"
                                        value={item}
                                        onChange={(e, field) => dispatch({
                                            type: 'handleEmailAddressChange', payload: { field, idx }
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

export default EmailAddresses;