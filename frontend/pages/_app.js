import Footer from '../components/Footer';
import Header from '../components/Header';
import { Provider } from 'react-redux';
import '../styles/globals.css';
import store from '../redux-toolkit-state/store';


function MyApp({ Component, pageProps }) {

  return (
    <Provider store={store}>
        <div className='bg-gray-800'>
          <div className='bg-white max-w-7xl mx-auto px-3'>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </div>
        </div>
    </Provider>
  )
}

export default MyApp;