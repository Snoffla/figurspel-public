import React, { useState } from 'react';
import {View, StyleSheet} from 'react-native';

import { Button, Text, Input} from 'react-native-elements';

import {MainTheme} from '../theme/light';

import Icon from 'react-native-vector-icons/Ionicons';

import DropDownPicker from 'react-native-dropdown-picker';

import { getEventsByPassword } from '../util/server/events';

export default function EventPicker({onSubmit}) {
    const colors = MainTheme.colors;
    const [code, setCode] = useState('');
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
  
    function codeChange(code){
        setCode(code)
    }

    function submitCode(){
        setLoading(true);
        setError('');
        getEventsByPassword(code).then((data) => {
            setLoading(false);
            if (data.length == 0){
                setError('Tävling hittades inte');
            }
            else if (data.length == 1){
                submitEvent( null,data[0]);
            }
            else {
                setEvents(data);
                setItems(eventsToItems(data));
            }
        }).catch((err) =>{});
    }

    function submitEvent(e, event = events[value]){
        if (!event){return}
        event.code = code;
        onSubmit(event)
    }

    const containerStylesOpen = () =>{
        if(open){
            return {minHeight: 1000}
        }else return {}
    }

    return (
    <>
        {events.length < 1 
        ?   <>
            <Input 
                label='Kod'
                onChangeText={codeChange}
                autoCorrect={false}
                autoFocus={true}
                errorMessage={error}
                errorStyle={{ color: colors.error }}
            />
            {loading && <Text>Hämtar...</Text>}
            { !loading &&
            <Button
                title='Fortsätt'
                onPress={submitCode}
                buttonStyle={{paddingHorizontal: 20, marginTop: 20}}
                iconRight={true}
                icon={<Icon name="chevron-forward-outline" size={30} color={colors.lightText} />}
            />
            }
            </>
        :   <>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder='Välj tävling'
                style={{borderRadius: 0, borderColor: colors.primary, borderWidth: 1}}
                dropDownContainerStyle={{borderRadius: 0, borderColor: colors.primary, borderWidth: 1}}
                dropDownDirection="BOTTOM"
                containerStyle={containerStylesOpen()}
            />
            <Button
                title='Fortsätt'
                onPress={submitEvent}
                buttonStyle={{paddingHorizontal: 20, marginTop: 20}}
                iconRight={true}
                icon={<Icon name="chevron-forward-outline" size={30} color={colors.lightText} />}
            />
            </>
        }
        
    </>
    );
}

function eventsToItems(events){
    var items = [];
    events.forEach((event)=>{
        items.push({label: event.title, value: items.length})
    })
    return items;
}

const colors = MainTheme.colors;
const styles = StyleSheet.create({});
