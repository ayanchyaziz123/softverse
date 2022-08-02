import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import styles from '../styles/Home.module.css';
import Jumbotron from '../components/Jumbotron';
import ProductItem from '../components/ProductItem';
import { Categories } from '../data/Categories';
import Category from '../components/Category';
import { retrieveAllProducts } from '../redux-toolkit-state/slices/ProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const Home = () => {
  const dispatch = useDispatch();

  const { products, success, loading, error } = useSelector((state) => state.products);



  useEffect(() => {
    dispatch(retrieveAllProducts());
  }, [])


  return (
    <div>

      <Jumbotron categories={Categories} />
      <Category categories={Categories} />
      <h4 className='mt-5 mb-5 font-bold'>Recent Software</h4>
      <div class="grid sm:grid-cols-5 gap-4  mt-5">
        {
          products && products.map((val, ind) => {
            return (
              <>
                <ProductItem product={val} />
              </>
            )
          })
        }
      </div>
    </div>
  )


}

export default Home;
