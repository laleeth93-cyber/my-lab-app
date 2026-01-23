"use client";

import React, { useState, useEffect } from 'react';
import { Settings, X, Type, CheckSquare } from 'lucide-react';

// --- TYPES ---
interface FieldData {
  id: number;
  label: string;
  category: string;
  isVisible: boolean;
  order: number | null;
  width: 'full' | 'half' | 'one-third';
  required: boolean;
  placeholder?: string;
}

interface ConfigureFieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  field: FieldData | null;
  onSave: (updatedField: FieldData) => void;
}

// --- COMPONENT ---
export default function ConfigureFieldModal({ isOpen, onClose, field, onSave }: ConfigureFieldModalProps) {
  const [formData, setFormData] = useState<FieldData | null>(null);

  // Sync local state when the field prop changes
  useEffect(() => {
    if (field) {
      setFormData({ ...field });
    }
  }, [field]);

  if (!isOpen || !formData) return null;

  const handleSave = () => {
    if (formData) {
      onSave(formData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden flex flex-col m-4 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div 
          className="px-6 py-4 flex items-center justify-between border-b border-purple-100 shrink-0"
          style={{ background: 'linear-gradient(to right, #e3f2fd, #f3e5f5)' }}
        >
          <div className="flex items-center gap-3">
            <Settings size={18} className="text-[#9575cd]" fill="currentColor" />
            <h3 className="font-bold text-slate-700">Configure Field</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/40 text-slate-600 hover:text-red-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          
          {/* Section 1: Field Properties */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Type size={16} className="text-[#9575cd]" />
              <h4 className="font-bold text-slate-700 text-sm">Field Properties</h4>
            </div>
            
            <div className="space-y-4 pl-1">
              {/* Field Label */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500">Field Label</label>
                <input 
                  type="text" 
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4dd0e1] transition-all"
                />
              </div>

              {/* Placeholder Text */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500">Placeholder Text</label>
                <input 
                  type="text" 
                  value={formData.placeholder || ''}
                  onChange={(e) => setFormData({ ...formData, placeholder: e.target.value })}
                  placeholder="e.g. Enter value..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4dd0e1] transition-all"
                />
              </div>

              {/* Field Width */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500">Field Width</label>
                <select 
                  value={formData.width}
                  onChange={(e) => setFormData({ ...formData, width: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#4dd0e1] bg-white transition-all"
                >
                  <option value="half">2 Columns (Half Width)</option>
                  <option value="full">1 Column (Full Width)</option>
                  <option value="one-third">3 Columns (One Third)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-100 w-full"></div>

          {/* Section 2: Field Options */}
          <div>
             <div className="flex items-center gap-2 mb-4">
              <CheckSquare size={16} className="text-[#9575cd]" />
              <h4 className="font-bold text-slate-700 text-sm">Field Options</h4>
            </div>

            <div className="space-y-3 pl-1">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={formData.required}
                  onChange={(e) => setFormData({ ...formData, required: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300 text-[#4dd0e1] focus:ring-[#4dd0e1] cursor-pointer"
                />
                <span className="text-sm font-medium text-slate-600 group-hover:text-slate-800 transition-colors">Required Field</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={formData.isVisible}
                  onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-300 text-[#4dd0e1] focus:ring-[#4dd0e1] cursor-pointer"
                />
                <span className="text-sm font-medium text-slate-600 group-hover:text-slate-800 transition-colors">Visible in Form</span>
              </label>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-slate-50 flex justify-end gap-3 shrink-0">
          <button 
            onClick={onClose}
            className="px-6 py-2 rounded-lg text-white font-medium text-sm shadow-md transition-all hover:opacity-90 active:scale-95"
            style={{ background: 'linear-gradient(to right, #ab47bc, #f06292)' }}
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-6 py-2 rounded-lg text-white font-medium text-sm shadow-md transition-all hover:opacity-90 active:scale-95"
            style={{ background: 'linear-gradient(to right, #4dd0e1, #29b6f6)' }}
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}