import React, {useMemo, useState} from "react";
import {Globe, History, LayoutGrid} from "lucide-react";
import BookmarkList from "./data/BookmarkList.js";
// import {useLiveClock} from "./modules/clock.jsx";
import {LinkCard} from "./modules/LinkCard.jsx";
import {CategoryNav} from "./modules/Headers.jsx";
import {SearchInput} from "./modules/SearchBar.jsx";

const APP_VERSION = "v2.1.0";
const NUMBER_OF_RECENT = 5;

function App() {
    const [selectedFolder, setSelectedFolder] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [recentBookmarks, setRecentBookmarks] = useState([]);

    // Time Hook
    // const {dateStr, timeStr} = useLiveClock();

    // category extraction
    const categories = useMemo(() => {
        const uniqueFolders = Array.from(new Set(BookmarkList.map(b => b.folder)));
        return [{id: 0, name: "All"}, ...uniqueFolders.map((f, i) => ({id: i + 1, name: f}))];
    }, []);

    // filtering logic
    const filteredData = useMemo(() => {
        return BookmarkList.filter(item => {
            const matchFolder = selectedFolder === "All" || item.folder === selectedFolder;
            const matchSearch = !searchTerm || item.name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchFolder && matchSearch;
        });
    }, [selectedFolder, searchTerm]);

    // handler: category click
    const handleCategoryClick = (folder) => {
        setSelectedFolder(folder);
        setSearchTerm("");
    };
    /* handler: manage recent bookmark */
    const handleBookmarkClick = (bookmark) => {
        setRecentBookmarks(prev => {
            const others = prev.filter(b => b.name !== bookmark.name);
            return [bookmark, ...others].slice(0, NUMBER_OF_RECENT); // VAR: number of recent bookmarks
        });
    };

    return (<div className="font-cst min-h-screen bg-[#12151b] selection:bg-[#5fca83] selection:text-[#12151b] pb-20">

        {/* header nav */}
        <CategoryNav
            categories={categories}
            selected={selectedFolder}
            onSelect={handleCategoryClick}
        />

        {/* bookmarks width adjustment */}
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">

            {/* main title */}
            <div className="text-center mb-8 animate-fade-in-down">
                <button onClick={() => handleCategoryClick("All")} className="group focus:outline-none">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-[#d9dae2] tracking-tighter mb-2 transition-colors group-hover:text-[#61dafb]">
                        Bookmarks
                    </h1>
                </button>
                <p className="text-gray-500 font-mono text-xs md:text-sm">{APP_VERSION}</p>
            </div>

            {/* display clock */}
            {/*<div
                className="mb-10 px-8 py-3 bg-[#1a1d24] rounded-full shadow-inner border border-gray-800/50 flex gap-4 items-center">
                <Clock size={20} className="text-[#4fc3fc]"/>
                <span className="text-[#4fc3fc] text-xl md:text-2xl font-mono tracking-widest">
            {dateStr} <span className="opacity-50 mx-2">|</span> {timeStr}
          </span>
            </div>*/}

            {/* search nar */}
            <div className="w-full mb-12">
                <SearchInput
                    value={searchTerm}
                    onChange={setSearchTerm}
                    onClear={() => setSearchTerm("")}
                    onClearRecent={() => setRecentBookmarks([])}
                />
            </div>

            {/* divider */}
            <div
                className="w-full h-px bg-linear-to-r from-transparent via-gray-700 to-transparent mb-12 opacity-50"></div>

            {/* recent section (구 Recent.js) */}
            {selectedFolder === "All" && recentBookmarks.length > 0 && (
                <section className="w-full mb-12 animate-fade-in">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <History className="text-[#d9dae2]" size={24}/>
                        <h2 className="text-2xl text-[#d9dae2] font-bold">Recent Visits</h2>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        {recentBookmarks.map((bmk, idx) => (<LinkCard
                            key={`recent-${idx}`}
                            {...bmk}
                            onClick={() => handleBookmarkClick(bmk)}
                        />))}
                    </div>

                    <div
                        className="w-full h-px bg-linear-to-r from-transparent via-gray-700 to-transparent mt-12 opacity-50"></div>
                </section>)}

            {/* Bookmark Grid (구 Bookmark.js) */}
            <section className="w-full animate-fade-in">
                <div className="flex items-center justify-center gap-2 mb-6">
                    <LayoutGrid className="text-[#d9dae2]" size={24}/>
                    <h2 className="text-2xl text-[#d9dae2] font-bold">
                        {selectedFolder === "All" ? "All Bookmarks" : selectedFolder}
                    </h2>
                </div>

                {filteredData.length === 0 ? (
                    <div className="text-center py-20 text-gray-500 flex flex-col items-center">
                        <Globe size={48} className="mb-4 opacity-20"/>
                        <p className="text-xl">No bookmarks found.</p>
                    </div>) : (<div
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
                    {filteredData.map((bmk, idx) => (<LinkCard
                        key={`main-${idx}`}
                        {...bmk}
                        onClick={() => handleBookmarkClick(bmk)}
                    />))}
                </div>)}
            </section>

        </div>
    </div>);
}

export default App;