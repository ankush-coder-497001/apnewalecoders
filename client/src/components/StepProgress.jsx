import { CheckIcon } from '@heroicons/react/24/solid';

const defaultSteps = [
  { name: 'Personal Info', status: 'upcoming' },
  { name: 'Date & Time', status: 'upcoming' },
  { name: 'Payment', status: 'upcoming' },
  { name: 'Confirmation', status: 'upcoming' }
];

const StepProgress = ({ steps = defaultSteps, currentStep }) => {
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={`${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''} relative`}
          >
            {step.status === 'complete' ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-indigo-600" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-900">
                  <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
                  <span className="sr-only">{step.name}</span>
                </div>
              </>
            ) : step.status === 'current' ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div
                  className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white"
                  aria-current="step"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" aria-hidden="true" />
                  <span className="sr-only">{step.name}</span>
                </div>
              </>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:border-gray-400">
                  <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                  <span className="sr-only">{step.name}</span>
                </div>
              </>
            )}
            <span className="absolute left-0 top-9 text-sm font-medium text-gray-500">
              {step.name}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default StepProgress;
