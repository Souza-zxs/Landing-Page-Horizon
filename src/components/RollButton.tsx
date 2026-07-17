import type { ReactNode } from "react";

const EASE = "duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]";

type RollButtonProps = {
  label: string;
  className?: string;
  textWrapperClassName?: string;
  circleClassName?: string;
  icon: ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
};

export default function RollButton({
  label,
  className = "",
  textWrapperClassName = "",
  circleClassName = "",
  icon,
  type = "button",
  onClick,
}: RollButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`group inline-flex items-center gap-3 rounded-full transition-colors duration-300 ${className}`}
    >
      <span className={`relative overflow-hidden h-[20px] ${textWrapperClassName}`}>
        <span
          className={`flex flex-col transition-transform ${EASE} group-hover:-translate-y-1/2`}
        >
          <span className="h-[20px] leading-[20px]">{label}</span>
          <span className="h-[20px] leading-[20px]">{label}</span>
        </span>
      </span>
      <span
        className={`flex items-center justify-center rounded-full transition-transform ${EASE} group-hover:-rotate-45 ${circleClassName}`}
      >
        {icon}
      </span>
    </button>
  );
}
