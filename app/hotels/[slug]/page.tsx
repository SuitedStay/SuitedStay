export default function HotelPage({ params }: { params: { slug: string } }) {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: 'green' }}>🎉 Hotel Page Works!</h1>
      <p>Slug: <strong>{params.slug}</strong></p>
      <p>Route is functioning correctly!</p>
      <p>Timestamp: {new Date().toISOString()}</p>
    </div>
  )
}
