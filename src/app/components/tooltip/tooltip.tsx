'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  autoCloseDelay?: number | false; // false = no auto close, number = delay in ms
}

export function Tooltip({ text, children, autoCloseDelay = 2000 }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number; arrowLeft: number; showBelow: boolean }>({ 
    top: 0, 
    left: 0, 
    arrowLeft: 0,
    showBelow: false 
  });
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle clicking outside to close tooltip when autoCloseDelay is false
  useEffect(() => {
    if (!isVisible || autoCloseDelay !== false) return;

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        triggerRef.current && 
        !triggerRef.current.contains(event.target as Node) &&
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isVisible, autoCloseDelay]);

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const padding = 12;
    const arrowSize = 8;

    let showBelow = false;
    let top = triggerRect.top - tooltipRect.height - arrowSize - 4;
    let left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);

    // If tooltip would go above viewport, position below instead
    if (top < padding) {
      top = triggerRect.bottom + arrowSize + 4;
      showBelow = true;
    }

    // Calculate arrow position (centered on trigger)
    let arrowLeft = tooltipRect.width / 2;

    // If tooltip would go off left edge
    if (left < padding) {
      arrowLeft = triggerRect.left + (triggerRect.width / 2) - padding;
      left = padding;
    }

    // If tooltip would go off right edge
    if (left + tooltipRect.width > window.innerWidth - padding) {
      const oldLeft = left;
      left = window.innerWidth - tooltipRect.width - padding;
      arrowLeft = tooltipRect.width / 2 + (oldLeft - left);
    }

    // Clamp arrow position
    arrowLeft = Math.max(12, Math.min(arrowLeft, tooltipRect.width - 12));

    setPosition({ top, left, arrowLeft, showBelow });
  }, []);

  useEffect(() => {
    if (isVisible) {
      // Use requestAnimationFrame for smooth updates
      const updatePosition = () => {
        calculatePosition();
        if (isVisible) {
          requestAnimationFrame(updatePosition);
        }
      };
      requestAnimationFrame(updatePosition);
    }
  }, [isVisible, calculatePosition]);

  const handleTouchEnd = () => {
    if (autoCloseDelay !== false) {
      setTimeout(() => setIsVisible(false), autoCloseDelay);
    }
  };

  const tooltipContent = isVisible && mounted ? (
    <div
      ref={tooltipRef}
      className={`tooltip-content ${position.showBelow ? 'tooltip-below' : 'tooltip-above'}`}
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        '--arrow-left': `${position.arrowLeft}px`,
      } as React.CSSProperties}
      role="tooltip"
    >
      {text}
    </div>
  ) : null;

  return (
    <>
      <span
        ref={triggerRef}
        className="tooltip-trigger"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onTouchStart={() => setIsVisible(true)}
        onTouchEnd={handleTouchEnd}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        tabIndex={0}
      >
        {children}
      </span>
      {mounted && createPortal(tooltipContent, document.body)}
    </>
  );
}
