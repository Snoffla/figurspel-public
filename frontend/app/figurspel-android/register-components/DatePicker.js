import React, { useState, useEffect} from 'react';
import {View, Keyboard,  TouchableWithoutFeedback, ScrollView} from 'react-native';

import {MainTheme} from '../theme/light';

import DropDownPicker from 'react-native-dropdown-picker';



export default function DatePicker({onChange = ()=>{}}) {
    const colors = MainTheme.colors;

    const [year, setYear] = useState(null);
    const [month, setMonth] = useState(null);
    const [day, setDay] = useState(null);

    const [months, setMonths] = useState(monthsList);
    const [years, setYears] = useState(getYears);
    const [days, setDays] = useState(getDays);

    const [monthOpen, setMonthOpen] = useState(false);
    const [yearOpen, setYearOpen] = useState(false);
    const [dayOpen, setDayOpen] = useState(false);

    useEffect(() => {
        if (year != null && month != null && day != null){
            const date = new Date(Date.UTC(year, month-1, day));
            onChange(date);
        }
    }, [year, month, day])

    useEffect(() => {
        const keyboardListener = Keyboard.addListener('keyboardWillShow', ()=>{
            setYearOpen(false);
            setMonthOpen(false);
            setDayOpen(false);
        });

        return ()=>{keyboardListener.remove()};
    },[])

    const onDayOpen = () => {
        Keyboard.dismiss();
        setMonthOpen(false);
        setYearOpen(false);
    }

    const onMonthOpen = () => {
        Keyboard.dismiss();
        setDayOpen(false);
        setYearOpen(false);
    }

    const onYearOpen = () => {
        Keyboard.dismiss();
        setDayOpen(false);
        setMonthOpen(false);
    }

    const containerStylesOpen = () =>{
        if(yearOpen || monthOpen || dayOpen){
            return {minHeight: 1000}
        }else return {}
    }
    
   
    return (
        <View style={[{flexDirection: 'row', width: '100%'}, containerStylesOpen()]}>
            <DropDownPicker
                open={dayOpen}
                value={day}
                items={days}
                setOpen={setDayOpen}
                setValue={setDay}
                setItems={setDays}
                onOpen={onDayOpen}
                placeholder='Dag'
                dropDownDirection="BOTTOM"
                style={{borderRadius: 0, borderColor: colors.primary, borderWidth: 1}}
                dropDownContainerStyle={{borderRadius: 0, borderColor: colors.primary, borderWidth: 1}}
                containerProps={{
                    style: {flex: 2}
                }}
            />
            <DropDownPicker
                open={monthOpen}
                value={month}
                items={months}
                setOpen={setMonthOpen}
                setValue={setMonth}
                setItems={setMonths}
                onOpen={onMonthOpen}
                placeholder='Månad'
                dropDownDirection="BOTTOM"
                style={{borderRadius: 0, borderColor: colors.primary, borderWidth: 1}}
                dropDownContainerStyle={{borderRadius: 0, borderColor: colors.primary, borderWidth: 1}}
                containerProps={{
                    style: {flex: 3}
                }}
            />
            <DropDownPicker
                open={yearOpen}
                value={year}
                items={years}
                setOpen={setYearOpen}
                setValue={setYear}
                setItems={setYears}
                onOpen={onYearOpen}
                placeholder='År'
                dropDownDirection="BOTTOM"
                style={{borderRadius: 0, borderColor: colors.primary, borderWidth: 1}}
                dropDownContainerStyle={{borderRadius: 0, borderColor: colors.primary, borderWidth: 1}}
                containerProps={{
                    style: {flex: 2}
                }}
            />
        </View>
    );
}

function getYears(){
    const currentYear = new Date().getFullYear();
    var years = [];

    for (let year = currentYear; year > currentYear-120; year--) {
        years.push({label: `${year}`, value: year})
    }
    return years;
}

function getDays(){
    var days = [];

    for (let day = 1; day <= 31; day++) {
        days.push({label: `${day}`, value: day})
    }
    return days;
}

const monthsList = [
    {label: 'Januari', value: 1},
    {label: 'Februari', value: 2},
    {label: 'Mars', value: 3},
    {label: 'April', value: 4},
    {label: 'Maj', value: 5},
    {label: 'Juni', value: 6},
    {label: 'Juli', value: 7},
    {label: 'Augusti', value: 8},
    {label: 'September', value: 9},
    {label: 'Oktober', value: 10},
    {label: 'November', value: 11},
    {label: 'December', value: 12},

]