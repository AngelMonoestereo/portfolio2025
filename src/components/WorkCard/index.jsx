import { useEffect, useState } from "react"
import "./style.css"
import TextWriting from "../TextWriting"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import FadeText from "../FadeText"
import HideText from "../HideText"

export default function WorkCard({ item }) {
  const controls = useAnimation()
  const [ref, inView] = useInView()
  const [hasAnimated, setHasAnimated] = useState(false)
  const delay = 0

  const handleComplete = () => setHasAnimated(true)

  useEffect(() => {
    if (inView && !hasAnimated) controls.start("visible")
  }, [inView, controls, hasAnimated])

  const opacityVariants = {
    hidden: { opacity: 0, mixBlendMode: "color-dodge" },
    visible: { opacity: 1, mixBlendMode: "normal" },
  }

  const lineVariants = {
    hidden: { width: "0%" },
    visible: {
      width: "100%",
      transition: { type: "spring", stiffness: 20, duration: 2, delay },
    },
  }

  // --- Normalizaciones para soportar ambos formatos ---
  const title = item.title
  const desc = item.detail || item.description
  const imageSrc = item.img || item.image
  const tags = item.tech || item.tags || []
  const github =
    (item.links && item.links.github) || item.code || item.github
  const live =
    (item.links && item.links.live) || item.live
  const client = item.client || null
  const year = item.year || null

  return (
    <div ref={ref} className="workCard">
      {/* Head solo si hay datos */}
      {(client || year) && (
        <div className="workCard--head">
          <h3>{client ? <TextWriting delay={delay} nocursor controls={controls} stagger={0.08} text={client} /> : <span />}</h3>
          <h3>{year ? <TextWriting delay={delay} nocursor controls={controls} stagger={0.08} text={year} /> : <span />}</h3>
        </div>
      )}

      <motion.div initial="hidden" animate={controls} variants={lineVariants} className="workCard--line" />

      <div className="workCard--body">
        {/* Imagen */}
        {imageSrc && (
          <motion.span style={{ gridArea: "image" }}
            initial="hidden"
            animate={controls}
            variants={opacityVariants}
            transition={{ duration: 2, delay: 0.5 }}
            onAnimationComplete={handleComplete}
          >
            <img src={imageSrc} alt={title} />
          </motion.span>
        )}

        {/* Título */}
        <h1 className="workCard--title" >
          <HideText controls={controls} delay={delay}>
            {title}
          </HideText>
        </h1>

        {/* Descripción */}
        {desc && (
          <p className="workCard--desc">
            <FadeText controls={controls} delay={delay}>
              {desc}
            </FadeText>
          </p>
        )}

        {/* Links */}
        {(github || live) && (
          <div className="project--links" style={{ gridArea: "links" }}>
            {github && (
              <a href={github} target="_blank" rel="noreferrer" aria-label="GitHub repo">
                GitHub
              </a>
            )}
            {live && (
              <a href={live} target="_blank" rel="noreferrer" aria-label="Live demo">
                Live
              </a>
            )}
          </div>
        )}

        {/* Chips */}
        {tags.length > 0 && (
          <ul className="project--tech" style={{ gridArea: "tags" }}>
            {tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
