import React, { useState} from 'react';
import {View, StyleSheet, StatusBar, ScrollView, Image} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import { Button, Text} from 'react-native-elements';

import {MainTheme} from './theme/light';

import Icon from 'react-native-vector-icons/Ionicons';

import {storeGame, getPlayers} from './util/localStorage';

import Figures from './data/figureSettings';

import PlayerComponent from './components/PlayerComponent';

export default function GameScreen({ route, navigation }) {
    const colors = MainTheme.colors;
    const inset = useSafeAreaInsets();

    const [game, setGame] = useState(route.params.game);
    const [players, setPlayers] = useState(route.params.players);

    const gameSettings = Figures[game.type];

    const figureCount = gameSettings.figureCount;

    const [currentFigure, setCurrentFigure] = useState(game.currentFigure);
    game.currentFigure = currentFigure;

    storeGame(game);
    return (
        <>
        <View style={[styles.header, {}]}>
            <Text h3 style={{color: colors.lightText, marginTop: 15}}>Figur {currentFigure + 1}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
                <Button
                    icon={<Icon name="chevron-back-outline" size={40} color={colors.lightText} />}
                    containerStyle={{flex: 1}}
                    disabledStyle={{backgroundColor: colors.primary, opacity: 0}}
                    disabled={currentFigure <= 0}
                    onPress={() =>{
                        setCurrentFigure(currentFigure-1);
                    }}
                />
                {currentFigure < figureCount-1 &&
                <Button
                    icon={<Icon name="chevron-forward-outline" size={40} color={colors.lightText} />}
                    containerStyle={{flex: 1}}
                    onPress={() =>{ setCurrentFigure(currentFigure+1) }}
                />
                }
                {!(currentFigure < figureCount-1) &&
                    <Button
                        title='Resultat'
                        icon={<Icon name="chevron-forward-outline" size={40} color={colors.lightText} />}
                        iconRight={true}
                        containerStyle={{flex: 1}}
                        onPress={() =>{ 
                            getPlayers().then((players) => {
                                navigation.navigate('Resultat', {game: game, players: players});
                            })
                        }}
                    />
                }
            </View>
            
        </View>
        
        <ScrollView style={styles.scrollView}>
            <Text h3 style={styles.figureTitle}>{gameSettings.figures[currentFigure].title}</Text>
            <View style={{marginHorizontal: 10}}>
                {players.map((prop, id) => {
                    return (
                    <PlayerComponent key={id} id={id} currentFigure={currentFigure} figureCount={figureCount} initialData={prop}></PlayerComponent>
                    );
                })}
            </View>
            <Image style={styles.figureImage} source={gameSettings.figures[currentFigure].img} />
            {(gameSettings.figures[currentFigure].description != '') &&
                <Text style={styles.descriptionText}>{gameSettings.figures[currentFigure].description}</Text>
            }
            {(gameSettings.credits != '') &&
                <Text style={styles.creditsText}>{gameSettings.credits}</Text>
            }
        </ScrollView>
        <StatusBar barStyle='light-content' />
        </>
    );
}

const colors = MainTheme.colors;
const styles = StyleSheet.create({
    safeAreaContainer:{
        flex: 1
    },
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
        marginTop: 30,
        marginBottom: 0
    },
    creditsText: {
        marginHorizontal: 30,
        marginBottom: 50,
        marginTop: 0,
        fontWeight: '500'
    },
    descriptionText: {
        marginHorizontal: 30,
        marginBottom: 20,
        marginTop: 0,
        fontSize: 15
    }
});