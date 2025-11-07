import { useState, useEffect } from "react"
import "./style.css"
import BackgroundLines from "../BackgroundLines"
import ParaWriting from "../ParaWriting"
import { motion, useAnimation } from "framer-motion"
import ArrowUpRightIcon from "../../assets/Icon/arrow-up-right.svg"
import { useInView } from "react-intersection-observer"
import Button from "../Button"
import Time from "../Time"
import Alert from "../Alert"

export default function Footer() {
  const controls = useAnimation()
  const [ref, inView] = useInView()
  const [isSending, setIsSending] = useState(false)
  const [sendStatus, setSendStatus] = useState({ processed: false, message: "", variant: "success" })
  const [hasAnimated, setHasAnimated] = useState(false)

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  })

  const handleComplete = () => setHasAnimated(true)

  useEffect(() => {
    if (inView && !hasAnimated) controls.start("visible")
  }, [inView, controls, hasAnimated])

  const opacityVariant = { hidden: { opacity: 0 }, visible: { opacity: 1 } }
  const inputFieldLineVariant = { hidden: { width: "0%" }, visible: { width: "100%" } }

  const inputFields = [
    { label: "Name", type: "text", id: "name", placeholder: "Enter name", stateKey: "name" },
    { label: "Email", type: "email", id: "email", placeholder: "you@example.com", stateKey: "email" },
    { label: "Message", type: "textarea", id: "message", placeholder: "Your message", rows: "8", wrap: "soft", stateKey: "message" },
  ]

  const onChange = (e, key) => {
    setForm(prev => ({ ...prev, [key]: e.target.value }))
  }

  const onBlur = (key) => {
    setTouched(prev => ({ ...prev, [key]: true }))
  }

  const timeoutAlert = () => setTimeout(() => setSendStatus(s => ({ ...s, processed: false })), 5000)

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!form.name || !form.email || !form.message) {
      return { ok: false, msg: "Please fill in all fields." }
    }
    if (!emailRegex.test(form.email)) {
      return { ok: false, msg: "Please enter a valid email." }
    }
    return { ok: true }
  }

  const sendEmail = () => {
  const v = validate()
  if (!v.ok) {
    setSendStatus({ processed: true, variant: "error", message: v.msg })
    timeoutAlert()
    return
  }

  // Mostrar estado de envío
  setIsSending(true)

  // Crear formulario temporal
  const formEl = document.createElement("form")
  formEl.method = "POST"
 formEl.action = "https://formsubmit.co/angel@monoestereo.dev"


 // ✅ Usa tu endpoint real

  // Agregar campos
  Object.entries(form).forEach(([key, value]) => {
    const input = document.createElement("input")
    input.type = "hidden"
    input.name = key
    input.value = value
    formEl.appendChild(input)
  })

  // Hidden fields para configuración extra
const subject = document.createElement("input")
subject.type = "hidden"
subject.name = "_subject"
subject.value = "New message from portfolio!"
formEl.appendChild(subject)

const fromName = document.createElement("input");
fromName.type = "hidden";
fromName.name = "_from";
fromName.value = "Portfolio Contact Form";
formEl.appendChild(fromName);

const template = document.createElement("input")
template.type = "hidden"
template.name = "_template"
template.value = "box"
formEl.appendChild(template)

const captcha = document.createElement("input")
captcha.type = "hidden"
captcha.name = "_captcha"
captcha.value = "false"
formEl.appendChild(captcha)

const redirect = document.createElement("input")
redirect.type = "hidden"
redirect.name = "_next"
redirect.value = window.location.href
formEl.appendChild(redirect)


  // Agregar y enviar
  document.body.appendChild(formEl)
  formEl.submit()

  // Limpiar y mostrar éxito
  setIsSending(false)
  setSendStatus({ processed: true, variant: "success", message: "Message sent successfully!" })
  setForm({ name: "", email: "", message: "" })
  setTouched({ name: false, email: false, message: false })
  timeoutAlert()
}


  return (
    <footer ref={ref} className="footer" id="contact">
      <BackgroundLines />

      <div className="footer--grid">
        <div className="footer--grid--heading">
          <h2>
            <ParaWriting stagger={0.08} text={"Get in "} sec={"touch"} />
          </h2>
        </div>

        <div className="footer--grid--form">
          {inputFields.map((field, index) => {
            const key = field.stateKey
            const hasError = touched[key] && !form[key]
            return (
              <motion.div
                key={index}
                initial="hidden"
                animate={controls}
                variants={opacityVariant}
                transition={{ duration: 1, delay: 0.5 * (index + 1) }}
                className={`input--div${hasError ? " has-error" : ""}`}
              >
                <label htmlFor={field.id}>{field.label}</label>

                {field.type === "textarea" ? (
                  <textarea
                    id={field.id}
                    name={field.id}
                    placeholder={field.placeholder}
                    rows={field.rows}
                    wrap={field.wrap}
                    value={form[key]}
                    onChange={(e) => onChange(e, key)}
                    onBlur={() => onBlur(key)}
                  />
                ) : (
                  <input
                    type={field.type}
                    id={field.id}
                    name={field.id}
                    placeholder={field.placeholder}
                    value={form[key]}
                    onChange={(e) => onChange(e, key)}
                    onBlur={() => onBlur(key)}
                  />
                )}

                <motion.div
                  initial="hidden"
                  animate={controls}
                  variants={inputFieldLineVariant}
                  transition={{ type: "spring", stiffness: 20, duration: 1, delay: 0.5 * (index + 1) }}
                  className="input--div--line"
                >
                  <motion.div
                    initial="hidden"
                    animate={touched[key] && "visible"}
                    variants={inputFieldLineVariant}
                    transition={{ type: "spring", stiffness: 20, duration: 1 }}
                  />
                </motion.div>
              </motion.div>
            )
          })}

          <motion.div
            initial="hidden"
            animate={controls}
            variants={opacityVariant}
            transition={{ duration: 1, delay: 2 }}
            className="footer--grid--form--btn"
          >
            <Button label={isSending ? "Sending…" : "SEND MESSAGE"} icon={ArrowUpRightIcon} onClick={sendEmail} />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial="hidden"
        animate={controls}
        variants={opacityVariant}
        transition={{ duration: 1, delay: 2.5 }}
        className="footer--bottom"
        onAnimationComplete={() => handleComplete()}
      >
        <p>Copyright © {new Date().getFullYear()} Angel Reyes</p>
        <p><Time delay={3} /></p>
        <p />
      </motion.div>

      <Alert isVisible={sendStatus.processed} text={sendStatus.message} variant={sendStatus.variant} />
    </footer>
  )
}
