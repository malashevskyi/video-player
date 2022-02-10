import '../styles/globals.css'
import store from '../store'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { SWRConfig } from 'swr'

const fetcher = (...args) => {
  const [url] = args
  return fetch(url as string).then((res) => res.json())
}

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <SWRConfig value={{ fetcher }}>
          <Component {...pageProps} />
        </SWRConfig>
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
