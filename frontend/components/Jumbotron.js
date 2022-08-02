import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import MultiSelect from 'react-multiple-select-dropdown-lite';
import 'react-multiple-select-dropdown-lite/dist/index.css';


const options = [
    { label: 'Python', value: 'Python' },
    { label: 'Java', value: 'Java' },
    { label: 'Express js', value: 'Express js' },
    { label: 'Mysql', value: 'mySql' },
    { label: 'C++', value: 'C++' },
    { label: 'Node js', value: 'Node js' },
    { label: 'Django', value: 'Django' },
]


const Jumbotron = () => {
     
    const [languageAndTool, setLanguageAndTool] = useState('');

    const handleOnchange = val => {
        setLanguageAndTool(val)
    }

   
    return (
        <>
            <div class="shadow-2xl rounded-sm mx-auto  py-12 mt-4 p-2">
                <div class="grid grid-cols-3 gap-4">
                    <div className='col-span-2'>
                    <h2 class="text-3xl leading-9 font-bold tracking-tight  sm:text-4xl sm:leading-10">
                    Sofyverse.store
                </h2>
                <p className=' mt-5'>This is a website for buy software and order software!</p>
                    </div>
                    <div>
                        <h1>Order a project</h1>
                    <form className='bg-gray-900 p-2 text-white rounded-sm'>
                               <div>
                                <label>Programming Language and tool</label>
                               <MultiSelect
                                    onChange={handleOnchange}
                                    defaultValue={languageAndTool}
                                    options={options}
                                    className="text-gray-800 border-0"
                                />
                               </div>
                                <label>Your Name</label>
                                <div className="mb-3 pt-0">
                                    <input type="text" placeholder="Placeholder" className="px-2 py-1 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" />
                                </div>
                                <div className="mb-3 pt-0">
                                <label>your Email</label>
                                    <input type="email" placeholder="Placeholder" className="px-2 py-1 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" />
                                </div>
                                <div className="mb-3 pt-0">
                                <label>Project details</label>
                                    <textarea type="text" placeholder="Placeholder" className="px-2 py-1 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full">
                                        you can feel free share about this project or anything else
                                    </textarea>
                                </div>
                                <a type="submit" class="bg-gray-800  active:bg-amber-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                                    >
                                        Submit
                                    </a>
                            </form>
                    </div>
                </div>
               
            </div>
        </>
    );
}
export default Jumbotron;    