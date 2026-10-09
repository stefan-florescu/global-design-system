"use client";

import { ChevronLeft, ChevronRight, Pause, Play } from "@stefan-florescu/icons";
import {
  Children,
  useEffect,
  useId,
  useState,
  useSyncExternalStore,
  type ComponentProps,
  type ReactNode,
} from "react";

import { cn } from "../../lib/cn";

import {
  carouselClassName,
  carouselControlClassName,
  carouselControlIconClassName,
  carouselIndicatorClassName,
  carouselIndicatorsClassName,
  carouselSlideClassName,
  carouselTrackVariants,
  carouselViewportClassName,
  type CarouselVariantProps,
} from "./carousel.variants";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

function isFocusVisible(element: Element) {
  try {
    return element.matches(":focus-visible");
  } catch {
    return true;
  }
}

export type CarouselProps = Omit<ComponentProps<"section">, "children"> &
  CarouselVariantProps & {
    /** One child per slide. */
    children: ReactNode;
    /**
     * Advance slides automatically. A pause button is shown, rotation pauses on hover and stops
     * when keyboard focus enters, and it never starts for people who prefer reduced motion.
     */
    autoPlay?: boolean;
    /** Milliseconds between slides when `autoPlay` is on. */
    interval?: number;
    /** Show previous and next buttons. */
    controls?: boolean;
    /** Show a button per slide to jump to it. */
    indicators?: boolean;
    /** Slide shown first. */
    defaultIndex?: number;
    /** Called with the new slide index. */
    onSlideChange?: (index: number) => void;
  };

/**
 * Cycles through a set of slides. Follows the WAI-ARIA Carousel pattern: a labelled region of
 * slides, each announced as "slide 2 of 5".
 */
export function Carousel({
  children,
  autoPlay = false,
  interval = 5000,
  controls = true,
  indicators = true,
  defaultIndex = 0,
  onSlideChange,
  transition,
  className,
  id,
  ...props
}: CarouselProps) {
  const slides = Children.toArray(children);
  const count = slides.length;
  const [index, setIndex] = useState(defaultIndex);
  const [playing, setPlaying] = useState(autoPlay);
  const [hovered, setHovered] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const rotating = playing && !reducedMotion && count > 1;
  const fallbackId = useId();
  const carouselId = id ?? fallbackId;

  const goTo = (next: number) => {
    const wrapped = (next + count) % count;
    setIndex(wrapped);
    onSlideChange?.(wrapped);
  };

  // Hover pauses rotation; keyboard focus inside stops it until the user restarts it.
  // Native listeners, because the region itself is not an interactive element.
  useEffect(() => {
    const element = document.getElementById(carouselId);
    if (!element) return;
    const onEnter = () => setHovered(true);
    const onLeave = () => setHovered(false);
    const onFocusIn = (event: FocusEvent) => {
      if (event.target instanceof Element && isFocusVisible(event.target)) setPlaying(false);
    };
    element.addEventListener("pointerenter", onEnter);
    element.addEventListener("pointerleave", onLeave);
    element.addEventListener("focusin", onFocusIn);
    return () => {
      element.removeEventListener("pointerenter", onEnter);
      element.removeEventListener("pointerleave", onLeave);
      element.removeEventListener("focusin", onFocusIn);
    };
  }, [carouselId]);

  // One timer per slide, so the countdown restarts after manual navigation.
  useEffect(() => {
    if (!rotating || hovered) return;
    const timer = window.setTimeout(() => {
      const next = (index + 1) % count;
      setIndex(next);
      onSlideChange?.(next);
    }, interval);
    return () => window.clearTimeout(timer);
  }, [rotating, hovered, index, interval, count, onSlideChange]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Carousel"
      id={carouselId}
      data-slot="carousel"
      className={cn(carouselClassName, className)}
      {...props}
    >
      <div className={carouselViewportClassName}>
        <div
          aria-live={rotating ? "off" : "polite"}
          className={carouselTrackVariants({ transition })}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i !== index}
              inert={i !== index}
              className={carouselSlideClassName}
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      {indicators && count > 1 ? (
        <div className={carouselIndicatorsClassName}>
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index ? "true" : undefined}
              className={carouselIndicatorClassName}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
      ) : null}

      {controls && count > 1 ? (
        <>
          <button
            type="button"
            className={cn(carouselControlClassName, "start-0")}
            onClick={() => goTo(index - 1)}
          >
            <span className={carouselControlIconClassName}>
              <ChevronLeft aria-hidden className="rtl:rotate-180" />
              <span className="sr-only">Previous slide</span>
            </span>
          </button>
          <button
            type="button"
            className={cn(carouselControlClassName, "end-0")}
            onClick={() => goTo(index + 1)}
          >
            <span className={carouselControlIconClassName}>
              <ChevronRight aria-hidden className="rtl:rotate-180" />
              <span className="sr-only">Next slide</span>
            </span>
          </button>
        </>
      ) : null}

      {autoPlay && !reducedMotion && count > 1 ? (
        <button
          type="button"
          aria-label={playing ? "Stop automatic slide show" : "Start automatic slide show"}
          className={cn(carouselControlClassName, "start-0 h-auto p-4")}
          onClick={() => setPlaying((value) => !value)}
        >
          <span className={carouselControlIconClassName}>
            {playing ? <Pause aria-hidden /> : <Play aria-hidden />}
          </span>
        </button>
      ) : null}
    </section>
  );
}
