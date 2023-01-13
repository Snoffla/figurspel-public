import { auth } from "../../firebase";
import { putData, getData } from "./db";

async function updatePlayerClub(playerId, clubId) {
  try {
    const idToken = await auth().currentUser.getIdToken(true);
    const response = await putData(
      `https://apifigur.snoffla.com/players/${playerId}/club`,
      { clubId: clubId },
      idToken
    );
    if (!response.ok) {
      throw Error("Failed to update");
    }
    return response.json();
  } catch (error) {
    throw Error(error.message);
  }
}

async function getPlayerByEmail(email) {
  const url = `https://apifigur.snoffla.com/players?email=${email}`;
  try {
    const respones = await getData(url);
    const data = await respones.json();
    if (data.error || !data) return {};
    const player = {
      id: data.id,
      name: data.name,
      clubId: data.club_id,
      birthDate: data.birth_date,
    };
    return player;
  } catch (error) {
    console.log(error);
    return {};
  }
}

export { getPlayerByEmail, updatePlayerClub };
