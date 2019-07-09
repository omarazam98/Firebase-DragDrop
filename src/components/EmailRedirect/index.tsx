import React from 'react';
import { withAPI } from '@winwin/api-firebase';

export const EmailRedirect = (props) => {
  const handleClick = () => props.history.push('/login');
  const handleSendClick = () => {
    const redirect = window['_env_'].NODE_ENV === 'production' ? 'http://www.winwinhomesharing.com'
      : window['_env_'].REACT_APP_EMAIL_REDIRECT || 'http://integration.scoutmastersforever.com';
    props.api.auth.currentUser().sendEmailVerification({ url: redirect });
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
