import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

export function EmailRedirect(props) {
    const handleClick = (e) => props.history.push('/login');
    return (
        <div>
            Email has been sent to verify account. <br/>
            Already verified?
            <button onClick={handleClick}> Log In</button>
        </div>    );
}
export default withRouter(EmailRedirect);
