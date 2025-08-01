export default function HotelPage({ params }: { params: { slug: string } }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Hotel Page Works!</h1>
      <p>Slug: {params.slug}</p>
      <p>Route is functioning correctly!</p>
    </div>
  )
}