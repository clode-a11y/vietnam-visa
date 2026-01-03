import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'VietVisa - Виза во Вьетнам'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #86EFAC 0%, #FECDD3 50%, #FED7AA 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '30px',
          }}
        >
          <span style={{ fontSize: '80px' }}>🇻🇳</span>
          <span
            style={{
              fontSize: '72px',
              fontWeight: 800,
              color: '#1A1A1A',
            }}
          >
            VietVisa
          </span>
        </div>

        <div
          style={{
            fontSize: '48px',
            fontWeight: 700,
            color: '#1A1A1A',
            marginBottom: '20px',
            textAlign: 'center',
          }}
        >
          Виза во Вьетнам 2025
        </div>

        <div
          style={{
            fontSize: '28px',
            color: '#374151',
            textAlign: 'center',
            maxWidth: '800px',
          }}
        >
          Безвизовый въезд до 45 дней | E-Visa за $25 | Виза по прилёту
        </div>

        <div
          style={{
            display: 'flex',
            gap: '40px',
            marginTop: '50px',
          }}
        >
          {[
            { value: '45', label: 'дней' },
            { value: '$25', label: 'e-Visa' },
            { value: '3', label: 'дня' },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'rgba(255,255,255,0.8)',
                padding: '20px 40px',
                borderRadius: '20px',
              }}
            >
              <span
                style={{
                  fontSize: '48px',
                  fontWeight: 800,
                  color: '#22C55E',
                }}
              >
                {stat.value}
              </span>
              <span style={{ fontSize: '20px', color: '#6B7280' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
