import { useEffect, type RefObject } from "react";

export default function useClickOutside(
  containerRef: RefObject<HTMLDivElement | null>,
  setIsOpen: (isOpen: boolean) => void,
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
}
