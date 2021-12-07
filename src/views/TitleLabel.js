
import { useContext } from "react";
import { PersonContext } from "../providers/personProvider";

const TitleLabel = () => {

    // extract person from context provider
    const { person } = useContext(PersonContext);

    // extract first & last name from person object
    const { firstname, lastname } = person;

    return (
        <h2>
            Hi {firstname} {lastname}!
        </h2>
    );
}

export default TitleLabel;