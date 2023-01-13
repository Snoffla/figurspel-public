import React, { useState} from 'react';
import {View, StyleSheet} from 'react-native';

import { Button, Text} from 'react-native-elements';

import {MainTheme} from '../theme/light';

import Icon from 'react-native-vector-icons/Ionicons';

export default function PlayerResult({id, data, registerResult}) {
    const [score, setScore] = useState(data.score);
    const [name, setName] = useState(data.name);
    const reported = data.reported;

    function registerResultEvent(){
        registerResult(id, calcTotal(score));
    }


    return (
        <View style={styles.container}>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.scoreText}>Total: {calcTotal(score)}</Text>
            {!reported &&
            <Button
                title='Rapportera resultat'
                onPress={registerResultEvent}
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.button}
                titleStyle={styles.buttonTitle}
                type="outline"
            />
            }
            {reported &&
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Icon name="checkmark-circle-outline" size={25} color={colors.success} style={{width: 30}}/>
                    <Text style={{fontSize: 16, paddingRight: 30}}>Rapporterad</Text>
                </View>
            }
        </View>
    );
}


function calcTotal(score){
    var total = 0;
    for (let i = 0; i < score.length; i++) {
        total += calcTotalForFigure(i, score);
    }
    return total;
}

function calcTotalForFigure(figure, score){
    if(!score[figure]){return 0};
    var total = 0;
    for (let i = 0; i < score[figure].length; i++) {
        total += score[figure][i];
    }
    return total;
}

const colors = MainTheme.colors;
const styles = StyleSheet.create({
    container:{
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameText:{
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        color: colors.darkText
    },
    scoreText: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        color: colors.darkText,
    },
    button:{
        paddingHorizontal: 20,

    },
    buttonContainer:{
        marginTop: 10,
    },
    buttonTitle:{
        color: colors.primary
    }
});


