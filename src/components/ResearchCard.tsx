interface ResearchCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function ResearchCard({ icon, title, description }: ResearchCardProps) {
  return (
    <div className="group bg-white border border-neutral-100 rounded-xl p-4 sm:p-6 md:p-8 hover:shadow-lg hover:border-primary-200 transition-all duration-300">
      <div className="w-12 h-12 rounded-lg bg-primary-50 flex items-center justify-center text-accent mb-5 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-[17px] sm:text-[18px] font-semibold text-neutral-900 mb-3 leading-tight">
        {title}
      </h3>
      <p className="text-[14px] sm:text-[15px] text-neutral-500 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
