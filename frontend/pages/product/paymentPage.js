import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PayPalButton } from "react-paypal-button-v2";




const paymentPage = () => {
    const router = useRouter();
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true);
    }, [])

    return (
        <div className='grid justify-items-center'>
            <Link href='/product/orderPage'>
                <a className="bg-gray-800 text-white p-2 my-3">I will pay later!</a>
            </Link>
            {
                loaded && <PayPalButton
                    amount="0.01"
                />
            }

        </div>
    )
}

export default paymentPage;