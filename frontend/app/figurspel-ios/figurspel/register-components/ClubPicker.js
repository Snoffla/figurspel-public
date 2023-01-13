import React, { useState, useEffect} from 'react';
import {StyleSheet, Keyboard} from 'react-native';

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

    return (
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onOpen={Keyboard.dismiss}
            placeholder='Välj förening'
            style={{borderRadius: 0, borderColor: colors.primary, borderWidth: 1}}
            dropDownContainerStyle={{borderRadius: 0, borderColor: colors.primary, borderWidth: 1}}
            dropDownDirection="BOTTOM"
        />
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
