import {createContext} from 'react';

const AppContext = createContext({
  appDispatch: () => {},
});

export default AppContext;