import React, {  useContext, useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import DropdownComp from "./Dropdown";
import { languageStarterCodes } from "../constant";
import axios from "axios";
import { SocketContext } from "../../SocketContex";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const EditorComp = ({ setCompileCode,room }) => {
  // Fixed: Use "JavaScript" (capitalized) to match your languageMap keys
    const socket = useContext(SocketContext);
    const navigate = useNavigate();
  const [lang, setlang] = useState("JavaScript");
  const [boilerplate, setBoilerplate] = useState(() => {
    const starter = languageStarterCodes.find((l) => l.lang === "JavaScript");
    return starter ? starter.code : "";
  });
 
  //  // Load code from localStorage or fallback to starter code
  // useEffect(() => {
  //   const savedCode = localStorage.getItem(`code-${lang}`);
  //   if (savedCode) {
  //     setBoilerplate(savedCode);
  //   } else {
  //     const starter = languageStarterCodes.find((l) => l.lang === lang);
  //     setBoilerplate(starter ? starter.code : "");
  //   }
  // }, [lang]);

  // // Save to localStorage on every change
  // useEffect(() => {
  //   localStorage.setItem(`code-${lang}`, boilerplate);
  // }, [boilerplate, lang]);



  // Language mapping with specific versions
  
  useEffect(()=>{
    if(!socket){
      return
    }
    socket.on("codeSubmissionMsg",(data)=>{
      navigate('/res/waiting');
      toast.success(data.msg);
    })

    return ()=> {
      socket.off("codeSubmissionMsg");
    }
  },[socket,navigate])











  const handleClick = ()=>{
    const id = localStorage.getItem("id");
    if(!id){  
      console.error("Player ID not found in localStorage");
      return;
    }

    const data = {
      playerId: id,
      language:lang,
      submitted_code : boilerplate,
      room
    };
    socket.emit("codeSubmited", data);

  };

  const languageMap = {
    JavaScript: { language: "javascript", version: "18.15.0" },
    C: { language: "c", version: "10.2.0" },
    "C++": { language: "c++", version: "10.2.0" },
    Python: { language: "python", version: "3.10.0" },
    Java: { language: "java", version: "15.0.2" },
  };

  // Fixed file extension mapping
  const getFileExtension = (pistonLang) => {
    const extensionMap = {
      javascript: "js",
      c: "c",
      "c++": "cpp", // File extension is still .cpp
      python: "py",
      java: "java",
    };
    return extensionMap[pistonLang] || pistonLang;
  };

  const complieCodeFunc = async () => {
    const langConfig = languageMap[lang];
    console.log(
      "Compiling using language:",
      langConfig.language,
      "version:",
      langConfig.version
    );

    try {
      const response = await axios.post(
        "https://emkc.org/api/v2/piston/execute",
        {
          language: langConfig.language,
          version: langConfig.version,
          files: [
            {
              name: `main.${getFileExtension(langConfig.language)}`,
              content: boilerplate,
            },
          ],
        }
      );

    //  console.log("Piston Response:", response?.data?.run?.output);
      setCompileCode(response?.data?.run?.output);
    } catch (error) {
      console.error("Piston API error:", error);
      setCompileCode({
        error: "Compilation error",
        details: error.response?.data?.message || error.message,
      });
    }
  };

  //console.log(boilerplate);
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <DropdownComp setlang={setlang} setBoilerplate={setBoilerplate} />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            v{languageMap[lang]?.version}
          </span>
        </div>
        <button
        className="bg-green-500 text-white font-semibold px-4 py-1 m-2 rounded-2xl shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 active:bg-green-700 transition duration-200"
        onClick={handleClick}
        >Submit
        </button>
        <button
          onClick={() => complieCodeFunc()}
          className="bg-blue-500 text-white font-semibold px-4 py-1 m-2 rounded-2xl shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 active:bg-blue-700 transition duration-200"
        >
          Compile
        </button>
      </div>
      <Editor
        className="pt-5"
        height="50vh"
        language={languageMap[lang]?.language || "plaintext"}
        theme="vs-dark"
        value={boilerplate}
        onChange={(newValue) => setBoilerplate(newValue)}
      />
    </div>
  );
};

export default EditorComp;
