import gql from 'graphql-tag'

export const ADD_ANIME = gql`
    mutation($name: String!, $score: Int!, $status: String!) {
        addAnime(name: $name, score: $score, status: $status) {
            id animeName score rating status imageURL members {
                plan
                watching
                completed
            }
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

export const GET_ANIMES = gql`    
    query($sortBy: String, $searchString: String) {
        getAnimes(sortBy: $sortBy, searchString: $searchString) {
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
            id name
        }
    }
`

export const GET_FRIENDS = gql`
    query($relation: String!) {
        getSpecificUsers(relation: $relation) {
            name friend text
        }
    }
`

export const ADD_FRIENDS = gql`
    mutation($clickerName: String!, $receiverName: String!) {
        addFriend(clickerName: $clickerName, receiverName: $receiverName) {
            name text
        }
    }
`

export const REMOVE_FRIENDS = gql`
    mutation($clickerName: String!, $receiverName: String!) {
        removeFriend(clickerName: $clickerName, receiverName: $receiverName) {
            name text
        }
    }
`

export const GET_USERS = gql`
    query($searchString: String!) {
        getUsers(searchString: $searchString) {
            name text
        }
    }
`

