import React, { useState, useEffect} from 'react';
import {StyleSheet, Keyboard} from 'react-native';

import {MainTheme} from '../theme/light';

import DropDownPicker from 'react-native-dropdown-picker';

const classTypes = [
    {value: 'm', label: 'Herr'},
    {value: 'w', label: 'Dam'},
    {value: 'r', label: 'Rullstol'},
    {value: 'j', label: 'Junior'},
] 

export default function ClassPicker({onChange}) {
    const colors = MainTheme.colors;

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(classTypes);

    useEffect(() => {
        onChange(value);
    }, [value]);

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
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onOpen={Keyboard.dismiss}
            placeholder='Välj klass'
            style={{borderRadius: 0, borderColor: colors.primary, borderWidth: 1}}
            dropDownContainerStyle={{borderRadius: 0, borderColor: colors.primary, borderWidth: 1}}
            dropDownDirection="BOTTOM"
            containerStyle={containerStylesOpen()}
        />
    );
}

const colors = MainTheme.colors;
const styles = StyleSheet.create({});
