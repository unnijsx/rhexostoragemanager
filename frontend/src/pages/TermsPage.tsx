import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BrandLogo } from '@/components/drive/BrandLogo'

export function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full max-w-4xl mx-auto px-6 py-5 flex items-center justify-between border-b border-slate-200/10">
        <Link to="/" className="flex items-center gap-3">
          <BrandLogo className="h-8 w-8" />
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
            RHX Drive Manager
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
          Terms & Conditions
        </h1>
        <p className="text-slate-400 text-sm mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8 text-slate-300 text-sm md:text-base leading-relaxed">
          <section className="card p-6 md:p-8 rounded-2xl">
            <h2 className="text-xl font-bold mb-4 text-white">1. Terms of Use</h2>
            <p className="text-slate-400">
              By accessing and using RHX Drive Manager, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, you must not access or use the application.
            </p>
          </section>

          <section className="card p-6 md:p-8 rounded-2xl">
            <h2 className="text-xl font-bold mb-4 text-white">2. User Account and Responsibilities</h2>
            <p className="text-slate-400">
              You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You agree to use the services in compliance with all applicable laws and regulations.
            </p>
          </section>

          <section className="card p-6 md:p-8 rounded-2xl">
            <h2 className="text-xl font-bold mb-4 text-white">3. Third-Party Integrations (Google Drive, S3)</h2>
            <p className="text-slate-400">
              RHX Drive Manager operates as a storage gateway and integrates with third-party storage providers. We do not assume responsibility for the availability, storage limits, data losses, or policies of those third-party services (such as Google Drive or your S3 host).
            </p>
          </section>

          <section className="card p-6 md:p-8 rounded-2xl">
            <h2 className="text-xl font-bold mb-4 text-white">4. Limitation of Liability</h2>
            <p className="text-slate-400">
              RHX Drive Manager is provided "as is" and "as available". We do not guarantee uninterrupted, secure, or error-free operations. We shall not be liable for any indirect, incidental, or consequential damages resulting from your use of the application.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-4xl mx-auto px-6 py-8 border-t border-slate-200/10 flex items-center justify-between text-xs text-slate-500">
        <span>© {new Date().getFullYear()} RHX Drive Manager. All rights reserved.</span>
        <div className="flex gap-4">
          <Link to="/privacy" className="hover:text-indigo-400">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  )
}
