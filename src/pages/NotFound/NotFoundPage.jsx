import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <main className="flex h-dvh justify-center items-center bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-400">404</p>
        <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">الصفحة غير موجودة</h1>
        <p className="mt-6 text-pretty text-lg font-medium text-gray-400 sm:text-xl/8">عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها.</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link to="/" className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">العودة للرئيسية</Link>
        </div>
      </div>
    </main>
  )
}

export default NotFoundPage
