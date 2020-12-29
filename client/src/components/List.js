import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {Table} from "./Table";
import SearchForm from "./SearchForm";
import {EmplContext} from "../App";


export function List() {

    const {request, error, clearError} = useHttp()
    const [listEmpl, setEmpl] = useState([])
    const [data, setData] = useState('')
   const {nameHandler,searchName} = useContext(EmplContext)
    const {errorHandler} = useContext(EmplContext)
    const deleteHandler = async (id) => {
        try {
            const data = await request(`api/employees/${id}/delete`, 'DELETE')
            setData(data)
        } catch (e) {
        }
    }

    const getEmployees = async () => {
        try {
            const data = await request('api/employees')
            return data
        } catch (e) {
        }
    }
    useEffect(() => {
        nameHandler('')
        errorHandler(error)
    },[error,clearError])

    useEffect(() => {
        clearError()
        getEmployees().then(response => setEmpl(response))
    }, [data,clearError]);

    const saveHandler = async (id, form) => {
        try {
            await request(`api/employees/${id}`, 'PUT', {...form})
        } catch (e) {
        }
    }

    const searchHandler = (employee) => {
        nameHandler(employee)
    }

    function filterSearch (n){
        for (let val of n) {
            if (val.includes(searchName)) {
                return true
            }
        }
        return false
    }

    return (

        <div>
            <div className={'container'}>
                <SearchForm searchHandler={searchHandler}/>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Passport number</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Tel</th>
                        <th>Address</th>
                        <th>Date of birth</th>
                    </tr>
                    </thead>
                    <tbody>
                    {listEmpl ? listEmpl.filter(n => n.id.toLowerCase().includes(searchName) ||
                    n.firstName.toLowerCase().includes(searchName) ||
                    n.lastName.toLowerCase().includes(searchName) ||
                    n.tel.toLowerCase().includes(searchName)).map((empl) => <Table deleteHandler={deleteHandler}
                                            saveHandler={saveHandler}
                                            key={empl.id} empl={empl}/>) : ''}
                    </tbody>
                </table>
            </div>
        </div>
    )
}