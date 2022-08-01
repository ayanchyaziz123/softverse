import Footer from '../components/Footer';
import Header from '../components/Header';
import { Provider } from 'react-redux';
import '../styles/globals.css';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from "redux-persist";
import store from '../redux-toolkit-state/store';

let persistor = persistStore(store);

function MyApp({ Component, pageProps }) {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </PersistGate>
    </Provider>
  )
}

export default MyApp;