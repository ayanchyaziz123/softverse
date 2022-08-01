import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../../admin_components/Sidebar";
import { retrieveAllProducts, deleteProduct, clearStatus } from "../../redux-toolkit-state/slices/ProductSlice";
import Loaders from "../../components/Loaders";




const adminProductsListPage = () => {

    const dispatch = useDispatch();
    const { products, error, loading, success } = useSelector((state) => state.products);


    const handleDelete = (e) => {
        e.preventDefault();
        if (window.confirm("Do you really want to delete?")) {
            const id = e.target.value;
            dispatch(deleteProduct(id));
        }

    }
    useEffect(() => {
        dispatch(retrieveAllProducts());
        setTimeout(() => {
            dispatch(clearStatus());
        }, 4000)
    }, [products])



    return (
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-6  p-2">
            <div className="col-span-1">
                <Sidebar />
            </div>
            <div className="col-span-3 mt-5">


                {error && <>
                    <div class="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3 mt-3 mb-3 rounded-t-md rounded-b-md" role="alert">
                        <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" /></svg>
                        <p>{error}</p>
                    </div>
                </>}

                {/* error is here */}

                {/* success is here */}

                {/* success is here */}



                <Link href="/admin_pages/adminAddProductPage">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                        Add product
                    </button>
                </Link>

                <div class="flex flex-col">
                    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div class="overflow-hidden">
                                <table class="min-w-full">
                                    <thead class="border-b">
                                        <tr>
                                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                #
                                            </th>
                                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                name
                                            </th>
                                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                price
                                            </th>
                                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Language and tool
                                            </th>
                                            <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            products && products.length > 0 && products.map((product, ind) => {
                                                return (<>
                                                    <tr class="border-b">
                                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ind + 1}</td>
                                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            {product.name}
                                                        </td>
                                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            {product.price}
                                                        </td>
                                                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                            {
                                                                product.languageAndTool.map((val, ind) => {
                                                                    return <span>{val} , </span>
                                                                })
                                                            }
                                                        </td>
                                                        <td>
                                                            <button value={product._id} onClick={handleDelete}>delete</button>
                                                        </td>
                                                    </tr>
                                                </>)
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default adminProductsListPage;