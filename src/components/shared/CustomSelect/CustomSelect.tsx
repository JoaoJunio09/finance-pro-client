import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Check, ChevronDown } from 'lucide-react';

import styles from './CustomSelect.module.css';

interface SelectOption {
  id: string;
  name: string;
}

interface CustomSelectProps<T extends SelectOption> {
  options: T[];
  value: T | undefined;
  onChange: (option: T) => void;
  placeholder: string;
  renderOption: (option: T) => ReactNode;
  renderSelected: (option: T) => ReactNode;
  isViewName?: boolean;
}

export function CustomSelect<T extends SelectOption>({
  options,
  value,
  onChange,
  placeholder,
  renderOption,
  renderSelected,
  isViewName = false
}: CustomSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.id === value?.id);

  return (
    <div className="relative w-full" ref={ref}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between p-3.5 rounded-xl transition-all shadow-sm focus:outline-none border ${
          isOpen ? styles.triggerOpen : styles.triggerDefault
        }`}
      >
        {selectedOption ? renderSelected(selectedOption) : <span className={`text-sm ${styles.placeholder}`}>{placeholder}</span>}
        <ChevronDown size={16} className={`transition-transform duration-200 ${styles.chevron} ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className={`absolute z-50 w-full mt-2 rounded-xl shadow-xl overflow-hidden animate-scale-in max-h-60 overflow-y-auto border ${styles.dropdown}`}>
          {options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between p-3.5 transition-colors text-left focus:outline-none ${styles.option} ${
                value?.id === opt.id ? styles.optionSelected : ''
              }`}
            >
              <div className='flex items-center justify-between gap-2 truncate'>
                {isViewName && <p className='truncate'>{opt.name}</p>}
                {renderOption(opt)}
              </div>
              {value?.id === opt.id && <Check size={16} className={styles.checkIcon} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomSelect;