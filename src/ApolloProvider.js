import React from 'react'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { getMainDefinition } from '@apollo/client/utilities'
import { split, HttpLink } from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'

import App from './App'

const token = localStorage.getItem('jwtToken')

const httpLink = new HttpLink({
    uri: `https://damp-headland-47501.herokuapp.com/graphql`
})

const authLink = setContext(() => ({ headers: { Authorization: token ? 'Bearer ' + token : '' }}))


const wsLink = new WebSocketLink({
    uri: 'wss://damp-headland-47501.herokuapp.com/graphql', options: { reconnect: true, connectionParams: { authToken: token ? 'Bearer ' + token : '' }}
})

const link = split(
    ({ query }) => {
        const definition = getMainDefinition(query)
        
        return (
            definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
        )
    }, wsLink, authLink.concat(httpLink)
)

const client = new ApolloClient({
    link, cache: new InMemoryCache()
})

export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)