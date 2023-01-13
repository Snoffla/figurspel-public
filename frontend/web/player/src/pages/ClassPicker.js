import React, { useState} from 'react';

import Select from 'react-select' 

export default function ClassPicker({onChange = () => {}}) {
    const [items] = useState([
        {label: 'Herr', value: 'm'},
        {label: 'Dam', value: 'w'},
        {label: 'Rullstol', value: 'r'},
        {label: 'Junior', value: 'j'}
    ]);

    return (
        <Select 
            options={items} className='mb-4'
            isClearable={false}
            isSearchable={true}
            placeholder='Välj klass'
            onChange={(e) => {
                onChange(e.value)
            }}
            className='text-left'
        />
    );
}
