'use client';

import { useRef, useState, useEffect } from 'react';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    const handleLinkHover = () => setIsHoveringLink(true);
    const handleLinkLeave = () => setIsHoveringLink(false);

    window.addEventListener('mousemove', moveCursor);
    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleLinkHover);
      link.addEventListener('mouseleave', handleLinkLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkHover);
        link.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 w-4 h-4 bg-stone-900 rounded-none pointer-events-none z-[100] mix-blend-difference transition-[width,height,opacity] duration-300 -translate-x-1/2 -translate-y-1/2 hidden md:block
        ${isHoveringLink ? 'w-8 h-8 opacity-50' : 'opacity-100'}
      `}
    />
  );
};
