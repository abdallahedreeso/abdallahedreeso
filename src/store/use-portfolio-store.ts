import { useState, useEffect, createContext, useContext, ReactNode, useCallback } from "react";

export interface SlideItem {
  id: string;
  label: string;
  subtitle: string;
}

export const SLIDES: SlideItem[] = [
  { id: "home", label: "Home", subtitle: "Welcome & Overview" },
  { id: "about", label: "About", subtitle: "Background & Bio" },
  { id: "projects", label: "Projects", subtitle: "Featured Work" },
  { id: "skills", label: "Skills", subtitle: "Tech Stack & Tools" },
  { id: "contact", label: "Contact", subtitle: "Get In Touch" },
];

export interface SlideStoreType {
  currentSlideIndex: number;
  direction: number;
  totalSlides: number;
  slides: SlideItem[];
  goToSlide: (index: number) => void;
  goToSection: (id: string) => void;
  nextSlide: () => void;
  prevSlide: () => void;
}

let globalSlideIndex = 0;
let globalDirection = 1;
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

export function setGlobalSlideIndex(index: number) {
  if (index < 0 || index >= SLIDES.length || index === globalSlideIndex) return;
  globalDirection = index > globalSlideIndex ? 1 : -1;
  globalSlideIndex = index;
  notifyListeners();
}

export function nextGlobalSlide() {
  if (globalSlideIndex < SLIDES.length - 1) {
    setGlobalSlideIndex(globalSlideIndex + 1);
  }
}

export function prevGlobalSlide() {
  if (globalSlideIndex > 0) {
    setGlobalSlideIndex(globalSlideIndex - 1);
  }
}

export function goToGlobalSection(id: string) {
  const index = SLIDES.findIndex((s) => s.id === id);
  if (index !== -1) {
    setGlobalSlideIndex(index);
  }
}

export function usePortfolioStore(): SlideStoreType {
  const [state, setState] = useState({
    currentSlideIndex: globalSlideIndex,
    direction: globalDirection,
  });

  useEffect(() => {
    const handleChange = () => {
      setState({
        currentSlideIndex: globalSlideIndex,
        direction: globalDirection,
      });
    };
    listeners.add(handleChange);
    return () => {
      listeners.delete(handleChange);
    };
  }, []);

  const goToSlide = useCallback((index: number) => {
    setGlobalSlideIndex(index);
  }, []);

  const goToSection = useCallback((id: string) => {
    goToGlobalSection(id);
  }, []);

  const nextSlide = useCallback(() => {
    nextGlobalSlide();
  }, []);

  const prevSlide = useCallback(() => {
    prevGlobalSlide();
  }, []);

  return {
    currentSlideIndex: state.currentSlideIndex,
    direction: state.direction,
    totalSlides: SLIDES.length,
    slides: SLIDES,
    goToSlide,
    goToSection,
    nextSlide,
    prevSlide,
  };
}
