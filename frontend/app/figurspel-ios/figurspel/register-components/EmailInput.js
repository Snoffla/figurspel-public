import React, { useState, useEffect} from 'react';
import {View, StyleSheet, StatusBar, Keyboard,  TouchableWithoutFeedback, ScrollView} from 'react-native';

import { Button, Text, Input} from 'react-native-elements';

import {MainTheme} from '../theme/light';

import Icon from 'react-native-vector-icons/Ionicons';

import DatePicker from './DatePicker';

import { getPlayerByEmail } from '../util/server/players';

export default function EmailInput({onSubmit}) {
    const colors = MainTheme.colors;
    const [email, setEmail] = useState('');

    function emailChange(email){
        setEmail(email);
    }

    function submitEmail(){
        getPlayerByEmail(email).then((player) => {
            if(player.id){
                onSubmit(player);
            }else{
                onSubmit({email: email});
            }
        }).catch((err) =>{});
    }
   
    return (
        <>
            <Input 
                placeholder='exempel@curlingfigur.se'
                label='Spelarens e-post'
                onChangeText={emailChange}
                errorMessage={validateEmail(email) ? '' : 'Ange e-post'}
                errorStyle={{ color: colors.error }}
                autoCompleteType='email'
                autoCorrect={false}
                autoFocus={true}
                autoCapitalize = 'none'
                keyboardType='email-address'
            />
            <Button
                title='Fortsätt'
                onPress={submitEmail}
                buttonStyle={{paddingHorizontal: 20, marginTop: 20}}
                iconRight={true}
                icon={<Icon name="chevron-forward-outline" size={30} color={colors.lightText} />}
            />
        </>
    );
}

const validateEmail = (email) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return expression.test(String(email).toLowerCase())
}