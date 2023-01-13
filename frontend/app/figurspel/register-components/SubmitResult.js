import React, { useState} from 'react';
import {View, StyleSheet, Linking} from 'react-native';

import { Button, Text, CheckBox} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {MainTheme} from '../theme/light';

import { getEventClub } from '../util/server/events';
import { createScore } from '../util/server/scores';

import ClassPicker from './ClassPicker';

import Figures from '../data/figureSettings';

export default function SubmitResult({onSubmit, player, event, score, gameType}) {
    const [club, setClub] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [termsAccepted, setTermsAccepted] = useState(false);
    const [playerClass, setPlayerClass] = useState(null);

    const [medal, setMedal] = useState(null);

    useState(() => {
        getEventClub(event.id, player.clubId).then((club) => {
            setClub(club);
            setLoading(false);
        }).catch(err => {});
    }, [])

    function onTermsPress(){
        Linking.openURL('https://figur.snoffla.com/policy');
    }

    function onPlayerClassChanged(playerClass){
        if(playerClass){
            setMedal(getMedal(score, gameType, playerClass));
        }
        setPlayerClass(playerClass);
    }

    function submitResult(){
        setSaving(true);
        createScore(event.id, event.code, gameType, player.id, score, playerClass)
        .then((data) => {
            setSaving(false);
            onSubmit();
        })
        .catch((err) => {
            setSaving(false);
        })
    }
   
    return (
        <View style={styles.formContainer}>
            {(!club.enabled && !loading && !saving) && 
                <Text>Din förening deltar tyvärr inte i denna tävling.</Text>
            }
            {(club.enabled == true && !saving) &&
            <>
                <Text h3 style={styles.headerText}>{event.title}</Text>
                <View>
                    <Text h3 style={[styles.textCenter]}>{player.name}</Text>
                    <Text  style={[styles.textCenter]}>{club.name}</Text>
                </View>

                <View style={{marginTop: 10}}>
                    <Text h1 style={[styles.textCenter]}>{score}</Text>
                </View>

                <View style={[styles.inputView, {zIndex: 100}]}>
                    <ClassPicker onChange={onPlayerClassChanged}/>
                </View>

                {medal &&
                    <View style={{marginTop: 10}}>
                        <Text style={[styles.textCenter], {fontWeight: 'bold', fontSize: 14}}>Grattis!! Du har tagit stipulationsmärket: {medal.title}</Text>
                        <Text style={{textDecorationLine: 'underline'}} onPress={() => Linking.openURL(Figures[gameType].medalsURL)}>
                            Läs mer och beställ märke
                        </Text>
                    </View>
                }
                
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 30}}>
                    <CheckBox
                        checked={termsAccepted}
                        onPress={() => {setTermsAccepted(!termsAccepted)}}
                        style={styles.checkBox}
                        containerStyle={styles.checkBoxContainer}
                        checkedIcon={<Ionicons name="checkbox-outline" size={25} color={colors.success} />}
                        uncheckedIcon={<Ionicons name="square-outline" size={25} color="black" />}
                    />
                    <Text>Jag godkänner </Text>
                    <Text style={{textDecorationLine: 'underline'}} onPress={onTermsPress}>användarvillkoren</Text>
                </View>

                <Button
                    title='Rapportera'
                    onPress={submitResult}
                    disabled={!termsAccepted || !playerClass}
                    buttonStyle={{paddingHorizontal: 20, marginTop: 20}}
                />

            </>
            }
            {saving &&
                <Text>Sparar...</Text>
            }

        </View>
    );
}

const getMedal = (score, gameType, playerClass)=>{
    var playerClass = playerClass ? playerClass : 'm';

    var medals = Figures[gameType].medals;
    if(medals.length == 0){
        return;
    }
    if(!(playerClass in medals[0].score)){
        playerClass = 'm';
    }
    if(medals.length == 0){
        return null;
    }

    var medalWon = null;

    for(var i = 0; i < medals.length; i++){
        if(score > medals[i].score[playerClass]){
            medalWon = medals[i];
        }else{
            break;
        }
    }
    return medalWon;
}

const colors = MainTheme.colors;
const styles = StyleSheet.create({
    headerText:{
        marginBottom: 40,
        fontWeight: '500'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    formContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        marginHorizontal: 20,
        backgroundColor: colors.background
    },

    textCenter:{
        textAlign: 'center'
    },
    checkbox: {
        margin: 0
    },
    checkBoxContainer: {
        margin: 0,
        padding: 0,
        display: 'flex',
    },
    inputView:{
        width: '100%',
        paddingHorizontal: 10,
        marginTop: 10,
    }
});