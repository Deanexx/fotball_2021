import './styles/App.scss';

import { useAppDispatch } from "./hooks"
import { useEffect } from 'react';

import { check_user } from "./store/userSlice/userSlice"
import { getVotes } from './store/voteSlice/voteThunks';

import Header from "./components/Header/Header";
import VoteList from './components/VoteList/VoteList';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(check_user());
    dispatch(getVotes());
  }, [dispatch])

  return (
    <div className="App">
        <Header/>
        <VoteList/>
    </div>
  );
}

export default App;
