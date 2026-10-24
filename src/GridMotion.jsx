import './GridMotion.css'

function GridMotion({
  items,
  rows = 4,
  aspectRatio = 1.33,
  gap = 16,
  radius = 14,
  angle = -12,
  tilt = 0,
  speed = 24,
  direction = 'alternate',
  parallax = 0.5,
  spotlight = 0.6,
  dim = 0.35,
  fade = 0.5,
  grayscale = false,
}) {
  const columns = Array.from({ length: rows }, (_, columnIndex) => {
    const columnItems = items.filter((_, itemIndex) => itemIndex % rows === columnIndex)
    return [...columnItems, ...columnItems]
  })

  const moveSpotlight = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width) * 100
    const y = ((event.clientY - bounds.top) / bounds.height) * 100
    event.currentTarget.style.setProperty('--spot-x', `${x}%`)
    event.currentTarget.style.setProperty('--spot-y', `${y}%`)
    event.currentTarget.style.setProperty('--parallax-x', `${(x - 50) * parallax * 0.14}px`)
    event.currentTarget.style.setProperty('--parallax-y', `${(y - 50) * parallax * 0.14}px`)
  }

  return (
    <div
      className="grid-motion"
      aria-hidden="true"
      onPointerMove={moveSpotlight}
      style={{
        '--grid-gap': `${gap}px`,
        '--tile-radius': `${radius}px`,
        '--tile-ratio': aspectRatio,
        '--grid-angle': `${angle}deg`,
        '--grid-tilt': `${tilt}deg`,
        '--grid-speed': `${speed}s`,
        '--grid-parallax': `${parallax * 12}px`,
        '--grid-dim': dim,
        '--grid-spotlight': spotlight,
        '--grid-fade': `${fade * 100}%`,
        '--grid-filter': grayscale ? 'grayscale(1)' : 'none',
      }}
    >
      <div className="grid-motion-plane">
        <div className="grid-motion-columns">
          {columns.map((column, columnIndex) => (
            <div
              className={`grid-motion-column ${direction === 'alternate' && columnIndex % 2 ? 'is-reversed' : ''}`}
              key={columnIndex}
            >
              <div className="grid-motion-track">
                {column.map((item, itemIndex) => {
                  const isImage = typeof item === 'string' && /^https?:\/\//.test(item)
                  return (
                    <div className={`grid-motion-tile ${isImage ? 'is-image' : 'is-copy'}`} key={`${columnIndex}-${itemIndex}`}>
                      {isImage ? <img src={item} alt="" loading="lazy" /> : typeof item === 'string' ? <span>{item}</span> : item}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid-motion-dim" />
      <div className="grid-motion-spotlight" />
      <div className="grid-motion-fade" />
    </div>
  )
}

export default GridMotion
