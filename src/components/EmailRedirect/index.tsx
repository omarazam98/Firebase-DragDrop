import React from 'react';

export function EmailRedirect(props) {
    const handleClick = () => props.history.push('/login');
    return (
      <div>
          Email has been sent to verify account. <br/>
          Already verified?
          <button onClick={handleClick}> Log In</button>
      </div>
    );
}
export default EmailRedirect;
