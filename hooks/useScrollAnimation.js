"use client";

import { useEffect } from "react";
import { useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function useScrollAnimation() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("show");
    }
  }, [controls, isInView]);

  return { ref, controls, isInView };
}
