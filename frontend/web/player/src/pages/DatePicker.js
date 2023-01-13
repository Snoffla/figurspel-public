import React, { useState, useEffect} from 'react';

import Select from 'react-select' 

export default function DatePicker({onChange = ()=>{}}) {

    const [year, setYear] = useState(null);
    const [month, setMonth] = useState(null);
    const [day, setDay] = useState(null);

    const [months] = useState(monthsList);
    const [years] = useState(getYears);
    const [days] = useState(getDays);

    useEffect(() => {
        if (year != null && month != null && day != null){
            const date = new Date(Date.UTC(year, month-1, day));
            onChange(date);
        }
    }, [year, month, day])

   
    return (
        <div style={{display: 'flex', flexDirection: 'row', width: '100%', zIndex: 100}}>
            <Select
                options={days}
                isClearable={false}
                isSearchable={true}
                placeholder='Dag'
                styles={{container: (provided, state) => ({
                    ...provided,
                    flex: 2,
                  })
                }}

                onChange={(item) => setDay(item.value)}
            />
            <Select
                options={months}
                isClearable={false}
                isSearchable={true}
                placeholder='Månad'
                styles={{container: (provided, state) => ({
                    ...provided,
                    flex: 3,
                  })
                }}
                onChange={(item) => setMonth(item.value)}
            />
            <Select
                options={years}
                isClearable={false}
                isSearchable={true}
                placeholder='År'
                styles={{container: (provided, state) => ({
                    ...provided,
                    flex: 2,
                  })
                }}

                onChange={(item) => setYear(item.value)}
            />
        </div>
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