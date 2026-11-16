import { useEffect, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export interface ScrollRevealOptions {
  y?: number;
  x?: number;
  scale?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  selector?: string;
  once?: boolean;
}

/**
 * Smooth ScrollTrigger reveal with automatic GSAP context & prefers-reduced-motion support.
 * When `selector` is provided, animates matching child elements with stagger.
 */
export function useScrollReveal<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: ScrollRevealOptions = {}
) {
  const {
    y = 26,
    x = 0,
    scale = 1,
    duration = 0.75,
    delay = 0,
    stagger = 0.08,
    start = 'top 86%',
    selector,
    once = false,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const targets = selector ? el.querySelectorAll(selector) : el;
      if (selector && (targets as NodeListOf<Element>).length === 0) return;

      gsap.fromTo(
        targets,
        { opacity: 0, y, x, scale },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration,
          delay,
          stagger,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: once ? 'play none none none' : 'play none none reverse',
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [ref, y, x, scale, duration, delay, stagger, start, selector, once]);
}

export interface TextRevealOptions {
  y?: number;
  stagger?: number;
  duration?: number;
  start?: string;
}

/**
 * Staggered editorial line/word reveal triggered via GSAP ScrollTrigger.
 * Wraps child nodes or targets `[data-reveal-line]` elements for staggered entrance.
 */
export function useTextReveal<T extends HTMLElement>(
  ref: RefObject<T | null>,
  options: TextRevealOptions = {}
) {
  const { y = 24, stagger = 0.09, duration = 0.75, start = 'top 85%' } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const lines = el.querySelectorAll('[data-reveal-line]');
      const targets = lines.length > 0 ? lines : [el];

      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [ref, y, stagger, duration, start]);
}

export interface ParallaxOptions {
  yPercent?: number;
  scaleFrom?: number;
  scaleTo?: number;
  start?: string;
  end?: string;
  scrub?: boolean | number;
}

/**
 * Scroll-linked vertical parallax + subtle scale transform via GSAP ScrollTrigger scrub.
 */
export function useParallax<T extends HTMLElement>(
  ref: RefObject<T | null>,
  triggerRef?: RefObject<HTMLElement | null>,
  options: ParallaxOptions = {}
) {
  const {
    yPercent = 12,
    scaleFrom = 1.08,
    scaleTo = 1.0,
    start = 'top bottom',
    end = 'bottom top',
    scrub = 0.8,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -yPercent, scale: scaleFrom },
        {
          yPercent,
          scale: scaleTo,
          ease: 'none',
          scrollTrigger: {
            trigger: triggerRef?.current || el,
            start,
            end,
            scrub,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [ref, triggerRef, yPercent, scaleFrom, scaleTo, start, end, scrub]);
}

export interface HorizontalMarqueeOptions {
  duration?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
}

/**
 * Seamless GPU-composited infinite horizontal marquee with hover pause & reduced-motion guard.
 */
export function useHorizontalMarquee<T extends HTMLElement>(
  trackRef: RefObject<T | null>,
  options: HorizontalMarqueeOptions = {}
) {
  const { duration = 34, reverse = false, pauseOnHover = true } = options;

  useEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return;

    let tween: gsap.core.Tween | null = null;
    const ctx = gsap.context(() => {
      tween = gsap.fromTo(
        track,
        { xPercent: reverse ? -50 : 0 },
        {
          xPercent: reverse ? 0 : -50,
          duration,
          ease: 'none',
          repeat: -1,
        }
      );
    }, trackRef);

    const onEnter = () => pauseOnHover && tween?.pause();
    const onLeave = () => pauseOnHover && tween?.resume();

    if (pauseOnHover) {
      track.addEventListener('mouseenter', onEnter);
      track.addEventListener('mouseleave', onLeave);
    }

    return () => {
      if (pauseOnHover) {
        track.removeEventListener('mouseenter', onEnter);
        track.removeEventListener('mouseleave', onLeave);
      }
      ctx.revert();
    };
  }, [trackRef, duration, reverse, pauseOnHover]);
}

export interface PinnedSectionOptions {
  minWidth?: number;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  onUpdate?: (progress: number) => void;
}

/**
 * Creates a responsive GSAP ScrollTrigger pinned/scrubbed controller gated by viewport breakpoint.
 */
export function usePinnedSection<T extends HTMLElement>(
  triggerRef: RefObject<T | null>,
  pinTargetRef?: RefObject<HTMLElement | null>,
  options: PinnedSectionOptions = {}
) {
  const {
    minWidth = 1024,
    start = 'top top',
    end = 'bottom bottom',
    scrub = 0.6,
    onUpdate,
  } = options;

  useEffect(() => {
    const triggerEl = triggerRef.current;
    if (!triggerEl || prefersReducedMotion()) return;

    const mm = gsap.matchMedia();
    mm.add(`(min-width: ${minWidth}px)`, () => {
      const st = ScrollTrigger.create({
        trigger: triggerEl,
        pin: pinTargetRef?.current || false,
        pinType: 'transform',
        start,
        end,
        scrub,
        onUpdate: (self) => {
          onUpdate?.(self.progress);
        },
      });
      return () => st.kill();
    });

    return () => mm.revert();
  }, [triggerRef, pinTargetRef, minWidth, start, end, scrub, onUpdate]);
}

/**
 * Replicates Wispr Flow's signature `[data-corners]` scroll-scrubbed border-radius smoothing:
 * rounded corners smoothly straighten to square (`0px`) as the section locks into the viewport
 * and round back up to `maxRadius` as the top/bottom edge enters or leaves.
 */
export function useScrollCorners<T extends HTMLElement>(
  ref: RefObject<T | null>,
  maxRadiusDesktop = 72,
  maxRadiusMobile = 40
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let currentTop = -1;
    let currentBottom = -1;
    let writtenTop = -1;
    let writtenBottom = -1;

    const tick = () => {
      const vh = window.innerHeight || 1;
      const maxR = window.innerWidth >= 640 ? maxRadiusDesktop : maxRadiusMobile;
      const rect = el.getBoundingClientRect();
      if (!rect.width && !rect.height) return;

      const targetTop = Math.max(0, Math.min(maxR, rect.top));
      const targetBottom = Math.max(0, Math.min(maxR, vh - rect.bottom));

      if (currentTop < 0) {
        currentTop = targetTop;
        currentBottom = targetBottom;
      } else {
        const k = 1 - Math.pow(1 - 0.18, gsap.ticker.deltaRatio());
        currentTop += (targetTop - currentTop) * k;
        currentBottom += (targetBottom - currentBottom) * k;
        if (Math.abs(targetTop - currentTop) < 0.2) currentTop = targetTop;
        if (Math.abs(targetBottom - currentBottom) < 0.2) currentBottom = targetBottom;
      }

      if (Math.round(currentTop) === writtenTop && Math.round(currentBottom) === writtenBottom) {
        return;
      }
      writtenTop = Math.round(currentTop);
      writtenBottom = Math.round(currentBottom);

      el.style.borderTopLeftRadius = `${currentTop.toFixed(1)}px`;
      el.style.borderTopRightRadius = `${currentTop.toFixed(1)}px`;
      el.style.borderBottomLeftRadius = `${currentBottom.toFixed(1)}px`;
      el.style.borderBottomRightRadius = `${currentBottom.toFixed(1)}px`;
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
    };
  }, [ref, maxRadiusDesktop, maxRadiusMobile]);
}

export { gsap, ScrollTrigger, MotionPathPlugin };
