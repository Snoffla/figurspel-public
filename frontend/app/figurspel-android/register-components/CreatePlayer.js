import React, { useState, useEffect} from 'react';
import {View, StyleSheet, StatusBar, Keyboard,  TouchableWithoutFeedback, ScrollView} from 'react-native';

import { Button, Text, Input} from 'react-native-elements';

import {MainTheme} from '../theme/light';

import Icon from 'react-native-vector-icons/Ionicons';

import DatePicker from './DatePicker';
import ClubPicker from './ClubPicker';

import { createPlayer } from '../util/server/players';

export default function CreatePlayer({onSubmit, email, code}) {
    const colors = MainTheme.colors;
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState(null);
    const [club, setClub] = useState(null);

    const [error, setError] = useState('');
    const [saving, setSaving] = useState(false);

    function onNameChange(name){
        setName(name);
    }
    function onBirthDateChanged(date){
        setBirthDate(date);
    }

    function onClubChanged(club){
        setClub(club);
    }

    function submitPlayer(){
        if(validateName(name) && birthDate && club){
            const player = {
                email: email,
                name: name,
                birthDate: birthDate,
                clubId: club.id
            }
            setSaving(true);
            createPlayer(player, code).then((data) => {
                if (!data.id){
                    setError('Kunde inte skapa spelare');
                    return;
                }
                player.id = data.id;
                onSubmit(player);
            }).catch((error) => {
                setError('Kunde inte skapa spelare');
            })
        }else{
            return;
        }
    }
   
    return (
        <>
            <Input 
                placeholder=''
                label='Namn'
                onChangeText={onNameChange}
                errorMessage={validateName(name) ? '' : 'Ange namn'}
                errorStyle={{ color: colors.error }}
                autoCompleteType='name'
                autoFocus={true}
                autoCapitalize = 'words'
            />
            <View style={[styles.inputView, {zIndex: 500}]}>
                <Text style={styles.label}>Födelsedatum</Text>
                <DatePicker date={birthDate} onChange={onBirthDateChanged}/>
            </View>
            <View style={[styles.inputView, {zIndex: 400}]}>
                <Text style={styles.label}>Förening</Text>
                <ClubPicker onChange={onClubChanged}/>
            </View>
            {!saving && 
                <Button
                    title='Fortsätt'
                    onPress={submitPlayer}
                    buttonStyle={{paddingHorizontal: 20, marginTop: 20}}
                    iconRight={true}
                    icon={<Icon name="chevron-forward-outline" size={30} color={colors.lightText} />}
                />
            }
            <Text style={{color: colors.error}}>{error}</Text>
        </>
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
    },
    label:{
        color: '#86939e',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8
    },
    inputView:{
        width: '100%',
        paddingHorizontal: 10,
        marginTop: 10,
    }
});

const validateName = (name) => {
    const expression = /(\S+)\s(\S+)/;
    return expression.test(String(name).toLowerCase())
}

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
);