import { FiHome, FiGlobe, FiClipboard, FiMail, FiUser } from 'react-icons/fi'

export const NAV_ITEMS = [
  { path: '/', label: 'Home', Icon: FiHome },
  { path: '/blog', label: 'Blog', Icon: FiGlobe },
  { path: '/products', label: 'Products', Icon: FiClipboard },
  { path: '/contact', label: 'Contact', Icon: FiMail },
]

export const PAGE_TITLES = {
  '/': '._',
  '/about': 'About',
  '/blog': 'Blog',
  '/products': 'Products',
  '/contact': 'Contact',
}

export const SOCIALS = {
  GH: 'https://github.com/',
  IG: 'https://www.instagram.com/',
  IN: 'https://www.linkedin.com/',
}

export const FORMSPREE_KEY = 'xgvekjlr'