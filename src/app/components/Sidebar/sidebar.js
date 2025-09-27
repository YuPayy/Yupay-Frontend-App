import React from 'react'

export default function Sidebar() {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-transparent top-2">
      <div className="space-x-4">
        <Link href="/pages/">Setting</Link>
        <Link href="/pages/">History</Link>
        <Link href="/pages/">Logout</Link>
      </div>
    </nav>
  );
}