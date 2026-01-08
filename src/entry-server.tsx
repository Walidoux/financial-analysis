// @refresh reload
import { createHandler, StartServer } from '@solidjs/start/server'

import { Metadata } from './components/metadata'

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang='en'>
        <head>
          <Metadata title='Fintech Academy' />
          {assets}
        </head>
        <body>
          <div id='app'>{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
))
