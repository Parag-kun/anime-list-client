import gql from 'graphql-tag'

export const ADD_ANIME = gql`
    mutation($name: String!, $score: Int!, $status: String!) {
        addAnime(name: $name, score: $score, status: $status) {
            id
        }
    }
`

export const GET_USER_ANIMES = gql`
    query($username: String!) {
        getUserAnimes(username: $username) {
            id animeName score rating status imageURL
            members {
                plan
                watching
                completed
            }
        }
    }
`

export const GET_USER_ANIMES_FOR_RANKING = gql`
    query($username: String!, $sortBy: String) {
        getUserAnimes(username: $username, sortBy: $sortBy) {
            status rating animeName
        }
    }
`

export const GET_ANIMES = gql`    
    query($sortBy: String) {
        getAnimes(sortBy: $sortBy) {
            id name rating ratedBy imageURL members {
                plan watching completed
            }
        }
    }
`

export const EDIT_ANIME = gql`
    mutation($name: String!, $score: Int, $status: String, $imageURL: String) {
        updateAnime(name: $name, score: $score, status: $status, imageURL: $imageURL) {
            id animeName score rating status imageURL members {
                plan watching completed
            }
        }
    }
`


export const REGISTER = gql`
    mutation($username: String!, $password: String!, $confirmPassword: String!) {
        register(username: $username, password: $password, confirmPassword: $confirmPassword) {
            username token 
        }
    }
`

export const LOGIN = gql`
    mutation($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            username token 
        }
    }
`

export const DELETE_AMIME = gql`
    mutation($name: String!) {
        deleteAnime(name: $name) {
            id
        }
    }
`