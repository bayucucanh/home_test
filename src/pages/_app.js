import '@/styles/globals.css'
import { store } from '@/store'
import { Provider } from 'react-redux'
import Auth from '@/components/Auth'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Auth token={pageProps.token} />
      <Component {...pageProps} />
    </Provider>
  )
}
