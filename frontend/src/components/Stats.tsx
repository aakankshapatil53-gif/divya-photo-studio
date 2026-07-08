"use client";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

const STATS = [
  { value: 5000, suffix: "+", label: "Happy Clients" },
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 1500, suffix: "+", label: "Wedding Shoots" },
  { value: 24, suffix: "×7", label: "Available", isTime: true },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: 1800, bounce: 0 });

  useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, value, motionVal]);

  useEffect(() => {
    return spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${Math.floor(v)}${suffix}`;
    });
  }, [spring, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function Stats() {
  return (
    <section className="relative -mt-16 z-20 px-5">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 rounded-3xl glass p-6 shadow-soft md:grid-cols-4 md:gap-8 md:p-10">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="text-center"
          >
            <p className="font-display text-3xl text-gold md:text-4xl">
              {s.isTime ? "24×7" : <Counter value={s.value} suffix={s.suffix} />}
            </p>
            <p className="mt-1 text-xs uppercase tracking-wide text-charcoal/70 dark:text-warmwhite/70 md:text-sm">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
