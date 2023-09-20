export const SORT_OPTIONS = [
    {
      label: 'Featured',
      key: 'featured',
      sortKey: 'MANUAL',
      reverse: false,
    },
    {
      label: 'Price (low to high)',
      key: 'price-low-high',
      sortKey: 'PRICE',
      reverse: false,
    },
    {
      label: 'Price (high to low)',
      key: 'price-high-low',
      sortKey: 'PRICE',
      reverse: true,
    },
    {
      label: 'Title (A to Z)',
      key: 'title-a-z',
      sortKey: 'TITLE',
      reverse: false,
    },
    {
      label: 'Title (Z to A)',
      key: 'title-z-a',
      sortKey: 'TITLE',
      reverse: true,
    },
    {
      label: 'Best Selling',
      key: 'best-selling',
      sortKey: 'BEST_SELLING',
      reverse: undefined,
    },
    {
      label: 'New Arrivals',
      key: 'newest',
      sortKey: 'CREATED',
      reverse: false,
    },
  ];
  export const CART_ACTIONS = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    UPDATE_BUYER_IDENTITY: 'UPDATE_BUYER_IDENTITY',
    UPDATE_CART: 'UPDATE_CART',
    UPDATE_DISCOUNT: 'UPDATE_DISCOUNT',
  };
  