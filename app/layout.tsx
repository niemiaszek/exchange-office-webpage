import './globals.css'

export const metadata = {
  title: 'Kantor FIFO Chełm',
  description: 'Kantor Wymiany Walut. Najlepsze ceny',
  creator: 'Patryk Niemiec',
  openGraph: {
    title: 'Kantor FIFO Chełm',
    description: 'Kantor Wymiany Walut. Najlepsze ceny',
    url: 'https://kantorfifo.pl',
    siteName: 'Kantor FIFO Chełm',
    // TODO: Add correct image
    images: [
      {
        url: 'https://nextjs.org/og.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'pl-PL',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  )
}
