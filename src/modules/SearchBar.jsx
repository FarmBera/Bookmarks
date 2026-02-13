import React from "react";
import {Search, Trash2, X} from 'lucide-react'

/** SearchInput (구 SearchBar.js) */
export const SearchInput = ({value, onChange, onClear, onClearRecent}) => {
    return (<div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-2xl mx-auto px-4">
        <div className="relative w-full sm:w-auto grow group">
            <div
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#61dafb] transition-colors">
                <Search size={18}/>
            </div>
            <input
                type="text"
                placeholder="Search bookmarks..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full h-12 pl-10 pr-4 bg-[#1a1d24] border border-[#d9dae2] text-[#d9dae2] rounded-lg
          focus:outline-none focus:border-[#61dafb] focus:ring-1 focus:ring-[#61dafb]
          placeholder-gray-600 transition-all duration-200"/>
            {value && (<button
                onClick={onClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#f14c4c]"
            >
                <X size={18}/>
            </button>)}
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
            <button
                onClick={onClearRecent}
                className="h-12 px-4 flex items-center justify-center gap-2 border border-[#d9dae2] text-[#d9dae2] rounded-lg
          hover:bg-[#f14c4c] hover:border-[#f14c4c] hover:text-white transition-all duration-200 whitespace-nowrap grow sm:grow-0"
            >
                <Trash2 size={16}/>
                <span>Clear History</span>
            </button>
        </div>
    </div>);
};
