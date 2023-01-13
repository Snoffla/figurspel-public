import {View, StyleSheet, StatusBar, Keyboard,  TouchableWithoutFeedback, ScrollView} from 'react-native';

import {Text} from 'react-native-elements';

import {MainTheme} from './theme/light';

import PlayerResult from './components/PlayerResult';


export default function ResultScreen({ navigation: { navigate } , navigation, route}) {
    const colors = MainTheme.colors;
    const players = route.params.players;
    const game = route.params.game;

    function registerResult(id, score){
        navigate('register-result', {playerIndex: id, score: score, gameType: game.type});
    }

    return (
        <DismissKeyboard>
        <>
            <View style={[styles.header, {}]}>
                <Text h3 style={{color: colors.lightText, marginTop: 15, marginBottom: 15}}>Resultat</Text>
            </View>
            <ScrollView style={styles.scrollView}>
                <View style={{marginHorizontal: 10}}>
                    {players.map((prop, id) => {
                        return (
                        <PlayerResult key={id} id={id} data={prop} registerResult={registerResult}></PlayerResult>
                        );
                    })}
                </View>
            </ScrollView>
            <StatusBar barStyle='light-content' />
        </>
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
    scrollView: {
        backgroundColor: colors.background
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