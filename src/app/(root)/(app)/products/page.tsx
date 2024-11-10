import type { Metadata } from 'next'
import PageTitle from '../components/PageTitle'

export const metadata: Metadata = {
  title: 'Amixtra | Blog',
  openGraph: {
    title: 'Amixtra | Blog',
    url: '/blog',
  },
  alternates: {
    canonical: '/blog',
  },
}

export default async function BlogPage() {

  return (
    <>
      <PageTitle title="Products" />
      <h1 className='text-6xl mb-6'>Updating Soon...</h1>
    </>
  )
}
