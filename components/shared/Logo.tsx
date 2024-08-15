import Image from "next/image";
import React from "react";
import svg from "../../assets/recipify.svg";

interface LogoProps extends Partial<React.ComponentProps<typeof Image>> {}

export const Logo = ({
  src = svg,
  width = 160,
  height = 60,
  alt = "Recipify logo",
  ...props
}: LogoProps) => {
  return (
    <div className="w-full flex items-center justify-center m-2">
      <Image src={src} alt={alt} width={width} height={height} {...props} />
    </div>
  );
};
