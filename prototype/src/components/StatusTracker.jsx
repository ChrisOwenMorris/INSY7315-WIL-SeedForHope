import { Check } from 'lucide-react'

const steps = ["Paid", "Packed", "Ready", "Collected"]

export default function StatusTracker({ status }) {
  const currentStepIndex = steps.indexOf(status)

  return (
    <div className="flex items-center">
      {steps.map((step, index) => {
        const isDone = index <= currentStepIndex
        const isLast = index === steps.length - 1
        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isDone ? "bg-forest-700 text-white" : "bg-white border-2 border-line"
                }`}
              >
                {isDone && <Check size={16} />}
              </div>
              <span className={`text-sm mt-2 ${isDone ? "text-ink" : "text-ink-muted"}`}>
                {step}
              </span>
            </div>
            {!isLast && (
              <div
                className={`flex-1 h-0 border-t-2 mx-2 mb-6 ${
                  index < currentStepIndex ? "border-dashed border-forest-500" : "border-line"
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
