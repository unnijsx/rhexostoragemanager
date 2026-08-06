import { Link } from 'react-router-dom'
import { Share2, Layers, Cpu, CloudLightning, ArrowRight } from 'lucide-react'
import { getStoredUser } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { BrandLogo } from '@/components/drive/BrandLogo'
import heroImage from '@/assets/hero.png'

export function HomePage() {
  const user = getStoredUser()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between border-b border-slate-200/10">
        <Link to="/" className="flex items-center gap-3">
          <BrandLogo className="h-9 w-9" />
          <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-indigo-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
            RHX Drive Manager
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
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-12 md:py-24 flex flex-col items-center">
        <div className="w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-20 text-center lg:text-left">
          {/* Left Text Column */}
          <div className="flex-1 flex flex-col items-center lg:items-start">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-indigo-400 text-xs font-semibold mb-8 backdrop-blur-sm animate-pulse">
              <CloudLightning className="h-3.5 w-3.5" /> Introducing RHX Drive Manager
            </div>
            
            <h1 className="text-4xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
              Connect all your storages in{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
                One Virtual Dashboard
              </span>
            </h1>
            
            <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-2xl lg:max-w-none">
              RHX Drive Manager is a secure web storage gateway. Link multiple Google Drive and S3-compatible storage accounts, track combined storage quotas, organize virtual folders, and upload files up to 5GB without server limits.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center w-full sm:w-auto">
              {user ? (
                <Link to="/all-files" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto px-8 py-3 text-base flex items-center justify-center gap-2">
                    Open Dashboard <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/register" className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto px-8 py-3 text-base justify-center">
                      Get Started for Free
                    </Button>
                  </Link>
                  <Link to="/login" className="w-full sm:w-auto">
                    <Button variant="outline" className="w-full sm:w-auto px-8 py-3 text-base justify-center">
                      Log In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Right Image/Visual Column */}
          <div className="flex-1 flex justify-center items-center relative">
            <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-3xl w-72 h-72 mx-auto pointer-events-none"></div>
            <img 
              src={heroImage} 
              alt="RHX Drive Manager visualizer" 
              className="relative w-full max-w-md md:max-w-lg object-contain drop-shadow-[0_20px_50px_rgba(99,102,241,0.25)] hover:scale-[1.03] transition-transform duration-500 ease-out pointer-events-none select-none"
            />
          </div>
        </div>

        {/* Detailed Application Purpose & Google Integration (Google Verification Requirement) */}
        <section className="w-full rounded-2xl border border-slate-200/10 bg-slate-500/5 p-8 md:p-12 mb-20 text-left backdrop-blur-sm">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white bg-gradient-to-r from-indigo-400 to-blue-500 bg-clip-text text-transparent">
            Application Purpose & Google Drive Integration
          </h2>
          <div className="prose prose-slate max-w-none text-slate-400 space-y-4 text-sm md:text-base leading-relaxed">
            <p>
              <strong>RHX Drive Manager</strong> serves as a unified storage gateway and management platform. The primary goal of the application is to allow users to connect, organize, and monitor their storage allocations across multiple providers from a single user interface.
            </p>
            <p>
              To accomplish this, RHX Drive Manager integrates with <strong>Google Drive APIs</strong>. When you authenticate and link a Google Drive account:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Dedicated App Folder:</strong> The application automatically creates a dedicated folder named <code>rheoxdrivermanager</code> inside the root directory of your Google Drive.
              </li>
              <li>
                <strong>Safe Streaming Uploads:</strong> Files uploaded through the RHX dashboard are streamed directly in chunks to this dedicated Google Drive folder. Files are never stored on RHX servers.
              </li>
              <li>
                <strong>Metadata & Quota Syncing:</strong> The application retrieves file names, sizes, and MIME types from your linked Google Drive folder to synchronize your virtual catalog database and calculate aggregate storage quotas.
              </li>
            </ul>
          </div>
        </section>

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
        <span>© {new Date().getFullYear()} RHX Drive Manager. All rights reserved.</span>
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
