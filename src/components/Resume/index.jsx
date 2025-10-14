import { useState, useEffect } from "react"
import "./style.css"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

// components
import BackgroundLines from "../BackgroundLines"
import ParaWriting from "../ParaWriting"
import FadeList from "../FadeList"
import ScrambleText from "../ScrambleText"
import ResumeCard from "../ResumeCard"
import Icon from "../Icon"

// asset
import githubIcon from "../../assets/Icon/github.svg"
import linkedinIcon from "../../assets/Icon/linkedin.svg"
import fileIcon from "../../assets/Icon/file.svg"

// data
import technicalSkills from "../../constants/technicalSkills.json"
import technicalSkills2 from "../../constants/technicalSkills2.json"
import qualities from "../../constants/qualities.json"
import experienceList from "../../constants/experienceList.json"

export default function Resume() {
  const controls = useAnimation()
  const [ref, inView] = useInView()
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (inView && !hasAnimated) controls.start("visible")
  }, [inView, controls, hasAnimated])

  const opacityVariant = { hidden: { opacity: 0 }, visible: { opacity: 1 } }
  const blurVariants = {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  }

  return (
    <section ref={ref} className="resume" id="resume">
      <BackgroundLines />

      <div className="resume--grid">
        {/* LEFT — Profile & skills */}
        <div className="resume--grid--detail">
          
          

          <div className="resume--grid--detail--data">
            <div className="resume--grid--detail--data--name">
              <h2>
                <ParaWriting stagger={0.08} text={"Angel Reyes"} />
              </h2>
              <h4 className="resume--role">
  <ScrambleText shuffle delay={0.2}>Frontend Developer</ScrambleText>
</h4>


              <motion.div
  initial="hidden"
  animate={controls}
  variants={blurVariants}
  transition={{ duration: 1, delay: 0.5 }}
  onAnimationComplete={() => handleComplete()}
  className="resume--grid--detail--data--name--icons"
>
  {/* GitHub */}
  <a href="https://github.com/angelmonoestereo" target="_blank" rel="noreferrer">
    <div className="Icon Icon--github">
      <img className="Icon--icon" src={githubIcon} alt="GitHub" />
      <span className="Icon--border Icon--lt" />
      <span className="Icon--border Icon--lb" />
      <span className="Icon--border Icon--rt" />
      <span className="Icon--border Icon--rb" />
    </div>
  </a>

  {/* LinkedIn */}
  <a href="https://www.linkedin.com/in/angelmonoestereo" target="_blank" rel="noreferrer">
    <div className="Icon Icon--linkedin">
      <img className="Icon--icon" src={linkedinIcon} alt="LinkedIn" />
      <span className="Icon--border Icon--lt" />
      <span className="Icon--border Icon--lb" />
      <span className="Icon--border Icon--rt" />
      <span className="Icon--border Icon--rb" />
    </div>
  </a>

  {/* Resume */}
  <a href="/Angel-Reyes-Resume.pdf" target="_blank" rel="noreferrer">
    <div className="Icon Icon--resume">
      <img className="Icon--icon" src={fileIcon} alt="Resume" />
      <span className="Icon--border Icon--lt" />
      <span className="Icon--border Icon--lb" />
      <span className="Icon--border Icon--rt" />
      <span className="Icon--border Icon--rb" />
    </div>
  </a>
</motion.div>

               
            </div>

            <div className="resume--summary">
              <p className="theme--detail">
                <ScrambleText delay={0.4}>
                  Frontend Developer focused on React/Next.js and JavaScript. Delivers clean, responsive UIs with smooth
                  micro-interactions and reliable releases. Deployed to Vercel; collaborates via Git & GitHub.
                </ScrambleText>
              </p>
            </div>

            <div className="resume--grid--detail--data--skills">
              <h4><ScrambleText shuffle delay={0.6}>Technical Skills</ScrambleText></h4>
              <div className="double">
                <FadeList delay={0.7} controls={controls} data={technicalSkills} shuffle />
                <FadeList delay={0.9} controls={controls} data={technicalSkills2} shuffle />
              </div>
            </div>

            <div className="resume--grid--detail--data--skills">
              <h4><ScrambleText shuffle delay={1.1}>Strengths</ScrambleText></h4>
              <FadeList delay={1.2} controls={controls} data={qualities} shuffle />
            </div>
          </div>
        </div>

        {/* RIGHT — Experience timeline */}
        <div className="resume--grid--experience">
          <div className="resume--grid--experience--head">
            <motion.h3
              initial="hidden"
              animate={controls}
              variants={opacityVariant}
              transition={{ duration: 1, delay: 0.4 }}
              className="theme--text"
            >
              <ScrambleText shuffle delay={0.4}>05</ScrambleText>{" "}
              <span className="hash">{"//"}</span>{" "}
              <ScrambleText shuffle delay={0.4}>Resume</ScrambleText>
            </motion.h3>

            <p className="theme--detail resume--intro">
              <ScrambleText delay={0.6}>
                Internship experience across Skinstric (camera flow + analysis UI backed by real APIs) and NFT (responsive landing + interactions). Vercel deployments and lightweight CI with GitHub Actions.
              </ScrambleText>
            </p>
          </div>

          <div className="resume--grid--experience--body">
            <h4><ScrambleText shuffle delay={0.8}>Experience</ScrambleText></h4>

            {experienceList.map((item, index) => (
              <ResumeCard key={index} experienceList={item} controls={controls} delay={index * 0.2 + 1.0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
