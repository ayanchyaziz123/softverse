import Footer from '../components/Footer';
import Header from '../components/Header';
import { Provider } from 'react-redux';
import '../styles/globals.css';
import store from '../redux-toolkit-state/store';
import { useEffect, useState } from 'react';


function MyApp({ Component, pageProps }) {
  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, [])

  return (
    <>
      {
        domLoaded && (
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
    </>
  )
}

export default MyApp;