import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const Toast = () => {
  const { toast } = useStore();

  if (!toast.show) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-luxury-500 shrink-0" />
  };

  const borderColors = {
    success: 'border-emerald-200 bg-white/95 text-stone-800',
    error: 'border-rose-200 bg-white/95 text-stone-800',
    warning: 'border-amber-200 bg-white/95 text-stone-800',
    info: 'border-luxury-300 bg-white/95 text-stone-800'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-bounce-in shadow-2xl">
      <div className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border backdrop-blur-md ${borderColors[toast.type] || borderColors.info}`}>
        {icons[toast.type] || icons.info}
        <p className="text-sm font-medium tracking-wide">{toast.message}</p>
      </div>
    </div>
  );
};
