import './styles/App.scss';

import style from "./index.module.scss"

import { useAppDispatch, useAppSelector } from "./hooks"
import { useEffect } from 'react';

import { check_user } from "./store/userSlice/userSlice"
import getVotes from './store/voteSlice/Thunks/getVotesThunk';
import { deleteError } from "./store/errorSlice/errorSlice";

import Header from "./components/Header/Header";
import VoteList from './components/VoteList/VoteList';
import ModalWrapper from './components/ModalWrapper/ModalWrapper';

function App() {
  const dispatch = useAppDispatch();
  const { active, message } = useAppSelector(state => state.error)

  useEffect(() => {
    dispatch(check_user());
    dispatch(getVotes());
  }, [dispatch])

  useEffect(() => {
    if(active) setTimeout(()=> { dispatch(deleteError()) }, 5000)
  },[active])

  return (
    <div className="App">
        { active && <ModalWrapper on={() => dispatch(deleteError())}>
            <p className={ style.modal__error }>{ message }</p>
          </ModalWrapper> }
        <Header/>
        <VoteList/>
    </div>
  );
}

export default App;
