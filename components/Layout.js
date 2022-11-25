import React, { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Store } from '../utils/Store';

export default function Layout({ title, children }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  return (
    <>
      <Head>
        <title>{title ? title + 'CS' : 'Cheeky Sneakies'}</title>
        <meta name="description" content="Cheeky Sneakies Store" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between ">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link className="font-mono text-3xl" href="/">
              Cheeky Sneakies
            </Link>
            <div>
              <Link className="text-xl p-2 font-mono" href="/login">
                Login
              </Link>
              <Link className="text-xl p-2 font-mono" href="/cart">
                Cart{' '}
                {cart.cartItems.length > 0 && (
                  <span className="ml-1 rounded-full bg-cyan-800 px-2 py-1 text-xs font-bold">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </span>
                )}
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 font-mono justify-center items-center shadow-inner">
          Cheeky Sneakies © A Tyler M Company
        </footer>
      </div>
    </>
  );
}
