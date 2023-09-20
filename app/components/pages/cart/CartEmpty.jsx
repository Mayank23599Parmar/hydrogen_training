import { Link } from "@remix-run/react";

export default function CartEmpty() {
  return (
    <div className="cart-empty-wrapper text-center my-64">
        <h1 className="text-center text-primary text-3xl font-normal uppercase leading-10 tracking-widest">Your cart is empty</h1>
        <Link to={'/collections'} className="ext-center w-80 text-white text-sm font-medium uppercase tracking-wide h-12 px-7 py-4 bg-blue rounded-sm justify-center items-center gap-2.5 inline-flex">Shop our products</Link>
    </div>
  )
}
