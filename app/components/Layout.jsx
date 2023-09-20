
import {Suspense} from 'react';
import {Await} from '@remix-run/react';

export function Layout({

  children = null,

}) {
  return (
    <>
      <main id="MainContent">{children}</main>
    </>
  );
}