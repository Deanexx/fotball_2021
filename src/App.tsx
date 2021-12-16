import './styles/App.scss';

import style from "./index.module.scss"

import { useAppDispatch, useAppSelector } from "./hooks"
import { FormEvent, useEffect, useState } from 'react';

import { check_user } from "./store/userSlice/userSlice"
import getVotes from './store/voteSlice/Thunks/getVotesThunk';
import { deleteError } from "./store/errorSlice/errorSlice";
import { set_map } from './store/voteSlice/voteSlice';
import { set_goals_user, remove_goals_user } from './store/voteSlice/voteSlice';

import Header from "./components/Header/Header";
import VoteList from './components/VoteList/VoteList';
import ModalWrapper from './components/ModalWrapper/ModalWrapper';
import SpotOnMap from './components/SpotOnMap/SpotOnMap';

import GoogleMapReact from "google-map-react";

import instance from './server';

function App() {
  const dispatch = useAppDispatch();
  const { active, message } = useAppSelector(state => state.error)
  const voteLocation = useAppSelector( state => state.vote.location );
  const goals = useAppSelector(state => state.vote.isGoals);
  const user = useAppSelector(state => state.user)

  const [lat, setLat] = useState(voteLocation.coordinates[0].toString());
  const [lng, setLng] = useState(voteLocation.coordinates[1].toString());
  let [btnClicked, setBtnClicked] = useState(false);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(check_user());
    dispatch(getVotes());
  }, [dispatch])

  useEffect(()=> {
    setLat(voteLocation.coordinates[0].toString());
    setLng(voteLocation.coordinates[1].toString());
  }, [voteLocation])

  useEffect(() => {
    if(active) setTimeout(()=> { dispatch(deleteError()) }, 5000)
  },[active, dispatch])

  const set_latlng = async () => {
    setLoading(true);
    try {
      const { status } : { status: number } = await instance.patch("vote/setMap", {lat: +lat, lng: +lng});
      if (status === 200)
        dispatch(set_map({ lat: +lat, lng: +lng }))
    }
    catch (e){
      console.log(e)
    }
    setLoading(false);
    window.location.reload();
  }

  const set_net = async () => {
    setLoading(true);
    animate_btn();
    try {
        const { status } = await instance.patch("vote/setGoals", { _id: user._id });
        if (status === 204)
          dispatch(set_goals_user({ _id: user._id, name: user.name }))
    }
    catch (e) {
      console.log(e);
    }
    setLoading(true);
  }

  function check_inp(e: FormEvent<HTMLInputElement>, prev: any){
    let i = 0;
    let val = e.currentTarget.value;

    if (val === "") return "";
    if (val.split(".").length > 2) return prev;
    if (val[0] === "+" || val[0] === "-") i++;
    while(i < val.length) {
      if(!(+val[i] || +val[i] === 0 || val[i] === "."))
        return prev;
      i += 1; 
    }
    return val;
  }

  const animate_btn = () => {
    setBtnClicked(true);
    setTimeout(() =>{ setBtnClicked(false)}, 200)
}

  const remove_net = async () => {
    setLoading(true);
    const { status } = await instance.get("vote/removegoals");
    if (status === 200)
      dispatch(remove_goals_user());
    setLoading(false);
  }

  return (
    <div className="App">

        <ModalWrapper active={ active } top={ false } on={() => dispatch(deleteError())}>
          <p className={ style.modal__error }>
            { message }
          </p>
        </ModalWrapper>

        <Header/>
        <div className={ style.vote}>
          <h1 className={ style.vote__title}>Saturday, <span className={ style.vote__title__am}>8am</span></h1>
          <VoteList/>
          <div className={ style.whos__goals}>
          { !goals ? 
              <button 
                onClick={ () => { set_net() } } 
                className={ style.btn + " " + ( btnClicked ? style.button__clicked : "" ) }>
                    { loading ? ">>>>" : "I got goals"}</button> : (
                    user._id === goals._id ? 
                      <button className={ style.btn__red } onClick= {() => remove_net()}>Unset net</button> : 
                      <p className={ style.whos__goals__name}>
                         <span className={ style.whos__goals__name__inner}>{ goals.name } </span> brings the goals</p> )}
        </div>
        </div>

        <div className={ style.map}>
        <div className={ style.map__inner }> 
          <div className={ style.map__title }>
            <h1 className={ style.map__title_inner}> Play at:</h1>
            <div className={ style.map__title__inps}>
              <div>
                <label htmlFor="lat">
                  Lat:
                </label>
                <input 
                  name="lat"
                  type="text" 
                  value={ lat }
                  onChange={ (e) => setLat(prev => check_inp(e, prev)) }/>
              </div>
              <div>
                <label htmlFor="lng">
                  Lng:
                </label>
                <input name="lng"
                  type="text"
                  value={ lng }
                  onChange={ (e) => setLng( prev => check_inp(e, prev)) }/>
              </div>
            </div>
            <button className={ style.btn } onClick={ () => set_latlng()}> Change </button>
          </div>
          { (voteLocation.coordinates[0] && voteLocation.coordinates[1]) && <GoogleMapReact
            bootstrapURLKeys={ { key: "AIzaSyAIlnrxKH2bx4f2WE90kL-zlJ7O8VoOLYU"} }
            defaultCenter={ {
              lat: voteLocation.coordinates[0],
              lng: voteLocation.coordinates[1]} }
            defaultZoom={12}
          >
            <SpotOnMap
              lat={ voteLocation.coordinates[0] }
              lng={ voteLocation.coordinates[1] }
            />
          </GoogleMapReact>}
        </div>
        </div>
        <div className={ style.created__by}>
          <p>creted by <a href="http://eldartailov.surge.sh/" rel="noreferrer" target="_blank">Eldar Tailov</a></p> 
        </div>
    </div>
  );
}

export default App;