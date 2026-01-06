import './app.css'

import { MetaProvider, Title } from '@solidjs/meta'
import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { type ParentComponent, Suspense } from 'solid-js'
import pkg from '~/../package.json'
import { Navbar } from './components/navbar'
import { ThemeProvider } from './providers/theme-provider'

export const APP_NAME = pkg.name
  .replace(/-/g, ' ')
  .split(' ')
  .map((word) => word[0].toUpperCase() + word.slice(1))
  .join(' ')

const Layout: ParentComponent = (props) => {
  return (
    <>
      <Navbar />
      <Suspense>{props.children}</Suspense>
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider defaultTheme='system' storageKey={`${pkg.name}-theme`}>
      <Router
        root={(props) => (
          <MetaProvider>
            <Title>{APP_NAME}</Title>
            <Layout>{props.children}</Layout>
          </MetaProvider>
        )}>
        <FileRoutes />
      </Router>
    </ThemeProvider>
  )
}
