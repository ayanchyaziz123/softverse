import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Jumbotron = () => {
    return (
        <>
            <div class="shadow-2xl rounded-sm mx-auto text-center py-12 mt-4">
                <h2 class="text-3xl leading-9 font-bold tracking-tight  sm:text-4xl sm:leading-10">
                    Sofyverse.store
                </h2>
                <p className=' mt-5'>This is a website for buy software and order software!</p>
                <div class="mt-8 flex justify-center">
                    <div class="inline-flex rounded-md bg-white shadow">
                        <a href="#" class="text-gray-700 font-bold py-2 px-6">
                            Order a Software
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Jumbotron;    