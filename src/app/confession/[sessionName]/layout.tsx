import "../../../app/globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
   <body className="no-js">
  {children}
</body>

    </html>
  )
}