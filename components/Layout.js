import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        <title>{title ? title + 'CS' : 'Cheeky Sneakies'}</title>
        <meta name="description" content="Cheeky Sneakies Store" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between ">
        <header>
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <Link className="text-3xl font-shrik" href="/">
              Cheeky Sneakies
            </Link>
            <div>
              <Link className="text-xl p-2 font-shrik" href="/login">
                Login
              </Link>
              <Link className="text-xl p-2 font-shrik" href="/cart">
                Cart
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          Cheeky Sneakies © A Tyler M Company
        </footer>
      </div>
    </>
  );
}
