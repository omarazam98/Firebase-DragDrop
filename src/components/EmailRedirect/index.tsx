import React from 'react';
import { withAPI } from '@winwin/api-firebase';

export const EmailRedirect = (props) => {
  const handleClick = () => props.history.push('/login');
  const handleSendClick = () => {
    props.api.auth.currentUser().sendEmailVerification({ url: 'http://localhost:3000' });
  };

  return (
    <div>
      Email has been sent to verify account. <br/>
      Already verified?
      <button onClick={handleClick} id="redirect"> Log In</button> <br/>
      Didn't receive the email?
      <button onClick={handleSendClick} id="resend"> Send Again</button>
    </div>
  );
};
export default withAPI(EmailRedirect);
