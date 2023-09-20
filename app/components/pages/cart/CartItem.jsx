import { useFetcher, useMatches } from "@remix-run/react";
import { Image, useMoney } from "@shopify/hydrogen"
import QuantitySpinner from "~/components/global/QuantitySpinner"
import { CART_ACTIONS } from "~/utils/constants";

export default function CartItem({ line }) {
  const { merchandise, cost, quantity,id } = line
  const cartItemPrice = useMoney(cost.totalAmount)
  const fetcher = useFetcher();
  const ChangeQuantity=async(quantity)=>{
    const lines=[ {
      id,
      quantity
    }]
    const formData = new FormData();
    formData.append("lines", JSON.stringify(lines));
    formData.append("cartAction", CART_ACTIONS['UPDATE_CART']);
    fetcher.submit(formData,{method:'POST',action:'/cart'})
  }
  const removeCartItem=()=>{
    const formData = new FormData();
    formData.append("linesIds", JSON.stringify(id));
    formData.append("cartAction", CART_ACTIONS['REMOVE_FROM_CART']);
    fetcher.submit(formData,{method:'POST',action:'/cart'})
  }
  return (
    <div className="cart-item flex gap-7 py-5 border-t border-primary border-opacity-50 last:border-b last:border-primary last:border-opacity-50">
      <div className="cart-item-image w-28 h-28 border border-primary border-opacity-50">
        <Image data={merchandise.image} className="h-full " />
      </div>
      <div className="cart-item-info w-full flex flex-col justify-between">
        <div className="cart-item-detail md:flex  md:justify-between w-full">
          <div className="cart-item-info-wrapper">
            <h3 className="text-primary mb-3 text-xs text-left font-normal uppercase tracking-wider">{merchandise.product.title}</h3>
            <p className="opacity-40 text-left  text-accent text-xs font-normal leading-tight tracking-tight">{merchandise.title}</p>
          </div>
          <div className="cart-item-price">
            <p className="text-left md:text-right text-accent text-base font-normal leading-relaxed tracking-tight">{cartItemPrice.withoutTrailingZeros}</p>
          </div>
        </div>
        <div className="cart-item-quantity flex justify-between items-center">
          <div className="cart-item-quantity-wrapper w-[100px] h-9">
            <QuantitySpinner type= 'api' loader={fetcher.state === "loading" && fetcher?.formData?.get("cartAction") === "UPDATE_CART"} onChangeQuantity={ChangeQuantity} defaultQuantity={quantity} classes='h-9' />
          </div>

      <button onClick={removeCartItem} type="submit" className="text-center cursor-pointer text-accent text-xs font-normal underline leading-tight tracking-tight">
       {fetcher.state === "loading" && fetcher?.formData?.get("cartAction") === "REMOVE_FROM_CART"?'Removing..':'Remove' }
      </button>
        </div>
      </div>
    </div>
  )
}
