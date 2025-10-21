export default function userReducer(
  state = { name: '', loggedIn: false },
  action,
) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, loggedIn: true, name: action.payload };
    case 'LOGOUT':
      return { ...state, loggedIn: false, name: '' };
    default:
      return state;
  }
}
