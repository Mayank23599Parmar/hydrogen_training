import {useFetcher, useMatches} from '@remix-run/react';
import { CART_ACTIONS } from '~/utils/constants';



export function AddToCartButton({
  children,
  lines,
  fallback,
  width='',
}) {
  const [root] = useMatches();
  const selectedLocale = root?.data?.selectedLocale;
  const fetcher = useFetcher();
  return (
    <fetcher.Form action="/cart" method="post" className={`${width}`}>
      <input type="hidden" name="cartAction" value={CART_ACTIONS['ADD_TO_CART']} />
      {/* <input type="hidden" name="countryCode" value={selectedLocale.country} /> */}
      <input type="hidden" name="lines" value={JSON.stringify(lines)} />
      {
        fetcher.state !== "loading" ?children:fallback
      }
    </fetcher.Form>
  );
}
