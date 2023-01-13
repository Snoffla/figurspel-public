import React, { useState, useEffect} from 'react';
import {StyleSheet, Keyboard, View} from 'react-native';

import {MainTheme} from '../theme/light';

import DropDownPicker from 'react-native-dropdown-picker';

import { getClubs } from '../util/server/clubs';

export default function ClubPicker({onChange}) {
    const colors = MainTheme.colors;
    const [clubs, setClubs] = useState([]);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        onChange(clubs[value]);
    }, [value]);

    useEffect(() => {
        getClubs().then((clubs) => {
            setClubs(clubs);
            setItems(clubsToItems(clubs));
        })
        .catch((err) =>{})
    }, [])

    useEffect(() => {
        const keyboardListener = Keyboard.addListener('keyboardWillShow', ()=>{
            setOpen(false);
        });

        return ()=>{keyboardListener.remove()};
    },[])

    const containerStylesOpen = () =>{
        if(open){
            return {minHeight: 1000}
        }else return {}
    }

    return (
        <View style={[{width: '100%'},containerStylesOpen()]}>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={(val)=>{setOpen(val)}}
                setValue={(val)=>{setValue(val)}}
                setItems={(val)=>{setItems(val)}}
                onOpen={() => {Keyboard.dismiss}}
                placeholder='Välj förening'
                style={{borderRadius: 0, borderColor: colors.primary, borderWidth: 1}}
                dropDownContainerStyle={{borderRadius: 0, borderColor: colors.primary, borderWidth: 1}}
                dropDownDirection="BOTTOM"
            />
        </View>
    );
}

function clubsToItems(clubs){
    var items = [];
    clubs.forEach((club)=>{
        items.push({label: club.name, value: items.length})
    })
    return items;
}

const colors = MainTheme.colors;
const styles = StyleSheet.create({});
