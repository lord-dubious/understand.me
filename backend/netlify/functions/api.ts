import type { Handler } from '@netlify/functions'
import serverless from 'serverless-http'
import { app } from '../../src/app'

// Wrap Express app for Netlify Functions
const handler: Handler = serverless(app, {
  binary: ['image/*', 'audio/*', 'video/*', 'application/pdf']
}) as Handler

export { handler }
