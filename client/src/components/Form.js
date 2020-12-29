import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {EmplContext} from "../App";

export function Form() {

    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        id: '', firstName: '', lastName: '', tel: '', address: '', dateOfBirth: ''
    })
    const [message, setMessage] = useState('');

    const {errorHandler} = useContext(EmplContext)

    useEffect(() => {
        setMessage(error)
        errorHandler(error)
    }, [error, message, clearError])

    const saveHandler = async (e) => {
        e.preventDefault()
        try {

            await request('api/employees/create', 'POST', {id: form.id.trim(), firstName: form.firstName.trim(), lastName: form.lastName.trim(), tel: form.tel.trim(), address: form.address.trim(), dateOfBirth:form.dateOfBirth.trim() })
        } catch (e) {
        }
        setForm({id: '', firstName: '', lastName: '', tel: '', address: '', dateOfBirth: ''})
    }

    const changeHandler = event => {
        clearError()
        setForm({...form, [event.target.name]: event.target.value})
    }

    return (
        <form className="form" onSubmit={saveHandler}>
            <div className="form-group">
                <label className="form-control-label">Passport number</label>
                <input
                    className="form-control"
                    id={'id'}
                    name={'id'}
                    type="text"
                    value={form.id}
                    onChange={changeHandler}
                />
            </div>
            <div className="form-group">
                <label className="form-control-label">First Name</label>
                <input
                    className="form-control"
                    type="text"
                    id='firstName'
                    name={'firstName'}
                    value={form.firstName}
                    onChange={changeHandler}
                />
            </div>
            <div className="form-group">
                <label className="form-control-label">Last Name</label>
                <input
                    className="form-control"
                    type="text"
                    id='lastName'
                    name={'lastName'}
                    value={form.lastName}
                    onChange={changeHandler}
                />
            </div>
            <div className="form-group">
                <label className="form-control-label">Telephone</label>
                <input
                    className="form-control"
                    type="tel"
                    id='tel'
                    name={'tel'}
                    value={form.tel}
                    onChange={changeHandler}
                />
            </div>
            <div className="form-group">
                <label className="form-control-label">Address</label>
                <input
                    className="form-control"
                    type="text"
                    id='address'
                    name={'address'}
                    value={form.address}
                    onChange={changeHandler}
                />
            </div>
            <div className="form-group">
                <label className="form-control-label">Date of birth</label>
                <input
                    className="form-control"
                    type="date"
                    id='dateOfBirth'
                    name={'dateOfBirth'}
                    value={form.dateOfBirth}
                    onChange={changeHandler}
                    min="1900-04-01" max="2017-04-20" required
                />
            </div>
            <div className="form-group-right">
                <button
                    className="form-button"
                    type="submit"
                    disabled={loading}
                >
                    Save
                </button>
            </div>
            <span>{message}</span>
        </form>
    )
}