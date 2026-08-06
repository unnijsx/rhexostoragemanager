import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BrandLogo } from '@/components/drive/BrandLogo'

export function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full max-w-4xl mx-auto px-6 py-5 flex items-center justify-between border-b border-slate-200/10">
        <Link to="/" className="flex items-center gap-3">
          <BrandLogo className="h-8 w-8" />
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
            Rheox
          </span>
        </Link>
        <Link to="/">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Button>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
          Privacy Policy
        </h1>
        <p className="text-slate-400 text-sm mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8 text-slate-300 text-sm md:text-base leading-relaxed">
          <section className="card p-6 md:p-8 rounded-2xl">
            <h2 className="text-xl font-bold mb-4 text-white">1. Introduction</h2>
            <p className="text-slate-400">
              Welcome to Rheox. We are committed to protecting your privacy and security. This Privacy Policy explains how we collect, use, and protect your information when you use our storage gateway app.
            </p>
          </section>

          <section className="card p-6 md:p-8 rounded-2xl">
            <h2 className="text-xl font-bold mb-4 text-white">2. Google API Services User Data Policy</h2>
            <p className="text-slate-400 mb-4">
              Rheox's use and transfer of information received from Google APIs to any other app will adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">Google API Services User Data Policy</a>, including the Limited Use requirements.
            </p>
            <h3 className="font-bold text-white mb-2">How we use Google user data:</h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-400">
              <li>
                <strong className="text-white">Authentication:</strong> We use your Google profile (email and name) to authenticate you and connect your Google Drive accounts.
              </li>
              <li>
                <strong className="text-white">Drive Scope (Full Access):</strong> The app requires the <code className="bg-slate-800 px-1.5 py-0.5 rounded text-indigo-300 text-xs">/auth/drive</code> scope to create the dedicated <code className="bg-slate-800 px-1.5 py-0.5 rounded text-indigo-300 text-xs">rheoxdrivermanager</code> folder, sync metadata, and upload files directly to your personal Drive storage.
              </li>
              <li>
                <strong className="text-white">Zero Server Storage:</strong> Your files uploaded through the gateway are streamed directly to Google Drive. We do not store or host your uploaded files on our servers' physical disk.
              </li>
            </ul>
          </section>

          <section className="card p-6 md:p-8 rounded-2xl">
            <h2 className="text-xl font-bold mb-4 text-white">3. Security of Your Data</h2>
            <p className="text-slate-400">
              We encrypt all OAuth access tokens, refresh tokens, and credentials before storing them in our database. Communication between the frontend, backend, and Google APIs is always encrypted over HTTPS.
            </p>
          </section>

          <section className="card p-6 md:p-8 rounded-2xl">
            <h2 className="text-xl font-bold mb-4 text-white">4. Changes to This Policy</h2>
            <p className="text-slate-400">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the last updated date.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl mx-auto px-6 py-8 border-t border-slate-200/10 flex items-center justify-between text-xs text-slate-500">
        <span>© {new Date().getFullYear()} Rheox. All rights reserved.</span>
        <div className="flex gap-4">
          <Link to="/terms" className="hover:text-indigo-400">Terms & Conditions</Link>
        </div>
      </footer>
    </div>
  )
}
