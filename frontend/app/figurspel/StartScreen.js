import React, { useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, StatusBar, FlatList, Keyboard,  TouchableWithoutFeedback} from 'react-native';

import { Button, Text, ButtonGroup, Input} from 'react-native-elements';

import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {MainTheme} from './theme/light';

import {storeGame, getGame, storePlayers, getPlayers} from './util/localStorage';

import { useFocusEffect } from '@react-navigation/native';


export default function StartScreen({ navigation: { navigate } , navigation}) {
    const colors = MainTheme.colors;
    const inset = useSafeAreaInsets();

    // ---- Stored Game ----
    const [storedGame, setStoredGame] = useState({});

    const [storedPlayers, setStoredPlayers] = useState({});

    useFocusEffect(
        useCallback(() => {
            getPlayers().then((players) => {
                setStoredPlayers(players);
            })
            getGame().then((game) => {
                setStoredGame(game);
            })
          }, [])
    );


    // ---- Game Types ----
    const [gameType, setGameType] = useState(0);
    const gameTypes = ['Klassisk', 'Modern', 'Kids']
    function updateGameTypeButton(index) {
        setGameType(index)
    }

    // ----  Players ----
    const [names, setNames] = useState(['']);


    // Player Count
    function updatePlayerCount(index) {
        var newNames = [...names];
        if (index === 0 && newNames.length > 1){
            newNames.pop();
        }
        else if (index === 1){
            newNames.push('');
        }
        setNames(newNames);
    }

    const PlayerMinusBtn = () => <Ionicons name='remove' size={25} color={colors.secondary}/>;
    const PlayerPlusBtn = () => <Ionicons name='add' size={25} color={colors.secondary}/>;


    // Player Name
    function updatePlayerName(index, value){
        var newNames = [...names];
        newNames[index] = value;
        setNames(newNames);
    }

    const nameInputRender = (row) => {
        const name = row.item;
        return(
            <Input 
            placeholder={`Spelare ${row.index + 1}`} 
            key={row.index} 
            onChangeText={value => updatePlayerName(row.index, value)}
            />
        );
    };

    function startNewGame(){
        var players = [];
        for (let i = 0; i < names.length; i++) {
            if (names[i].trim() == ''){
                names[i] = `Spelare ${i+1}`;
            }
            const player = {
                name: names[i],
                reported: false,
                score: []
            }
            players.push(player);
        }
        var game = {
            type: gameType,
            currentFigure: 0,
        }

        storeGame(game);
        storePlayers(players);
        navigate('Figurspel', {game: game, players: players});
    }

    function resumeGame(){
        getPlayers().then((players) => {
            getGame().then((game) => {
                navigate('Figurspel', {game: game, players: players});
                setStoredGame(game);
                setStoredPlayers(players);
            })
        })
    }

    return (
        
        <SafeAreaView style={{flex: 1}}>
        <DismissKeyboard>
        <View style={{justifyContent: 'space-between', flex: 1}}>
            <View>
                <Text h1 style={{color: colors.headerText, textAlign: 'center', marginBottom: 15}}>Figurspel</Text>
                {/* Game type picker */}
                <ButtonGroup
                    onPress={updateGameTypeButton}
                    selectedIndex={gameType}
                    buttons={gameTypes}
                    containerStyle={{height: 50}}
                />
                <View style={{margin: 10, marginLeft: 20, flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 20}}>Antal spelare: </Text>
                    <Text style={{fontSize: 20, width: 30}}>{names.length}</Text>
                    {/* Player Counter */}
                    <ButtonGroup
                        onPress={updatePlayerCount}
                        buttons={[{ element: PlayerMinusBtn }, { element: PlayerPlusBtn }]}
                        containerStyle={{height: 40, width: 80, fontSize: 50}}
                        buttonStyle={{fontSize: 40, width: 40, alignSelf: 'flex-end'}}
                        disabled={names.length === 1 ? [0] : []}
                        disabledTextStyle={{color: '#ffffff'}}
                        disabledStyle={{opacity: 0.2}}
                    />
                </View>
            </View>
            <FlatList
                data={names}
                renderItem={nameInputRender}
                keyExtractor={(item, index) => index.toString()}
                style={{flexGrow: 1}}

            />
            <View style={{width: '80%', alignSelf: 'center'}}>
                <Button 
                    title="Starta Figurrunda"
                    onPress={startNewGame}
                    buttonStyle={{alignSelf: 'center', padding: 20, marginBottom: 10, width: '100%'}}
                >
                </Button>
                {storedGame &&
                <Button 
                    title="Återuppta Figurrunda"
                    onPress={resumeGame}
                    buttonStyle={{alignSelf: 'center', padding: 20, marginBottom: 10, width: '100%'}}
                >
                </Button>
                }       
            </View>

        </View>
        </DismissKeyboard>
        </SafeAreaView>
        
    );
}

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
);