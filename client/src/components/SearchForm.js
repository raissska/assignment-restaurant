import React,{useState} from "react";

export default function Form(props) {
    const [employee, setEmployee] = useState('');

    const handlerCountry = (e) => {
        e.preventDefault();
        if (employee.trim() === '') return;
        props.searchHandler(employee.trim().toLowerCase());
        setEmployee('')
    };

    return (
        <form className={'form-search'} onSubmit={handlerCountry}>
            <input className={'input-search'}
                   type='text'
                   placeholder="Find a country"
                   value={employee}
                   onChange={e => setEmployee(e.target.value)}
            />
            <button className={'button-search'} type={'submit'}>Search</button>
        </form>
    )
}