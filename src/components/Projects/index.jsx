import { useState, useEffect } from "react"
import "./style.css"
import BackgroundLines from "../BackgroundLines"
import WorkCard from "../WorkCard"
import ScrambleText from "../ScrambleText"
import ParaWriting from "../ParaWriting"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { PROJECTS } from "./data";




export default function Projects() {
  const controls = useAnimation()
  const [ref, inView] = useInView()
  const [hasAnimated, setHasAnimated] = useState(false)

  const handleComplete = () => setHasAnimated(true)

  useEffect(() => {
    if (inView && !hasAnimated) {
      controls.start("visible")
    }
  }, [inView, controls, hasAnimated])

  

  const opacityVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <section ref={ref} className="projects" id="projects">
      <BackgroundLines />
      <div className="background--glow"></div>

      <div className="projects--grid">
        {/* Mini label 03 // Projects */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={opacityVariant}
          transition={{ duration: 1, delay: 0.5 }}
          className="projects--grid--title"
        >
          <h3 className="theme--text">
            <ScrambleText shuffle delay={0.5}>03</ScrambleText>{" "}
            <span className="hash">{"//"}</span>{" "}
            <ScrambleText shuffle delay={0.5}>Projects</ScrambleText>
          </h3>
        </motion.div>

        {/* Header: title left + blurb right */}
        <div className="projects--header">
          <h2 className="projects--title">
            <ParaWriting stagger={0.08} text={"Selected "} sec={"Projects"} />
          </h2>

          <p className="projects--blurb">
            A selection of projects that reflect my focus on performance,
            accessibility, and polished experiences.
          </p>
        </div>

        {/* Projects */}
       <div className="projects--grid--content">
  <div className="projects--grid--content--works">
    {PROJECTS.map((item, index) => (
      <WorkCard item={item} key={index} />
    ))}
  </div>
</div>


        {/* (Optional) Footer detail – lo omitimos ya que el blurb está arriba */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={opacityVariant}
          transition={{ duration: 1, delay: 1 }}
          onAnimationComplete={handleComplete}
          className="projects--grid--detail is-hidden"
        />
      </div>
    </section>
  )
}
