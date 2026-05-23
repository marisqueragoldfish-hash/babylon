import './globals.css';

export const metadata = {
  title: 'Babylon · The mystic AI language temple',
  description: 'Where every tongue meets. AI-powered language mastery in 60+ tongues.',
  manifest: '/manifest.json',
  themeColor: '#5eead4',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Babylon'
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icons/favicon-32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: '/icons/apple-touch-icon.png'
  },
  openGraph: {
    title: 'Babylon · The mystic AI language temple',
    description: 'Where every tongue meets. 60+ languages. Infinite depth.',
    type: 'website'
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/icons/favicon-32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-abyss-950 text-white overflow-x-hidden">
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(){})});}`
          }}
        />
      </body>
    </html>
  );
}
