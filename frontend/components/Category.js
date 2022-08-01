import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Category = ({ categories }) => {
    return (
        <>
            <h4 className='mt-5 mb-5 font-bold'>Lanuage and Tool</h4>
            <div class="grid sm:grid-cols-8 gap-4 items-center  ...">
                {
                    categories.map((val, ind) => {
                        return (
                            <div class="box-border  p-4 border-4 rounded-lg ...">
                                <img class="mx-auto" style={{maxHeight: '60px',maxWidth: '100px', minHeight: '60px', minWidth: '100px'}}  src={val.image}></img>
                               <p className='text-center'>{val.name}</p>
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}
export default Category;    