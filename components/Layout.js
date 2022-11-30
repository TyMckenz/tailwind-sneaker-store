import React, { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Menu } from '@headlessui/react';
import { ToastContainer } from 'react-toastify';
import { Store } from '../utils/Store';
import { signOut, useSession } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import DropdownLink from './DropdownLink';
import Cookies from 'js-cookie';

export default function Layout({ title, children }) {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItemsCount]);
  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };

  return (
    <>
      <Head>
        <title>{title ? title + 'CS' : 'Cheeky Sneakies'}</title>
        <meta name="description" content="Cheeky Sneakies Store" />
      </Head>
      <ToastContainer position="bottom-center" limit={1} />
      <div className="flex min-h-screen flex-col justify-between ">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link className="font-serif text-3xl" href="/">
              Cheeky Sneakies
            </Link>
            <div>
              {status === 'loading' ? (
                'loading'
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-cyan-400 text-xl">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-60 origin-top-right bg-cyan-600 shadow-lg">
                    <Menu.Item>
                      <DropdownLink className="dropdown-link" href="/profile">
                        Profile
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="/order-history"
                      >
                        Order History
                      </DropdownLink>
                    </Menu.Item>
                    <Menu.Item>
                      <DropdownLink
                        className="dropdown-link"
                        href="#"
                        onClick={logoutClickHandler}
                      >
                        Logout
                      </DropdownLink>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link className="text-xl p-2" href="/login">
                  Login
                </Link>
              )}
              <Link className="text-xl p-2" href="/cart">
                Cart{' '}
                {cartItemsCount > 0 && (
                  <span className="ml-1 rounded-full bg-cyan-800 px-2 py-1 text-xs font-bold">
                    {cartItemsCount}
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
