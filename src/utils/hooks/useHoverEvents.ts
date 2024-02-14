import { useCallback, Dispatch, SetStateAction } from "react";

export const isTouchOrStylusBasedScreen =
  typeof window !== "undefined"
    ? window.matchMedia("(hover: none) and (pointer: coarse)").matches ||
      window.matchMedia("(hover: none) and (pointer: fine)").matches
    : false;

export const useHoverEvents = (
  setIsHovering: Dispatch<SetStateAction<boolean>>
) => {
  const onHoverStart = useCallback(() => {
    if (isTouchOrStylusBasedScreen) return;
    setIsHovering(true);
  }, [setIsHovering]);
  const onHoverEnd = useCallback(() => {
    if (isTouchOrStylusBasedScreen) return;
    setIsHovering(false);
  }, [setIsHovering]);
  const toggleHover = useCallback(() => {
    if (!isTouchOrStylusBasedScreen) return;
    setIsHovering((prevHovering) => !prevHovering);
  }, [setIsHovering]);

  return { onHoverStart, onHoverEnd, toggleHover };
};
