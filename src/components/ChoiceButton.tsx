export type ChoiceState = 'default' | 'correct' | 'incorrect' | 'unselected';

interface ChoiceButtonProps {
  label: string;
  state: ChoiceState;
  index: number;
  onClick: () => void;
  disabled: boolean;
}

const stateStyles: Record<ChoiceState, string> = {
  default:
    'bg-white border-2 border-gray-200 text-gray-900 active:scale-[0.97]',
  correct:
    'bg-green-50 border-2 border-green-500 text-green-800',
  incorrect:
    'bg-red-50 border-2 border-red-500 text-red-800',
  unselected:
    'bg-gray-100 border-2 border-gray-200 text-gray-400',
};

const indexLabels = ['ア', 'イ', 'ウ', 'エ'];

export function ChoiceButton({
  label,
  state,
  index,
  onClick,
  disabled,
}: ChoiceButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full min-h-14 px-5 py-4 rounded-xl text-left transition-all duration-200
        ${stateStyles[state]}
        ${!disabled ? 'cursor-pointer hover:shadow-md' : 'cursor-default'}
      `}
    >
      <span className="flex items-center gap-3">
        <span className="shrink-0 w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600">
          {indexLabels[index]}
        </span>
        <span className="text-xl font-bold tracking-wide">{label}</span>
      </span>
    </button>
  );
}
