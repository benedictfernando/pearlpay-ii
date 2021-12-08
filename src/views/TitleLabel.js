
import { useContext } from "react";
import { PersonStateContext } from "../providers/personProvider";

const TitleLabel = () => {

    // extract person from context provider
    const state = useContext(PersonStateContext);

    // extract first & last name from person object
    const { firstname, lastname } = state;

    return (
        <h2>
            Hi {firstname} {lastname}!
        </h2>
    );
}

export default TitleLabel;