import { useEffect, useState } from "react";
import { LoaderIcon, MinusIcon, PlusIcon } from "~/components/global/Icons";

export default function QuantitySpinner({ onChangeQuantity = undefined, defaultQuantity = 1,classes='',loader=false,type=''}) {
    const [quantity, setQuantity] = useState(defaultQuantity)
    const decreament = (e) => {
        e.stopPropagation()
        setQuantity((prevState) => {
            // debugger
            if (prevState > 1) {
                return prevState - 1
            }
            else {
                return prevState
            }
        })

    }
    useEffect(() => {
        if (onChangeQuantity && quantity != defaultQuantity) {
            onChangeQuantity(quantity)
        }
    }, [quantity])
    const increament = () => {
        setQuantity((prevState) => {
            if (prevState >= 1) {
                return prevState + 1
            }
        })
    }
    return (
        <div className={`product-quantity-wrapper max-w-['118px']  flex items-center  justify-center rounded-sm border border-stone-300 w-full`}>
            <div className={`${classes} decreament-quantity w-1/3 cursor-pointer  flex items-center ${quantity == 1 && "opacity-50"}`} onClick={decreament}><MinusIcon className="mx-auto" /></div>
            <div className= {`${classes} flex justify-center items-center quantity  w-1/3  text-center`}>{loader?<LoaderIcon height={44} width={44} />:type === "api"?defaultQuantity:quantity}</div>
            <div className={`${classes} increament-quantity  w-1/3 cursor-pointer  flex items-center`} onClick={increament}><PlusIcon className="mx-auto" /></div>
        </div>
    )
}
