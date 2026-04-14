interface Milestone {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  milestones: Milestone[];
}

export default function Timeline({ milestones }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-primary-100 sm:-translate-x-px" />

      <div className="space-y-12 sm:space-y-16">
        {milestones.map((milestone, index) => {
          const isLeft = index % 2 === 0;
          return (
            <div key={index} className="relative flex items-start sm:items-center">
              {/* Dot */}
              <div className="absolute left-4 sm:left-1/2 w-3 h-3 rounded-full bg-accent border-[3px] border-primary-100 -translate-x-1.5 sm:-translate-x-1.5 top-1 sm:top-auto z-10" />

              {/* Mobile: always right side */}
              <div className="pl-8 sm:hidden">
                <span className="text-[13px] font-bold text-accent uppercase tracking-wider">
                  {milestone.year}
                </span>
                <h4 className="text-[16px] font-semibold text-neutral-900 mt-1 mb-2">
                  {milestone.title}
                </h4>
                <p className="text-[14px] text-neutral-500 leading-relaxed">
                  {milestone.description}
                </p>
              </div>

              {/* Desktop: alternating */}
              <div className="hidden sm:grid sm:grid-cols-2 sm:gap-12 w-full">
                <div className={`${isLeft ? "text-right pr-12" : "col-start-2 pl-12"}`}>
                  <span className="text-[13px] font-bold text-accent uppercase tracking-wider">
                    {milestone.year}
                  </span>
                  <h4 className="text-[18px] font-semibold text-neutral-900 mt-1 mb-2">
                    {milestone.title}
                  </h4>
                  <p className="text-[15px] text-neutral-500 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
