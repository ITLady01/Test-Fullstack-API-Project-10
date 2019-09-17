import React from './node_modules/react';

export default (props) => {
    const {
        cancel,
        errors,
        submit,
        submitButtonText,
        elements,
    } = props;

    function handleSubmit(event) {
        event.preventDefault();
        submit();
    }

    function handleCancel(event) {
        event.preventDefault();
        cancel();
    }

    return ( <div>
        <ErrorsDisplay errors = {
            errors
        }
        /> <form onSubmit = {
            handleSubmit
        } > {
            elements()
        } <div className = "pad-bottom" >
        <button className = "button logIn"
        type = "submit" > {
            submitButtonText
        } </button> <button className = "button button-secondary logIn"
        onClick = {
            handleCancel
                    } > Cancel </button>
            </div>
        </form> 
        </div>
    );
}

function errorsShown({
    errors
}) {
    let errorsShown = null;

    if (errors.length) {
        errorsShown = ( <div >
            <h2 className="validation--errors--label" > Errors </h2> \
            <div className = "validation-errors" >
            <ul > {
                errors.map((error, i) => <li key = {
                        i
                    } > {
                        error
                    } </li>)}
                </ul> </div> </div>
                );
            }

            return errorsShown;
        }