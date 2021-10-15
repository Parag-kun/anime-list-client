import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_USERS } from '../utils/queries'

import UserCard from './UserCard'

function SearchUsers({ searchString }) {
    let { loading, data: { getUsers: users = [] } = {} } = useQuery(GET_USERS, {
        variables: { searchString }
    })

    return (
        <React.Fragment>
            {
                loading ? (
                    <h4>Loading</h4>
                ) : (
                    users.length ? users.map(friend => <UserCard key={friend?.name} friend={friend} searchString={searchString} />) : <h4>No user found</h4>
                )
            }
        </React.Fragment>
    )
}

export default SearchUsers
