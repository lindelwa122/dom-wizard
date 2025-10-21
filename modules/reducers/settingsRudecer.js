export default function settingsReducer(state = { theme: 'light' }, action) {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    default:
      return state;
  }
}
