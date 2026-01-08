import { Meta, MetaProvider, Title } from '@solidjs/meta'

import { APP } from '../lib/store'

interface MetadataProps {
  title: string
  description?: string
}

export const Metadata = (props: MetadataProps) => {
  return (
    <MetaProvider>
      <Title>
        {props.title} | {APP.LONG_NAME}
      </Title>

      <Meta content={props.description ?? APP.DESCRIPTION} name='description' />
      <Meta charset='utf-8' />
      <Meta content='width=device-width, initial-scale=1' name='viewport' />
      <Meta content='https://example.com/image.jpg' property='og:image' />
      <Meta
        content={props.description ?? APP.DESCRIPTION}
        property='og:image:alt'
      />
      <Meta content='1200' property='og:image:width' />
      <Meta content='600' property='og:image:height' />
      <Meta content='GitHub' property='og:site_name' />

      <link href='/favicon.ico' rel='icon' />
    </MetaProvider>
  )
}
