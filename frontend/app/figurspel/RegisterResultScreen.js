import React, { useState} from 'react';
import {View, StyleSheet, StatusBar, Keyboard,  TouchableWithoutFeedback} from 'react-native';

import {Text} from 'react-native-elements';

import {MainTheme} from './theme/light';

import {setPlayerReported} from './util/localStorage';

import EventPicker from './register-components/EventPicker'
import EmailInput from './register-components/EmailInput';
import CreatePlayer from './register-components/CreatePlayer';
import SubmitResult from './register-components/SubmitResult';

export default function RegisterResultScreen({ navigation: { navigate } , navigation, route}) {
    const colors = MainTheme.colors;
    const [player, setPlayer] = useState({});
    const [event, setEvent] = useState(null);

    const [page, setPage] = useState('event-picker');

    const gameType = route.params.gameType;
    const playerIndex = route.params.playerIndex;
    const score = route.params.score;


    function onEventPicked(event){
        setEvent(event);
        setPage('email-input');
    }

    function onEmailInput(player){
        setPlayer(player);
        if (player.id){
            setPage('submit-result');
        }else{
            setPage('create-player');
        }
    }

    function onPlayerCreated(player){
        setPlayer(player);
        setPage('submit-result');
    }

    function onResultSubmit(){
        setPlayerReported(playerIndex, true)
        .then((players) => {
            navigate('Resultat', {players: players});
        }).catch((err) => {});
    }

    return (
        <DismissKeyboard>
        <View style={{flex: 1}}>
            <View style={[styles.header, {}]}>
                <Text h3 style={{color: colors.lightText, marginTop: 15, marginBottom: 15}}>Rapportera</Text>
            </View>
            <View style={styles.formContainer}>
                {page === 'event-picker' &&
                    <EventPicker onSubmit={onEventPicked}/>
                }
                {page === 'email-input' &&
                    <EmailInput onSubmit={onEmailInput}/>
                }
                {page === 'create-player' &&
                    <CreatePlayer onSubmit={onPlayerCreated} code={event.code} email={player.email}/>
                }
                {page === 'submit-result' &&
                    <SubmitResult onSubmit={onResultSubmit} event={event} player={player} score={score} gameType={gameType}/>
                }
                
            </View>
            <StatusBar barStyle='light-content' />
        </View>
        </DismissKeyboard>
    );
}

const colors = MainTheme.colors;
const styles = StyleSheet.create({
    header:{
        backgroundColor: colors.primary,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        display: 'flex',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 25,
        paddingHorizontal: 20,
        backgroundColor: colors.background,
    },
    figureTitle: {
        textAlign: 'center',
        color: colors.darkText,
        marginTop: 10,
        marginBottom: 10
    },
    figureImage: {
        resizeMode: "contain",
        width: '100%',
        height: undefined,
        aspectRatio: 401 / 827,
        marginTop: 30
    }
});

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
);