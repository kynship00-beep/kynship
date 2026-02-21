import { motion } from 'framer-motion';

const presets = {
    'fade-up': {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
    },
    'fade-down': {
        initial: { opacity: 0, y: -30 },
        animate: { opacity: 1, y: 0 },
    },
    'fade-left': {
        initial: { opacity: 0, x: 30 },
        animate: { opacity: 1, x: 0 },
    },
    'fade-right': {
        initial: { opacity: 0, x: -30 },
        animate: { opacity: 1, x: 0 },
    },
    'zoom-in': {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
    },
};

export default function ScrollReveal({
    children,
    preset = 'fade-up',
    delay = 0,
    duration = 0.6,
    className = ""
}) {
    const animation = presets[preset] || presets['fade-up'];

    return (
        <motion.div
            className={className}
            initial={animation.initial}
            whileInView={animation.animate}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: duration,
                delay: delay,
                ease: [0.21, 0.47, 0.32, 0.98]
            }}
        >
            {children}
        </motion.div>
    );
}
