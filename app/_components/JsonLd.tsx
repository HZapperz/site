/**
 * Server-rendered JSON-LD. Must stay a server component so the markup lands in
 * the initial HTML response — most AI crawlers execute little or no JavaScript.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}
