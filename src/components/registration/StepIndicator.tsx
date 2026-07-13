import './StepIndicator.css'

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  labels: string[]
}

export function StepIndicator({ currentStep, totalSteps, labels }: StepIndicatorProps) {
  return (
    <div className="step-indicator" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={totalSteps}>
      <div className="step-indicator__track">
        {Array.from({ length: totalSteps }, (_, i) => {
          const stepNum = i + 1
          const isActive = stepNum === currentStep
          const isComplete = stepNum < currentStep
          return (
            <div key={i} className={`step-indicator__step${isActive ? ' step-indicator__step--active' : ''}${isComplete ? ' step-indicator__step--complete' : ''}`}>
              <span className="step-indicator__num">{isComplete ? '✓' : stepNum}</span>
            </div>
          )
        })}
      </div>
      <span className="step-indicator__label">
        {currentStep}. {labels[currentStep - 1]}
      </span>
    </div>
  )
}
