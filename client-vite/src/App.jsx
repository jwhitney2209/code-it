import { ApolloProvider, createHttpLink, ApolloClient, InMemoryCache } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

import { Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Console from "./pages/Console"

// setup apollo client
const httpLink = createHttpLink({
  uri: `${import.meta.env.VITE_APP_API_URL}/graphql` || "/graphql",
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token")
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/console" element={<Console />} />
      </Routes>
    </ApolloProvider>
  )
}

export default App
