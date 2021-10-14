import React from 'react'
import { useQuery, useSubscription } from '@apollo/react-hooks'
import { GET_USERS, SUBSCRIPTION } from '../utils/queries'

import UserCard from './UserCard'

function SearchUsers({ searchString }) {
    let { loading, data: { getUsers: users = [] } = {} } = useQuery(GET_USERS, {
        variables: { searchString }
    })

    const { data: { updateRelation } = {}} = useSubscription(SUBSCRIPTION)

    if (updateRelation) {
        users = users.filter(({ name }) => name !== updateRelation.name)
        users.push(updateRelation)
    }

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
