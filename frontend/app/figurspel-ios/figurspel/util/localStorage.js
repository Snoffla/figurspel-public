import AsyncStorage from '@react-native-async-storage/async-storage';

const storeGame = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('figurspel-current-game', jsonValue)
    } catch (e) {
      // saving error
    }
}

const storePlayers = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('figurspel-current-game-players', jsonValue)
  } catch (e) {
    // saving error
  }
}

const getPlayers = async () => {
  try {
      const jsonValue = await AsyncStorage.getItem('figurspel-current-game-players')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
      // error reading value
  }
}

const getGame = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('figurspel-current-game')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        // error reading value
    }
}


const setPlayerScore = async (player, score) => {
  try {
    var players = await getPlayers();
    players[player].score = score;
    storePlayers(players);
  } catch (e) {
  }
}

const setPlayerReported = async (player, reported) => {
  try {
    var players = await getPlayers();
    players[player].reported = reported;
    storePlayers(players);
    return players;
  } catch (e) {
  }
}

const isPlayerReported = async (player) => {
  try {
    var players = await getPlayers();
    return players[player].reported;
  } catch (e) {
  }
}

exports.storeGame = storeGame;
exports.getGame = getGame;

exports.storePlayers = storePlayers;
exports.getPlayers = getPlayers;

exports.setPlayerScore = setPlayerScore;
exports.setPlayerReported = setPlayerReported;
exports.isPlayerReported = isPlayerReported;
