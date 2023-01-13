import {auth} from "../../firebase";
import {postData, getData, putData, deleteData, waitForUser} from './db'


async function getAllClubs(){
  try {
    const response = await getData('https://apifigur.snoffla.com/clubs');
    return response.json();
  } catch (error) {
    throw Error(error.message);
  }
}

async function getEventClubs(eventId){
  try {
    const response = await getData(`https://apifigur.snoffla.com/events/${eventId}/clubs`);
    return response.json();
  } catch (error) {
    throw Error(error.message);
  }
}

async function disableClub(eventId, clubId){
  try {
    const idToken = await auth().currentUser.getIdToken(true);
    const response = await deleteData(`https://apifigur.snoffla.com/events/${eventId}/clubs`, {clubId: clubId}, idToken);
    if (!response.ok){
      throw Error("Failed to update")
    }
    return response.json();
  } catch (error) {
    throw Error(error.message);
  }
}

async function enableClub(eventId, clubId){
  try {
    const idToken = await auth().currentUser.getIdToken(true);
    const response = await postData(`https://apifigur.snoffla.com/events/${eventId}/clubs`, {clubId: clubId}, idToken);
    if (!response.ok){
      throw Error("Failed to update")
    }
    return response;
  } catch (error) {
    throw Error(error.message);
  }
}

export {getAllClubs, getEventClubs, disableClub, enableClub};