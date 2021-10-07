import React, { useContext} from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_ANIMES, GET_USER_ANIMES } from '../utils/queries'

import AnimeCard from './AnimeCard'
import { AuthContext } from '../context/Auth'

function SearchAnimes({ searchString }) {
    const { user: { username }} = useContext(AuthContext)

    const { loading, data: { getAnimes: animes = [] } = {} } = useQuery(GET_ANIMES, {
        variables: { searchString }
    })

    const { data: { getUserAnimes: userAnimes = [] } = {} } = useQuery(GET_USER_ANIMES, {
        variables: { username }
    })

    return (
        <React.Fragment>
            {
                loading ? (
                    <h4>Loading....</h4>
                ) : (
                    animes?.map(({ id, name, rating, members, imageURL, ratedBy }, index) => (
                        <AnimeCard key={id} name={name} rating={rating} members={members} imageURL={imageURL} status={userAnimes.find(({ animeName }) => animeName === name)?.status} renderMembers={true} ratedBy={ratedBy}/>
                    )) || (
                        <h2>No Anime In The List</h2>
                    )
                )
            }
        </React.Fragment>
    )
}

export default SearchAnimes
