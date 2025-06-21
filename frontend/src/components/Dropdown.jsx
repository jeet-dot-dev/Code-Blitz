import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { languageStarterCodes } from "../constant";

function DropdownComp({ setlang, setBoilerplate }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const languages = ["JavaScript", "C", "C++", "Python", "Java"];

  const handleChange = (l) => {
    const starter = languageStarterCodes.find((item) => item.lang === l);
    const starterCode = starter ? starter.code : " ";
   // console.log(starter);
    setlang(l);
    setBoilerplate(starterCode);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Toggle Button */}
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center m-2 justify-between w-40 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-green-500 text-white font-medium hover:bg-green-600 focus:outline-none"
      >
        Language
        <ChevronDown className="ml-2 h-4 w-4" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            {languages.map((lang, index) => (
              <p
                key={index}
                className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  console.log(`Selected: ${lang}`);
                  setIsOpen(false);
                  
                    handleChange(lang);
                  
                }}
              >
                {lang}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DropdownComp;
