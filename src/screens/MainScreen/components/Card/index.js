import React, { useState, useEffect } from 'react'
import add from '../../../../assets/add.webp'
import './styles.css'

const Card = (props) => {
    const { title, price, id } = props;
    const [isOn, setIsOn] = useState(true);
    const [hover, setHover] = useState(false);
    const [name, setName] = useState("Enter Name");
    const [email, setEmail] = useState("Enter Email");
    const [isEditing, setIsEditing] = useState(false);

    const [cardData, setCardData] = useState([])


    function handleDel() {
        let temp = JSON.parse(localStorage.getItem('grappusAllContacts'))
        let data = [...temp]
        data.splice(id, 1)
        localStorage.setItem('grappusAllContacts', JSON.stringify([...data]))


    }


    function handleChange(e, val) {
        let event = e.target.value
        let temp = [...cardData]


        // if (val == 'a') {
        temp[id].name = event
        setName(event)
        setCardData(temp)
        // } else {
        //     setEmail(event)
        //     cardData[id].email = event

        // }
    }
    function handleOk(e) {
        e.preventDefault()
        localStorage.setItem('grappusAllContacts', JSON.stringify([...cardData]))
    }
    function handleCancel(e) {
        e.preventDefault()
        setCardData(JSON.parse(localStorage.getItem('grappusAllContacts')))

    }
    useEffect(() => {
        let temp = JSON.parse(localStorage.getItem('grappusAllContacts'))
        let data = [...temp]
        // setName(data[id].name)
        // setEmail(data[id].email)

        setCardData(data)

    }, [])

    return (


        <div key={`hello${id}`}>
            {props.mainCard ? <div class="cardMain">
                <div class='addBlock'>
                    <img className='addIcon' src={add} alt="" />
                    <h4>Create New Contact</h4>
                </div>


            </div> :
                <div class="card" onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}>
                    <img src="https://lh3.googleusercontent.com/ytP9VP86DItizVX2YNA-xTYzV09IS7rh4WexVp7eilIcfHmm74B7odbcwD5DTXmL0PF42i2wnRKSFPBHlmSjCblWHDCD2oD1oaM1CGFcSd48VBKJfsCi4bS170PKxGwji8CPmehwPw=w200-h247-no" alt="Person" class="card__image" />
                    <input
                        className="card__name"
                        defaultValue={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        // value={name}
                        disabled={isOn}
                        maxLength="13"
                        placeholder='Enter name'
                    />

                    <input
                        className="card__email"
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        defaultValue={email}
                        disabled={isOn}
                        placeholder='Enter Email'
                        maxLength="18"
                    />
                    {hover && <div class="grid-container">

                        {isEditing ? <div class="grid-child-posts">
                            <a onClick={(e) => {
                                setIsOn(!false)
                                setIsEditing(false)
                                handleOk(e)
                            }
                            } className="button1" >OK</a>
                            <a className="button2" onClick={(e) => {
                                setIsOn(!false)
                                setIsEditing(false)
                                handleCancel(e)
                            }}>Cancel</a>

                        </div> : <div class="grid-child-posts">
                            <a onClick={() => {
                                setIsOn(!true)
                                setIsEditing(true)
                            }}
                                className="button1">Edit</a>
                            <a className="button2" onClick={handleDel}>Delete</a>

                        </div>}

                    </div>}
                </div>}
        </div>



    )
}

export default Card
