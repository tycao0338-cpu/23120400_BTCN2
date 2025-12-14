import { useState } from 'react'
import './App.css'
import { PaginationControls } from './components/PaginationControls'

function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 20

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
    console.log(`Navigated to page ${newPage}`)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center gap-8 p-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">
        PaginationControls Demo
      </h1>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 w-full max-w-md">
        <p className="text-center text-slate-600 dark:text-slate-400 mb-6">
          Click the buttons to navigate between pages
        </p>

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default App
