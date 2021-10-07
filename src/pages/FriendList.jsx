import React from 'react'
import { useParams } from 'react-router-dom'

import Home from './Home'

function FriendList() {
    const { friendName } = useParams()

    return (
        <Home friendName={friendName}/>
    )
}

export default FriendList
