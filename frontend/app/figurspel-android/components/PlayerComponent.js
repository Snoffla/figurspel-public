import React, { useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';

import {Text, ButtonGroup, Overlay} from 'react-native-elements';

import {MainTheme} from '../theme/light';

import {setPlayerScore, isPlayerReported} from '../util/localStorage'


export default function PlayerComponent({id, currentFigure, figureCount, initialData}) {
    const [score, setScore] = useState(initialData.score);
    const [name, setName] = useState(initialData.name);

    const [scoreText, setScoreText] = useState(['-', '-', '-', '-'])

    const [showScoreInput, setShowScoreInput] = useState(false);
    const [scoreInputIndex, setScoreInputIndex] = useState(scoreInputIndex);

    // ---- Init score with null -----
    useEffect(() => {
        var newScore = [...score];
        for (let figure = 0; figure < figureCount; figure++) {
            if (newScore[figure] == undefined){
                newScore[figure] = [];
            }
            for (let stone = 0; stone < 4; stone++) {
                if(newScore[figure][stone] == undefined){
                    newScore[figure][stone] = null;
                }
            }
        }
        setScore(newScore)
    }, [])

    // ---- On score update translate to text -----
    useEffect(() =>{
        if (!score[currentFigure]){return};

        var scoreText = [];
        for (let i = 0; i < score[currentFigure].length; i++) {
            const point = score[currentFigure][i];
            if (point == null){
                scoreText[i] = '-';
            }else{
                scoreText[i] = point;
            }
        }
        setScoreText(scoreText);
    }, [score, currentFigure])

    
    function toggleScoreInput(){
        if(!showScoreInput){
            isPlayerReported(id)
            .then((reported) => {
                if(!reported){
                    setShowScoreInput(!showScoreInput);
                }
            }).catch((err) => {})
        }else{
            setShowScoreInput(!showScoreInput);
        }
    }

    function scoreSelect(index){
        setScoreInputIndex(index);
        toggleScoreInput();
    }

    function scoreInput(index){
        var newScore = [...score];
        newScore[currentFigure][scoreInputIndex] = index;
        setPlayerScore(id, newScore);
        setScore(newScore);
        setShowScoreInput(false);
    }



    return (
        <>
            <Text style={styles.nameText}>{name}</Text>
            <Text style={styles.scoreText}>Denna figur: {calcTotalForFigure(currentFigure, score)}  Total: {calcTotal(score)} </Text>
            <Text style={styles.scoreText}>Förväntat resultat: {calcExpected(score)}</Text>
            <ButtonGroup
                onPress={scoreSelect}
                buttons={scoreText}
                containerStyle={{height: 40}}
            />
                 
            <Overlay isVisible={showScoreInput} onBackdropPress={toggleScoreInput}>
                <ButtonGroup
                    onPress={scoreInput}
                    buttons={[0,1,2,3]}
                    containerStyle={{height: 60, width: '80%'}}
                />
            </Overlay>
        </>
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

function calcExpected(score){
    var scoreCount = 0;
    var totalCount = score.length*4;
    var total = 0;
    for (let figure = 0; figure < score.length; figure++) {
        if(!score[figure]){continue};
        for (let stone = 0; stone < score[figure].length; stone++) {
            const point = score[figure][stone];
            if(point != null){
                total += point;
                scoreCount++;
            }
        }
    }

    if (scoreCount == 0){
        return '-';
    }else{
        return Math.round((total/scoreCount) * totalCount);
    }
}

const colors = MainTheme.colors;
const styles = StyleSheet.create({
    nameText:{
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        color: colors.darkText
    },
    scoreText: {
        fontSize: 16,
        textAlign: 'center',
        color: colors.darkText,
    }
});


