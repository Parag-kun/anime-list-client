import { gql } from 'apollo-boost'

export const addUser = gql`
    mutation($name: String!, $age: Number!) {
        addUser(name: $name, age: $age) {
            name
            age
        }
    }
`

export const getUsers = gql`
    {
        users {
            name
        }
    }
`