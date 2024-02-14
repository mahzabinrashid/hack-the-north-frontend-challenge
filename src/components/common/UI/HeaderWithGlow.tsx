import React from "react";
import GlowText from "./GlowText/GlowText";

interface HeaderWithGlowProps {
  text: string;
  color: string;
}

const HeaderWithGlow: React.FC<HeaderWithGlowProps> = ({ text, color }) => {
  return (
    <GlowText color={color}>
      <h2 className="numbered-heading">{text}</h2>
    </GlowText>
  );
};

export default HeaderWithGlow;
