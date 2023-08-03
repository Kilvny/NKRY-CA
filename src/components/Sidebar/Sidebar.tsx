import React from 'react'
import Link from 'next/link'

/**
 * * For more info on routing in next app refer to
 * @link https://nextjs.org/docs/pages/building-your-application/routing/linking-and-navigating
 * @returns my side bar
 */

const Sidebar = () => {
  return (
    <div>
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