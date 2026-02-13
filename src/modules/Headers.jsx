import React from "react";

/** CategoryNav (구 Headers.js) */
export const CategoryNav = ({categories, selected, onSelect}) => {
    return (<nav className="sticky top-0 z-50 bg-[#12151b]/90 backdrop-blur-md border-b border-gray-800 w-full mb-8">
        <div className="flex justify-center p-2 overflow-x-auto no-scrollbar">
            <div className="flex space-x-1">
                {categories.map((category) => {
                    const isSelected = selected === category.name;
                    return (<button // each item btn
                        key={category.id} onClick={() => onSelect(category.name)}
                        className={`relative px-2 py-3 rounded-lg text-sm font-bold transition-all duration-300 overflow-hidden group
                            ${isSelected ? "text-[#12151b]" : "text-[#d9dae2] hover:text-[#12151b]"}`}>
                        <span className={`absolute inset-0 w-full h-full transition-transform duration-300 origin-bottom-right bg-[#5cb4b4]
                            ${isSelected ? "scale-100 origin-bottom-left" : "scale-0 group-hover:scale-100 group-hover:origin-bottom-left"}`}/>
                        <span className="relative z-10">{category.name}</span>
                    </button>);
                })}
            </div>
        </div>
    </nav>);
};
