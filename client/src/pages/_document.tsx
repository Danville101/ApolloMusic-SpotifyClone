import { Html, Head, Main, NextScript } from 'next/document'
import FooterPlayBar from '@/components/FooterPlayBar'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='relative'>
        <Main />
        <NextScript />


      </body>
    </Html>
  )
}
