import logo from '@/assets/rheox.png'
import { cn } from '@/lib/utils'

export function BrandLogo({ className }: { className?: string }) {
  return (
    <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl bg-transparent overflow-hidden', className)}>
      <img src={logo} alt="Rheox logo" className="h-full w-full object-contain" />
    </div>
  )
}
