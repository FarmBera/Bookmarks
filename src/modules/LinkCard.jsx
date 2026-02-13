import {useEffect, useState} from "react";

/** LinkCard (구 CreateLink.js) */
export const LinkCard = ({name, domain, isFile, onClick}) => {
    const initial = name ? name.charAt(0).toUpperCase() : "?";
    const cleanDomain = domain ? domain.replace(/^https?:\/\//, "") : "#";

    const getImageUrl = (name) => {
        try {
            return new URL(`/public/icon/${name}.png`, import.meta.url).href;
        } catch (error) {
            return null;
        }
    };

    const [imageError, setImageError] = useState(false);
    const imageUrl = getImageUrl(name);

    useEffect(() => {
        setImageError(false);
    }, [name]);

    const Content = (<div className="flex flex-col items-center justify-center h-full w-full group">
        <div className="w-16 h-16 rounded-2xl mb-3 flex items-center justify-center text-2xl font-bold shadow-lg transition-all duration-300
        bg-[#2a2f3a] text-[#d9dae2] group-hover:bg-[#548ec5] group-hover:text-white group-hover:scale-110 group-hover:rotate-3 overflow-hidden">
            {!imageError && imageUrl ? (<img
                src={imageUrl} alt={name} className="w-full h-full object-cover" onError={() => setImageError(true)}
            />) : (<span>{initial}</span>)}
        </div>
        <p className="text-[#d9dae2] text-sm font-medium px-2 truncate w-full text-center group-hover:text-white transition-colors">
            {name}
        </p>
    </div>);

    const containerClass = "w-36 h-36 p-4 rounded-xl bg-[#1a1d24] border border-[#63676b]/30 backdrop-blur-sm " + "hover:border-[#548ec5] hover:shadow-[0_0_20px_rgba(84,142,197,0.2)] hover:-translate-y-1 " + "transition-all duration-300 cursor-pointer flex items-center justify-center";

    if (isFile) {
        return (<div className={containerClass} onClick={onClick}>
            <a href={cleanDomain} download={cleanDomain}
               className="w-full h-full flex items-center justify-center no-underline">
                {Content}
            </a>
        </div>);
    }

    return (<div className={containerClass} onClick={onClick}>
        <a href={domain} target="_blank" rel="noreferrer"
           className="w-full h-full flex items-center justify-center no-underline">
            {Content}
        </a>
    </div>);
};
