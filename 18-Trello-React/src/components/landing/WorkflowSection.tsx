import { WORKFLOW_STEPS } from "../../constants/landingData";

export default function WorkflowSection() {
  return (
    <section id="workflow" className="py-20 bg-zinc-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">
            How It Works
          </h2>
          <p className="font-display text-3xl font-bold tracking-tight text-zinc-900">
            Three steps to a clearer head.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {WORKFLOW_STEPS.map((step) => (
            <div key={step.step} className="flex flex-col items-start">
              <span className="text-xs font-mono font-semibold text-zinc-400 mb-2">
                {step.step}
              </span>
              <h3 className="font-display text-base font-semibold text-zinc-900 mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
