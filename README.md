### Auth/authentication

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

### Lib: redux-router-history + history

### Handle loading / error in redux saga

- RTK + Thunk: provide a way to await an async action right on component
=> Handle loading/error on component easily

- RTK + Saga: doesn't have a way to do so
=> What to do?

My suggestions:

- Loading: can based on redux store
- Error: eliminate the usage as much as you can

Considerations:

- Trigger error toast from saga
- Consider to call API directly on component instead of going through saga

### Students

ROUTINGS

- /admin/students: listing
- /admin/students/add: add new student
- /admin/students/edit/:studentId: update a student

LISTING

- Search by name
- Filter by city
- Sort by name, mark
- Pagination

student slice state:

- loading
- list
- filter{page:1,limit:10,...}
- pagination

ADD/EDIT

- React Hook Form v7
- Yup
