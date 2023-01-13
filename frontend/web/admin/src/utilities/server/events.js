import {auth} from "../../firebase";

import {postData, getData, putData, waitForUser, headData} from './db'


async function createEvent(title){
  try {
    await waitForUser();
    const idToken = await auth().currentUser.getIdToken(true);
    const response = await postData('https://apifigur.snoffla.com/events', {title: title}, idToken);
    return response.json();
  } catch (error) {
    console.log(error);
    throw Error(error.message);
  }
}

async function getSettings(eventId){
  try {
    await waitForUser();
    const idToken = await auth().currentUser.getIdToken(true);
    const response = await getData(`https://apifigur.snoffla.com/events/${eventId}/settings`, {}, idToken);
    return response.json();
  } catch (error) {
    console.log(error);
    throw Error(error.message);
  }
}

async function setSettings(eventId, settings){
  try {
    const idToken = await auth().currentUser.getIdToken(true);
    const response = await putData(`https://apifigur.snoffla.com/events/${eventId}/settings`, {settings: settings}, idToken);
    return response.json();
  } catch (error) {
    console.log(error);
    throw Error(error.message);
  }
}


async function getEvents(){
  try {
      await waitForUser();
      const idToken = await auth().currentUser.getIdToken(true);
      const response = await getData('https://apifigur.snoffla.com/events', {}, idToken);
      return response.json();
  } catch (error) {
      throw Error(error.message);
  }
}

async function getScoreCountForEvent(eventId){
  try {
      const response = await headData(`https://apifigur.snoffla.com/events/${eventId}/scores`, {}, '');
      return response.headers.get('X-Total-Count');
  } catch (error) {
      throw Error(error.message);
  }
}

async function getClubEventStats(eventId){
  try {
      await waitForUser();
      const idToken = await auth().currentUser.getIdToken(true)
      const response = await getData(`https://apifigur.snoffla.com/events/${eventId}/clubs/stats`, {}, idToken);
      return response.json();
  } catch (error) {
      throw Error(error.message);
  }
}


export {createEvent, getEvents, getSettings, setSettings, getScoreCountForEvent, getClubEventStats};