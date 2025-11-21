"use client"

import { motion } from "framer-motion"
import { useEffect, useState, useRef } from "react"

interface BearCharacterProps {
  isPasswordVisible: boolean
  passwordValue?: string
  inputRef?: React.RefObject<HTMLInputElement>
}

export default function BearCharacter({ 
  isPasswordVisible, 
  passwordValue = "",
  inputRef 
}: BearCharacterProps) {
  const [blink, setBlink] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [eyeX, setEyeX] = useState(0)
  const [eyeY, setEyeY] = useState(0)
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  // Auto-blink effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true)
      setTimeout(() => setBlink(false), 200)
    }, 3500 + Math.random() * 1500)

    return () => clearInterval(blinkInterval)
  }, [])

  // Typing detection
  useEffect(() => {
    if (passwordValue.length > 0) {
      setIsTyping(true)
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current)
      typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 800)
    }
  }, [passwordValue])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!svgRef.current) return

      const svg = svgRef.current
      const rect = svg.getBoundingClientRect()
      const svgCenterX = rect.left + rect.width / 2
      const svgCenterY = rect.top + rect.height / 2

      const angle = Math.atan2(e.clientY - svgCenterY, e.clientX - svgCenterX)
      const distance = 3

      setEyeX(Math.cos(angle) * distance)
      setEyeY(Math.sin(angle) * distance)
    }

    if (isPasswordVisible) {
      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [isPasswordVisible])

  // Variants for smooth animations
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  }

  const headVariants = {
    default: { scale: 1, y: 0 },
    typing: { scale: 1.02, y: -2 },
    excited: { scale: 1.08, y: -4 },
  }

  const eyeOpenVariants = {
    open: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    closed: {
      pathLength: 0,
      opacity: 0,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  }

  const pupilVariants = {
    visible: {
      scale: 1,
      opacity: 1,
      x: eyeX,
      y: eyeY,
      transition: { duration: 0.2 },
    },
    hidden: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  }

  const mouthVariants = {
    calm: { d: "M 35 70 Q 50 75 65 70" },
    typing: { d: "M 35 70 Q 50 78 65 70" },
    happy: { d: "M 35 70 Q 50 82 65 70" },
  }

  const noseVariants = {
    calm: { scale: 1 },
    typing: { scale: 1.1 },
    excited: { scale: 1.2 },
  }

  const getHeadState = () => {
    if (isTyping) return "typing"
    if (isPasswordVisible) return "excited"
    return "default"
  }

  const getMouthState = () => {
    if (isTyping) return "typing"
    if (isPasswordVisible) return "happy"
    return "calm"
  }

  return (
    <motion.div
      className="flex justify-center mb-4"
      // variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.svg
        ref={svgRef}
        width="140"
        height="140"
        viewBox="0 0 120 140"
        className="drop-shadow-2xl"
      >
        <motion.g
          variants={headVariants}
          animate={getHeadState()}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Head shape - sleek modern look */}
        <motion.ellipse
          cx="60"
          cy="70"
          rx="38"
          ry="42"
          fill="#2d2d2d"
          filter="url(#shadow)"
          animate={{
            fill: isPasswordVisible ? "#1a1a1a" : "#2d2d2d",
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Face highlight */}
        <ellipse cx="60" cy="65" rx="35" ry="38" fill="#3d3d3d" opacity="0.8" />

        {/* Left ear */}
        <motion.circle
          cx="28"
          cy="35"
          r="14"
          fill="#2d2d2d"
          animate={{ y: isPasswordVisible ? -2 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <circle cx="28" cy="35" r="8" fill="#1a1a1a" opacity="0.6" />

        {/* Right ear */}
        <motion.circle
          cx="92"
          cy="35"
          r="14"
          fill="#2d2d2d"
          animate={{ y: isPasswordVisible ? -2 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <circle cx="92" cy="35" r="8" fill="#1a1a1a" opacity="0.6" />

        {/* Left eye - modern design */}
        <g>
          {/* Eye white */}
          <motion.ellipse
            cx="45"
            cy="55"
            rx="10"
            ry="12"
            fill="white"
            animate={{
              scale: blink ? 0.3 : 1,
            }}
            transition={{ duration: 0.15 }}
          />

          {/* Eye iris and pupil container */}
          <motion.g
            initial={{ opacity: 1 }}
            animate={{ opacity: !blink && isPasswordVisible ? 1 : 0 }}
            transition={{ duration: 0.15 }}
          >
            {/* Iris */}
            <circle cx="45" cy="55" r="7" fill="#4a90e2" opacity="0.9" />

            <motion.circle
              cx="45"
              cy="55"
              r="4.5"
              fill="#000"
              variants={pupilVariants}
              animate="visible"
            />

            {/* Pupil shine */}
            <motion.circle
              cx="46"
              cy="53"
              r="1.5"
              fill="white"
              animate={{ opacity: isPasswordVisible ? 0.8 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.g>
        </g>

        {/* Right eye */}
        <g>
          <motion.ellipse
            cx="75"
            cy="55"
            rx="10"
            ry="12"
            fill="white"
            animate={{
              scale: blink ? 0.3 : 1,
            }}
            transition={{ duration: 0.15 }}
          />

          <motion.g
            initial={{ opacity: 1 }}
            animate={{ opacity: !blink && isPasswordVisible ? 1 : 0 }}
            transition={{ duration: 0.15 }}
          >
            <circle cx="75" cy="55" r="7" fill="#4a90e2" opacity="0.9" />

            <motion.circle
              cx="75"
              cy="55"
              r="4.5"
              fill="#000"
              variants={pupilVariants}
              animate="visible"
            />

            <motion.circle
              cx="76"
              cy="53"
              r="1.5"
              fill="white"
              animate={{ opacity: isPasswordVisible ? 0.8 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.g>
        </g>

        <motion.path
          d="M 35 45 Q 45 40 55 45"
          stroke="#1a1a1a"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          animate={{
            d: isTyping ? "M 35 42 Q 45 37 55 42" : "M 35 45 Q 45 40 55 45",
          }}
          transition={{ duration: 0.2 }}
        />
        <motion.path
          d="M 65 45 Q 75 40 85 45"
          stroke="#1a1a1a"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          animate={{
            d: isTyping ? "M 65 42 Q 75 37 85 42" : "M 65 45 Q 75 40 85 45",
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Nose - modern shape */}
        <motion.path
          d="M 60 60 L 60 68 L 57 72 L 63 72"
          fill="#1a1a1a"
          opacity="0.6"
          variants={noseVariants}
          animate={getHeadState()}
          transition={{ duration: 0.3 }}
        />

        <motion.path
          strokeWidth="3"
          stroke="#1a1a1a"
          fill="none"
          strokeLinecap="round"
          variants={mouthVariants}
          animate={getMouthState()}
          transition={{ duration: 0.3 }}
        />

        {/* {isTyping && (
          <g>
            <motion.circle
              cx="50"
              cy="95"
              r="2.5"
              fill="#4a90e2"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 0.6, delay: 0 }}
            />
            <motion.circle
              cx="60"
              cy="95"
              r="2.5"
              fill="#4a90e2"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
            <motion.circle
              cx="70"
              cy="95"
              r="2.5"
              fill="#4a90e2"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
          </g>
        )} */}
        </motion.g>
      </motion.svg>
    </motion.div>
  )
}
