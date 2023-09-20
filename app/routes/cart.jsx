import {Await, useActionData, useMatches, useSubmit} from '@remix-run/react';
import {Suspense, useEffect} from 'react';
import {json} from '@shopify/remix-oxygen';
import { CART_ACTIONS } from '~/utils/constants';
import   CartMain  from '~/components/pages/cart/CartMain';

export const meta = ({matches}) => {
  const title = matches[0]?.data?.header?.data?.shop?.name
  return [{title: `${title} | Cart`}];
};

export async function action({request, context}) {
  const {session, cart} = context;
  const [formData, customerAccessToken] = await Promise.all([
    request.formData(),
    session.get('customerAccessToken'),
  ]);
  const cartAction = formData.get('cartAction');
  let status = 200;
  let result;
  switch (cartAction) {
    case CART_ACTIONS['ADD_TO_CART']:
      const lines=JSON.parse( formData.get('lines'))
      result = await cart.addLines(lines);
      break;
    case CART_ACTIONS['UPDATE_CART']:
      result = await cart.updateLines(JSON.parse( formData.get('lines')));
      break;
    case CART_ACTIONS['REMOVE_FROM_CART']:
      result = await cart.removeLines(JSON.parse( formData.get('linesIds')));
      break;
    case CART_ACTIONS['UPDATE_DISCOUNT']: {
      const formDiscountCode = inputs.discountCode;

      // User inputted discount code
      const discountCodes = formDiscountCode ? [formDiscountCode] : [];

      // Combine discount codes already applied on cart
      discountCodes.push(...inputs.discountCodes);

      result = await cart.updateDiscountCodes(discountCodes);
      break;
    }
    case  CART_ACTIONS['UPDATE_BUYER_IDENTITY']: {
      result = await cart.updateBuyerIdentity({
        ...inputs.buyerIdentity,
        customerAccessToken,
      });
      break;
    }
    default:
      throw new Error(`${action} cart action is not defined`);
  }

  const cartId = result.cart.id;
  const headers = cart.setCartId(result.cart.id);
  const {cart: cartResult, errors} = result;

  const redirectTo = formData.get('redirectTo') ?? null;
  if (typeof redirectTo === 'string') {
    status = 303;
    headers.set('Location', redirectTo);
  }

  return json(
    {
      cart: cartResult,
      errors,
      analytics: {
        cartId,
      },
    },
    {status, headers},
  );
}

export default function Cart() {
  const [root] = useMatches();
  const submit=useSubmit()
  const cart = root.data?.cart;
  const UpSaleProductId="gid://shopify/ProductVariant/43696936583190"
  const checkUpSaleProductExistInLines=cart.lines.nodes.find((cv)=>cv.merchandise.id == UpSaleProductId) || null
  const addUpSaleProduct=()=>{
    const formData = new FormData()
    formData.append("cartAction",CART_ACTIONS['ADD_TO_CART'])
    formData.append("lines",JSON.stringify({
      merchandiseId:UpSaleProductId,
      quantity: 1,
    }))
    submit(
      formData, //Notice this change
      { method: "post", action: "/cart" }
    );
  }
  const updateUpSaleProduct=(id)=>{
    const formData = new FormData()
    formData.append("linesIds", JSON.stringify(id));
    formData.append("cartAction", CART_ACTIONS['REMOVE_FROM_CART']);
    submit(
      formData, //Notice this change
      { method: "post", action: "/cart" }
    );
  }
  useEffect(()=>{
    const totalCartAmount=parseFloat(cart.cost.totalAmount.amount)
    const limitForUpSaleCartAmount=parseFloat(100)
   if(totalCartAmount >= limitForUpSaleCartAmount){
    if(!checkUpSaleProductExistInLines){
      addUpSaleProduct()
    }
   }
   if(totalCartAmount < limitForUpSaleCartAmount){
    if(checkUpSaleProductExistInLines){
      updateUpSaleProduct(checkUpSaleProductExistInLines.id)
    }
   }
  },[cart.totalQuantity])
  return (
    <div className="cart">
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await errorElement={<div>An error occurred</div>} resolve={cart}>
          {(cart) => {
            return <CartMain  cart={cart} />;
          }}
        </Await>
      </Suspense>
    </div>
  );
}
