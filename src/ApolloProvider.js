import React from 'react'
import ApolloClient from 'apollo-client'
import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'

import App from './App'

const token = localStorage.getItem('jwtToken')

const httpLink = createHttpLink({
    uri: `https://damp-headland-47501.herokuapp.com/`
})

const authLink = setContext(() => ({ headers: { Authorization: token ? 'Bearer ' + token : '' }}))

const client = new ApolloClient({
    link: authLink.concat(httpLink), cache: new InMemoryCache()
})

export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
)