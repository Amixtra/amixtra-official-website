import type { Metadata } from 'next'
import { FORMSPREE_KEY } from '@/constans/common'
import ContactForm from './components/ContactForm'
import PageTitle from '../components/PageTitle'

export const metadata: Metadata = {
  title: 'Contact - Dede Ariansya',
  openGraph: {
    title: 'Contact - Dede Ariansya',
    url: '/contact',
  },
  alternates: {
    canonical: '/contact',
  },
}

export default function ContactPage() {
  return (
    <>
      <PageTitle title="Contact" />
      <div className="flex flex-col lg:flex-row">
        <div className="mb-4 w-full text-center lg:w-[480px] lg:text-left">
          <div className="mb-8">
            <h2 className="mb-3 text-lg font-bold">Based at</h2>
            <p className="text-sm leading-5">
              HQ Davao, Philippines. <br />
              DEV Busan, Korea (South or North)
            </p>
          </div>
          <div className="mb-8">
            <h2 className="mb-3 text-lg font-bold">EMAIL ADDRESS</h2>
            <p className="text-sm leading-5">
              <a href="mailto:jeonilshinbusiness@gmail.com" rel="noopener" className="hover:text-yellow-600">
                jeonilshinbusiness@gmail.com
              </a>
              <br />
              <a href="mailto:mikoshimizutaniboy@gmail.com" rel="noopener" className="hover:text-yellow-600">
                mikoshimizutaniboy@gmail.com
              </a>
            </p>
          </div>
        </div>
        <div className="lg:flex-1">
          <ContactForm formspreeKey={FORMSPREE_KEY} />
        </div>
      </div>
    </>
  )
}
