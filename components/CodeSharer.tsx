// src/app/page.tsx
"use client";

import { useAtomValue } from "jotai";
import { toastAtom } from "../atoms/codeAtom";
import { useCodeSharer } from "../hooks/useCodeSharer";
import Editor, { Monaco } from "@monaco-editor/react"; // Proper Monaco type

import { Navbar } from "./editor/Navbar";
import { FileNameInput } from "./editor/FilenameInput";
import { EditorWindow } from "./editor/EditorWindow";
import { Toast } from "./Toast";
import { Footer } from "./Footer";

const themeBgMap: Record<string, string> = {
  "vs-dark": "#0d1117",
  dracula: "#282a36",
  nord: "#2e3440",
};

export default function CodeSharer() {
  const {
    code,
    setCode,
    language,
    setLanguage,
    theme,
    setTheme,
    fileName,
    setFileName,
    extension,
    fullFileName,
    shareCode,
  } = useCodeSharer();

  const showToast = useAtomValue(toastAtom);

  const handleEditorWillMount = (monaco: Monaco) => {
    Object.entries(themeBgMap).forEach(([key, value]) => {
      monaco.editor.defineTheme(`${key}-custom`, {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: { "editor.background": value },
      });
    });
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-slate-400 flex flex-col font-sans selection:bg-blue-500/30">
      <Navbar
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
        onShare={shareCode}
      />

      <main className="flex-1 max-w-5xl mx-auto w-full pt-12 px-6">
        <FileNameInput
          fileName={fileName}
          setFileName={setFileName}
          extension={extension}
        />

        <EditorWindow
          fileName={fullFileName}
          language={language}
          theme={theme}
          themeBg={themeBgMap[theme] || "#0d1117"}
          onCopy={() => navigator.clipboard.writeText(code)}
        >
          <Editor
            height="480px"
            language={language}
            value={code}
            theme={`${theme}-custom`}
            beforeMount={handleEditorWillMount}
            onChange={(v) => setCode(v || "")}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              fontFamily: "'JetBrains Mono', monospace",
              padding: { top: 20, bottom: 20 },
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              renderLineHighlight: "none",
              scrollbar: { vertical: "hidden", horizontal: "hidden" },
              hideCursorInOverviewRuler: true,
              overviewRulerBorder: false,
            }}
          />
        </EditorWindow>
      </main>

      {showToast && <Toast />}

      <Footer />
    </div>
  );
}
