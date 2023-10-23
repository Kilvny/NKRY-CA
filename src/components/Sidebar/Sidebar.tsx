import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';

/**
 * * For more info on routing in next app refer to
 * @link https://nextjs.org/docs/pages/building-your-application/routing/linking-and-navigating
 * @returns my side bar
 */

const Sidebar = () => {

  const router = useRouter();
  console.log(`pathname ${router.pathname} route: ${router.route} asPath ${router.asPath} basePath: ${router.basePath} `);

  const onclick = () => {
    console.log(`pathname ${router.pathname} route: ${router.route} asPath ${router.asPath} basePath: ${router.basePath} `);
  }

  return (
    <div onClick={onclick}>
        <ul>
            <li>
              <Link href="/analytics">Analytics</Link>
            </li>
            <li>
              <Link href="/dashboard/invoices">Invoices</Link>
            </li>
            <li>
              <Link href="/dashboard/manage-employee">Manage Employees</Link>
            </li>
            <li>Settings</li>
        </ul>
    </div>
  )
}

export default Sidebar