import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [opened, setOpened] = useState(false)
  const [jump, setJump] = useState(false)
  const [sunBoost, setSunBoost] = useState(false)
  const audioRef = useRef(null)
  const sceneRef = useRef(null)

  const handleOpen = () => {
    setOpened(true)
    if (audioRef.current) {
      audioRef.current.volume = 0.6
      audioRef.current.play().catch(() => {})
    }
  }

  const handlePhotoClick = () => {
    setJump(true)
    setSunBoost(true)
    setTimeout(() => setJump(false), 700)
    setTimeout(() => setSunBoost(false), 900)
  }

  // Efecto parallax con el mouse
  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      if (sceneRef.current) {
        sceneRef.current.style.setProperty('--mx', x)
        sceneRef.current.style.setProperty('--my', y)
      }
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div className="wrapper">
      <audio ref={audioRef} src="/song.mp3" loop />

      {!opened && (
        <div className="envelope-screen" onClick={handleOpen}>
          <div className="envelope">💌</div>
          <p className="tap-text">Toca para abrir, Adriana</p>
        </div>
      )}

      {opened && (
        <div className="scene" ref={sceneRef}>
          {/* Cielo con degradado */}
          <div className="sky"></div>

          {/* Estrellas */}
          <div className="stars layer" style={{ '--depth': 0.15 }}>
            {Array.from({ length: 40 }).map((_, i) => (
              <span
                key={i}
                className="star"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 60}%`,
                  animationDelay: `${Math.random() * 4}s`,
                }}
              />
            ))}
          </div>

          {/* Sol neón */}
          <div
            className={`sun layer ${sunBoost ? 'sun-boost' : ''}`}
            style={{ '--depth': 0.3 }}
          ></div>

          {/* Montañas lejanas */}
          <div className="mountains-back layer" style={{ '--depth': 0.45 }}></div>
          {/* Montañas cercanas */}
          <div className="mountains-front layer" style={{ '--depth': 0.7 }}></div>

          {/* Corazones flotantes */}
          <div className="hearts">
            {Array.from({ length: 14 }).map((_, i) => (
              <span
                key={i}
                className="heart"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${7 + Math.random() * 6}s`,
                  animationDelay: `${Math.random() * 5}s`,
                  fontSize: `${14 + Math.random() * 16}px`,
                }}
              >
                💗
              </span>
            ))}
          </div>

          {/* Contenido principal */}
          <div className="content layer" style={{ '--depth': 0.9 }}>
            <h1 className="neon-title">Para Adriana</h1>

            <div className={`photo-frame ${jump ? 'jump' : ''}`} onClick={handlePhotoClick}>
              <img src="/ella.jpeg" alt="Adriana" />
            </div>

            <p className="message">
              Desde que te conocí, mis días tienen un color distinto.
              Me gustaría pasar tiempo contigo, conocerte más y, si tú
              quieres, que este sea solo el comienzo de algo que dure
              para siempre.
            </p>
            <p className="signature">con cariño, siempre — Jorge Luciano</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App