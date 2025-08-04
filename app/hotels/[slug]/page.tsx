export default function HotelPage({ params }: { params: { slug: string } }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Hotel Page Test</h1>
      <p>Slug: {params.slug}</p>
      <p>Current time: {new Date().toISOString()}</p>
    </div>
  )
}
