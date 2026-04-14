interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  bg?: "white" | "gray" | "dark";
  id?: string;
  fullWidth?: boolean;
}

export default function SectionWrapper({
  children,
  className = "",
  bg = "white",
  id,
  fullWidth = false,
}: SectionWrapperProps) {
  const bgMap = {
    white: "bg-white",
    gray: "bg-gray-50",
    dark: "bg-primary-900 text-white",
  };

  return (
    <section id={id} className={`py-16 sm:py-20 md:py-[5.5rem] lg:py-24 xl:py-28 3xl:py-32 ${bgMap[bg]} ${className}`}>
      {fullWidth ? children : (
        <div className="max-w-8xl mx-auto px-6 sm:px-10 lg:px-16">{children}</div>
      )}
    </section>
  );
}
