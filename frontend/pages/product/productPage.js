import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loaders from '../../components/Loaders';
import { getProductById } from '../../redux-toolkit-state/slices/ProductSlice';
import ReactHtmlParser from 'react-html-parser';
import Link from 'next/link';




const productPage = () => {

    const router = useRouter()
    const { pid } = router.query
    const [quantity, setQuantity] = useState(1);
    const [lifeTimeBuy, setLifeTimeBuy] = useState(false);
    const dispatch = useDispatch();

    const { product, error, loading } = useSelector((state) => state.products);

    const handleLifeTimeBuy = () => {
        if (lifeTimeBuy) {
            setLifeTimeBuy(false);
        }
        else {
            setLifeTimeBuy(true);
        }
    }

    useEffect(() => {
        dispatch(getProductById(pid))
    }, [pid])


    return (

        <div className="max-w-7xl mx-auto">
            {
                loading === true ? <Loaders /> : error ? <>
                    {error && <>
                        <div class="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3 mt-3 mb-3 rounded-t-md rounded-b-md" role="alert">
                            <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" /></svg>
                            <p>{error}</p>
                        </div>
                    </>}

                </>
                    :
                    <div class="grid grid-cols-7 gap-6 mt-3 p-2">
                        <div class="col-span-4">
                            <img style={{ maxHeight: '500px', minWidth: '400px' }} src={`http://localhost:4000/${product && product.image}`}></img>
                            <p className='mt-5'>{product && ReactHtmlParser(product.description)}</p>
                        </div>
                        <div class="col-span-2">
                            <h1 className="font-bold">Features</h1>
                            <hr></hr>
                            <h1 className='font-bold text-lg my-3'>price: ${product && product.price}</h1>
                            <hr></hr>
                            <h1 className='text-lg my-3 font-bold'>Life time: ${product && product.lifeTimePrice}</h1>
                            <p>You will get the prject totally. and will never be seen in this website</p>
                            <hr></hr>
                            <h1 className='text-lg my-3'>{product && product.name}</h1>
                            <hr></hr>
                            <h1 className='text-lg my-3'>review: 5 star</h1>
                            <hr></hr>
                            <h1 className='text-lg my-3'>Language and Tools : {
                                product && product.languageAndTool.map((val, ind) => {
                                    return (
                                        <>
                                            <p>{ind + 1}.  {val}</p>
                                        </>
                                    )
                                })
                            }</h1>
                            <hr></hr>
                            <h1 className='font-bold mt-5'>Contact us</h1>
                            <p>You can buy it through Contact us here!!!</p>
                            <form className='bg-gray-900 p-2 text-white rounded-sm'>
                                <label>Name</label>
                                <div className="mb-3 pt-0">
                                    <input type="text" placeholder="Placeholder" className="px-2 py-1 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" />
                                </div>
                                <div className="mb-3 pt-0">
                                <label>Email</label>
                                    <input type="email" placeholder="Placeholder" className="px-2 py-1 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" />
                                </div>
                                <div className="mb-3 pt-0">
                                <label>Message</label>
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
                        <div class="...">
                            <div className="rounded-sm shadow p-2">
                                <p className="my-3">Status: {product && product.visibility ? 'in stock' : 'not in stock'}</p>
                                <hr></hr>
                                <p className="my-3 font-bold text-lg">$ {product && product.price} {!lifeTimeBuy ? <span className='text-lime-900 ml-3'>Selected</span> : <input className='h-5 w-5 ml-4' type="checkbox" onChange={handleLifeTimeBuy}></input>}</p>
                                <hr></hr>
                                <p className="my-3 font-bold text-lg">$ {product && product.lifeTimePrice} {lifeTimeBuy ? <span className='text-lime-900 ml-3'>Selected</span> : <input className='h-5 w-5 ml-4' type="checkbox" onChange={handleLifeTimeBuy}></input>}</p>
                                <hr className='mb-4'></hr>

                                <Link
                                    href={{ pathname: "/cartPage", query: { pid: pid, ltb: lifeTimeBuy } }}
                                >
                                    <a class="bg-amber-800 text-white active:bg-amber-900 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                                    >
                                        add to cart
                                    </a>
                                </Link>
                            </div>

                        </div>

                    </div>
            }

        </div>
    )
}


export default productPage;