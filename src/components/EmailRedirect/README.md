# Email Redirect After Verification
Emails will no longer be sent for verification without some adjustments to your dev firestore. The URL to be redirected to MUST be whitelisted to send/receive the email.
In your firebase project, go to Authentication and click on the 'Sign-In Method' tab. Under 'Authorized domains', add the domain you are running on. (winwinhomesharing.com if production).
