import { flattenConnection, useMoney } from "@shopify/hydrogen"
import CartItem from "./CartItem"
import { Link } from "@remix-run/react"
import CartEmpty from "./CartEmpty"

export default function CartMain({ cart }) {

  const cartSubtotalAmount = useMoney(cart.cost.subtotalAmount)
  const cartItems = flattenConnection(cart.lines)
  return (
    <div className="cart-wrapper">
    
    {
      cart.totalQuantity > 0 ?  <div className="max-w-full px-6 md:px-0 md:max-w-4xl w-full mx-auto">
      <h1 class="text-center text-primary text-3xl font-normal uppercase leading-10 tracking-widest">My Cart</h1>
        <div className="cart-item-wrapper mb-10 ">
          {
            cartItems.map((line) => {
              return <CartItem line={line} />
            })
          }
        </div>
        {
          <div className="cart-checkout-wrapper flex flex-col items-end w-96 ml-auto">
          <div className="cart-total mb-5 flex justify-between w-full">
            <p className="text-center text-accent text-xl font-normal leading-loose tracking-tight">Subtotal</p>
            <p className="text-right text-accent text-xl font-normal leading-loose tracking-tight">{cartSubtotalAmount.withoutTrailingZeros}</p>
          </div>
          <div className="cart-checkout-btn w-full mb-5">
            <Link to={cart.checkoutUrl} className="text-center w-full text-white text-sm font-medium uppercase tracking-wide h-12 px-7 py-4 bg-blue rounded-sm justify-center items-center gap-2.5 inline-flex">Checkout </Link>
          </div>
          <div className="w-full text-center">
            <p className="opacity-40 text-center text-neutral-800 text-xs font-normal leading-tight tracking-tight">Shipping and taxes calculated at checkout.</p>
          </div>
        </div>
        }
       
      </div>:<CartEmpty/>
    }
      
    </div>
  )
}
