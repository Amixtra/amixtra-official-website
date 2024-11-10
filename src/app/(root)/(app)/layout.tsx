import type { Metadata } from 'next'
import RootBackground from './components/RootBackground'

export const metadata: Metadata = {
  title: 'Amixtra',
  description: 'Together, We Build Beyond',
  openGraph: {
    images: '/media/poster.jpg',
    title: 'Amixtra',
    description: 'Together, We Build Beyond',
    url: '/',
  },
  alternates: {
    canonical: '/',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <RootBackground />
      <main className="relative z-10 flex-1 bg-white/60 p-3 dark:bg-black/75 md:px-5 md:pb-10 lg:px-10">{children}</main>
    </>
  )
}
