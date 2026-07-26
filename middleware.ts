import { authMiddleware } from '@clerk/nextjs'

// Protect the agent console; the public status page stays open.
export default authMiddleware({
  publicRoutes: ['/', '/status'],
  afterSignInUrl: '/console',
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
