import { useState } from "react";
import Sidebar from "../../admin_components/Sidebar";
import React from 'react'
import MultiSelect from 'react-multiple-select-dropdown-lite'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import {  createProduct } from "../../redux-toolkit-state/slices/ProductSlice";
import { useDispatch, useSelector } from "react-redux";


const options = [
    { label: 'Python', value: 'Python' },
    { label: 'Java', value: 'Java' },
    { label: 'Express js', value: 'Express js' },
    { label: 'Mysql', value: 'mySql' },
    { label: 'C++', value: 'C++' },
    { label: 'Node js', value: 'Node js' },
    { label: 'Django', value: 'Django' },
]

const adminAddProductPage = () => {

    const dispatch = useDispatch();

    const { error, loading, success } = useSelector(state => state.products);

    const [languageAndTool, setLanguageAndTool] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');


    const handleProductSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('languageAndTool', languageAndTool);
        formData.append('name', name);
        formData.append('price', price);
        formData.append('quantity', quantity);
        formData.append('description', description);
        formData.append('image', image);
        dispatch(createProduct(formData));
    }

    const handleOnchange = val => {
        setLanguageAndTool(val)
    }

    return (
        <form onSubmit={handleProductSubmit}>
            <div className="max-w-7xl mx-auto grid grid-cols-8 gap-10 mt-3 p-2">

                <div className="col-span-2">
                    <Sidebar />
                </div>

                <div className="col-span-3">


                    {/* error is here */}

                    {error && <>
                        <div class="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3 mt-3 mb-3 rounded-t-md rounded-b-md" role="alert">
                            <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" /></svg>
                            <p>{error}</p>
                        </div>
                    </>}

                    {/* error is here */}


                    <div class="w-full max-w-lg">


                        <div className="mb-10">

                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Language and tool
                            </label>
                            <div className="app">
                                <div className="preview-values">
                                    {languageAndTool}
                                </div>

                                <MultiSelect
                                    onChange={handleOnchange}
                                    defaultValue={languageAndTool}
                                    options={options}
                                />
                            </div>

                        </div>

                        <div class="flex flex-wrap -mx-3 mb-6 mx-auto">
                            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name" >
                                    Name
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="product" onChange={(e) => { setName(e.target.value) }} />
                            </div>
                            <div class="w-full md:w-1/2 px-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                    Price
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" placeholder="10" onChange={(e) => setPrice(e.target.value)} />
                            </div>
                            <div class="w-full md:w-1/2 px-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                                    Quantity
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="number" placeholder="10" onChange={(e) => setQuantity(e.target.value)} />
                            </div>
                        </div>


                        <div class="flex flex-wrap -mx-3 mb-6">
                            <div class="w-full px-3">
                                <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                    Image
                                </label>
                                <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="file" onChange={(e) => setImage(e.target.files[0])} />

                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-span-3">
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                Descriptions
                            </label>
                            <textarea class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text" onChange={(e) => setDescription(e.target.value)} />

                        </div>
                    </div>
                    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                        Add product
                    </button>
                </div>


            </div>
        </form>
    )
}
export default adminAddProductPage;