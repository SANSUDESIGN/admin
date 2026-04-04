import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Sansu Design — Esculturas orgánicas hechas a mano';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        background: '#F0EEE9',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        padding: '80px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div
          style={{
            fontSize: '100px',
            fontWeight: 800,
            letterSpacing: '-4px',
            color: '#1c1917',
            lineHeight: 0.85,
            textTransform: 'uppercase',
            fontFamily: 'sans-serif',
          }}
        >
          SANSU/ DESIGN
        </div>
        <div
          style={{
            fontSize: '22px',
            color: '#78716c',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            fontFamily: 'sans-serif',
          }}
        >
          Esculturas orgánicas hechas a mano
        </div>
      </div>
    </div>,
    { ...size }
  );
}
