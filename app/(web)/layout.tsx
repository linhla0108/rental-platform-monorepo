import "../globals.css"
import "./web.css"

const WebLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return <div>{children}</div>
}

export default WebLayout
