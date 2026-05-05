import { Fragment } from 'react/jsx-runtime';
import { useSelector } from 'react-redux';
import Counter from './components/Counter';
import Header from './components/Header.js';
import Auth from './components/Auth.js';
import UserProfile from './components/UserProfile.js';


function App() {

const isAuth = useSelector(state => state.auth.isAuthenticated);
  return (
    <Fragment>
      <Header />
      {isAuth ?
      <UserProfile /> 
      : <Auth />
    }
      
      <Counter />
    </Fragment>
  );
}

export default App;
