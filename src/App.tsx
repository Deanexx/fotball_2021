import './styles/App.scss';
import Header from "./components/Header/Header";
import { useAppSelector, useAppDispatch } from "./hooks"
import { useEffect } from 'react';
import { check_user } from "./store/userSlice/userSlice"

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user)
  useEffect(() => {
    console.log(user, "user")
    dispatch(check_user());
  })
  return (
    <div className="App">
        <Header/>
    </div>
  );
}

export default App;
