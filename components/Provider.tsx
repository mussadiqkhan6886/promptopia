"use client";

import { SessionProvider } from '@node_modules/next-auth/react'

const Provider = ({children, session}: {children: React.ReactNode, session?: null | undefined}) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider
