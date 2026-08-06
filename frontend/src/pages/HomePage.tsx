import { Link } from 'react-router-dom'
import { Share2, Layers, Cpu, CloudLightning, ArrowRight } from 'lucide-react'
import { getStoredUser } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { BrandLogo } from '@/components/drive/BrandLogo'

export function HomePage() {
  const user = getStoredUser()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between border-b border-slate-200/10">
        <Link to="/" className="flex items-center gap-3">
          <BrandLogo className="h-9 w-9" />
          <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-indigo-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
            Rheox
          </span>
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <Link to="/all-files">
              <Button className="flex items-center gap-2">
                Go to Dashboard <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/login" className="text-sm font-semibold hover:text-indigo-400 transition-colors">
                Log In
              </Link>
              <Link to="/register">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-20 md:py-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-indigo-400 text-xs font-semibold mb-8 backdrop-blur-sm animate-pulse">
          <CloudLightning className="h-3.5 w-3.5" /> Introducing Rheox Storage Gateway
        </div>
        
        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1] mb-6">
          Connect all your storages in{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
            One Virtual Dashboard
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-10">
          Rheox is a secure web storage gateway. Link multiple Google Drive and S3-compatible storage accounts, track combined storage quotas, organize virtual folders, and upload files up to 5GB without server limits.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-24">
          {user ? (
            <Link to="/all-files">
              <Button className="px-8 py-3 text-base flex items-center gap-2">
                Open Dashboard <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/register">
                <Button className="px-8 py-3 text-base">
                  Get Started for Free
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="px-8 py-3 text-base">
                  Log In
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <div className="card rounded-2xl p-8 text-left hover:scale-[1.02] transition-transform">
            <div className="bg-indigo-500/10 p-3 rounded-xl w-fit text-indigo-400 mb-6">
              <Layers className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-xl mb-3">Unified Space</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Connect multiple cloud storage providers and manage files through a single, aggregated storage workspace.
            </p>
          </div>

          <div className="card rounded-2xl p-8 text-left hover:scale-[1.02] transition-transform">
            <div className="bg-blue-500/10 p-3 rounded-xl w-fit text-blue-400 mb-6">
              <Cpu className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-xl mb-3">Direct Streaming</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Uploads stream dynamically to your selected cloud storage directly. No physical files are ever stored on our server disk.
            </p>
          </div>

          <div className="card rounded-2xl p-8 text-left hover:scale-[1.02] transition-transform">
            <div className="bg-pink-500/10 p-3 rounded-xl w-fit text-pink-400 mb-6">
              <Share2 className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-xl mb-3">Public Sharing</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Create unique, secure preview tokens and share public links for folders or individual files easily.
            </p>
          </div>
        </div>
      </main>

      <footer className="w-full max-w-7xl mx-auto px-6 py-10 border-t border-slate-200/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <span>© {new Date().getFullYear()} Rheox. All rights reserved.</span>
        <div className="flex gap-6">
          <Link to="/privacy" className="hover:text-indigo-400 transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:text-indigo-400 transition-colors">
            Terms & Conditions
          </Link>
        </div>
      </footer>
    </div>
  )
}
