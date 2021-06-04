import React, { useEffect, useState } from 'react'
import './styles.css'
import './components/Card/styles.css'
import Card from './components/Card'

const MainScreen = () => {
    let data = []
    const [contacts, setContacts] = useState(data)
    const [search, setSearch] = useState('')
    let key = 1

    const filterData = contacts.filter((obj) => obj.name.toLowerCase().includes(search.toLowerCase()) || obj.email.toLowerCase().includes(search.toLowerCase()))

    function handleAdd(e) {
        e.preventDefault()
        key = key + 1
        let temp = {
            name: 'Name',
            email: 'Email',
            key: key
        }
        data = contacts || []
        data.push(temp)
        setContacts([...data])
        localStorage.setItem('grappusAllContacts', JSON.stringify([...data]))
        console.log('contacts', contacts, 'data', data, 'localstorage', localStorage.getItem('grappusAllContacts'));
    }

    useEffect(() => {

        data = JSON.parse(localStorage.getItem('grappusAllContacts'))

        setContacts(data || [])

        console.log('effect', data);

    }, [data]);

    return (
        <div>
            <section id='search'><input id='inputBox' onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search...' /></section>
            <div id='area'>
                <section id="contacts-section" className="card-container">
                    <div onClick={(e) => handleAdd(e)}>
                        <Card title="Product" price="1" mainCard={true} src={''} />
                    </div>
                    {
                        filterData.map((obj, id) => {
                            return (
                                <Card id={id} />
                            )
                        })
                    }


                </section>
            </div>
        </div>
    )
}

export default MainScreen
