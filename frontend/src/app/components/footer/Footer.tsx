import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 py-10">
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="text-sm font-semibold text-slate-900">FestFlow</p>
                <p className="mt-1 text-sm text-slate-600">
                  A modern events UI — plug your backend and ship.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                <a className="hover:text-slate-900" href="#">
                  Privacy
                </a>
                <a className="hover:text-slate-900" href="#">
                  Terms
                </a>
                <a className="hover:text-slate-900" href="#">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </footer>
  )
}

export default Footer
