import React from 'react'
import {useState} from "react";

export function Table(props) {

    const [update, setUpdate] = useState(false)

    const [form, setForm] = useState({
        id: props.empl.id,
        firstName: props.empl.firstName,
        lastName: props.empl.lastName,
        tel: props.empl.tel,
        address: props.empl.address,
        dateOfBirth: props.empl.dateOfBirth
    })

    const changeHandler = (event) => {
        setForm({...form, [event.target.name]: event.target.value.trim()})
    }


    return (
        <tr>
            <td ><input readOnly={!update} className={'table-input'} name={'id'} value={form.id} onChange={changeHandler}/></td>
            <td><input readOnly={!update} className={'table-input'} name={'firstName'} value={form.firstName} onChange={changeHandler}/>
            </td>
            <td><input readOnly={!update} className={'table-input'} name={'lastName'} value={form.lastName} onChange={changeHandler}/></td>
            <td><input  readOnly={!update}className={'table-input'} name={'tel'} value={form.tel} onChange={changeHandler}/></td>
            <td><input readOnly={!update} className={'table-input'} name={'address'} value={form.address} onChange={changeHandler}/></td>
            <td><input readOnly={!update} className={'table-input'} name={'dateOfBirth'} value={form.dateOfBirth}
                       onChange={changeHandler}/></td>
            {!update ? <td>
                    <button className={'button-update'} onClick={() => setUpdate(true)}>Update</button>
                </td>
                : <td>
                    <button className={'button-cancel'} onClick={() => setUpdate(false)}>Cancel</button>
                    <button className={'button-save'} onClick={() => {
                        props.saveHandler(props.empl.id, form);
                        setUpdate(false)
                    }}>Save
                    </button>
                </td>}

            <td>
                <button className={'button-delete'} onClick={() => props.deleteHandler(props.empl.id)}>Delete</button>
            </td>
        </tr>
    )
}