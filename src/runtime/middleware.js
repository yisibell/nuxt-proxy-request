import { defineEventHandler } from 'h3'
import { createProxyEventHandler } from 'h3-proxy'

export function createProxyMiddleware(options) {
  return defineEventHandler(createProxyEventHandler(options))
}
