auth/authentication

- login
- sign up / register
- forget password

CLICK LOGIN

- Call API to login
- Success -> redirect ADMIN
- FAILED -> show ERROR

LOGIN
LOGOUT

LOOP
authSaga

- if logged in, watch LOGOUT
- else watch LOGIN

LOGIN

- call login API to get token + user info
- set token to local storage
- redirect to admin page

LOGOUT

- clear token from local storage
- redirect to login page

authSlice
authSaga
