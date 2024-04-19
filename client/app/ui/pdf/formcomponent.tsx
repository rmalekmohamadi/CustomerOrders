'use client'

import { useRef, useState } from "react";
import { Template, checkTemplate, getInputFromTemplate } from "@pdfme/common";
import { Form, Viewer } from "@pdfme/ui";
import {
  getFontsData,
  getTemplateByPreset,
  handleLoadTemplate,
  generatePDF,
  getPlugins,
  isJsonString,
} from "@/app/pdf/designer/helper";
import { Breadcrumb, FileInput, Label } from "flowbite-react";
import PageTitle from "@/app/ui/pagetitle";
import { FaFilePdf } from "react-icons/fa";
import { FaArrowRightToBracket,FaArrowRightFromBracket } from "react-icons/fa6";
import { CiSaveDown2 } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";
import { IoDownloadOutline } from "react-icons/io5";
import TemplatePreset from "@/app/types/TemplatePreset";


const headerHeight = 71;

type Mode = "form" | "viewer";

const initTemplate = (presets: TemplatePreset[]) => {
  let template: Template = presets[0].template;
//   getTemplateByPreset(presets, localStorage.getItem('templatePreset') || "")
//   try {
//     const templateString = localStorage.getItem("template");
//     if (!templateString) {
//       return template;
//     }
//     const templateJson = JSON.parse(templateString)
//     checkTemplate(templateJson);
//     template = templateJson as Template;
//   } catch {
//     localStorage.removeItem("template");
//   }
  return template;
};

function FormComponent({
    templatePresets
  }: {
    templatePresets: TemplatePreset[];
  }) {
    
  const uiRef = useRef<HTMLDivElement | null>(null);
  const ui = useRef<Form | Viewer | null>(null);
  const [prevUiRef, setPrevUiRef] = useState<Form | Viewer | null>(null);


  const [mode, setMode] = useState<Mode>(
    (localStorage.getItem("mode") as Mode) ?? "form"
  );

  const buildUi = (mode: Mode) => {
    console.log(mode)
    const template = initTemplate(templatePresets);
    let inputs = getInputFromTemplate(template);
    try {
      const inputsString = localStorage.getItem("inputs");
      if (inputsString) {
        const inputsJson = JSON.parse(inputsString);
        inputs = inputsJson;
      }
    } catch {
      localStorage.removeItem("inputs");
    }

    getFontsData().then((font) => {
      if (uiRef.current) {
        ui.current = new (mode === "form" ? Form : Viewer)({
          domContainer: uiRef.current,
          template,
          inputs,
          options: {
            font,
            labels: { 'clear': '消去' },
            theme: {
              token: {
                colorPrimary: '#25c2a0',
              },
            },
          },
          plugins: getPlugins(),
        });
      }
    });
  };

  const onChangeMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as Mode;
    setMode(value);
    localStorage.setItem("mode", value);
    buildUi(value);
  };

  const onGetInputs = () => {
    if (ui.current) {
      const inputs = ui.current.getInputs();
      alert(JSON.stringify(inputs, null, 2));
      alert("Dumped as console.log");
      console.log(inputs);
    }
  };

  const onSetInputs = () => {
    if (ui.current) {
      const prompt = window.prompt("Enter Inputs JSONString") || "";
      try {
        const json = isJsonString(prompt) ? JSON.parse(prompt) : [{}];
        ui.current.setInputs(json);
      } catch (e) {
        alert(e);
      }
    }
  };

  const onSaveInputs = () => {
    if (ui.current) {
      const inputs = ui.current.getInputs();
      localStorage.setItem("inputs", JSON.stringify(inputs));
      alert("Saved!");
    }
  };

  const onResetInputs = () => {
    localStorage.removeItem("inputs");
    if (ui.current) {
      const template = initTemplate(templatePresets);
      ui.current.setInputs(getInputFromTemplate(template));
    }
  };

  if (uiRef != prevUiRef) {
    if (prevUiRef && ui.current) {
      ui.current.destroy();
    }
    buildUi(mode);
    setPrevUiRef(uiRef);
  }

  return (
    <div>
        <div className="flex flex-wrap gap-2 h-56 grid-cols-3 content-center">
            <div className="mt-4">
                <div className="flex items-center mb-4">
                    <input id="radio-form" onChange={onChangeMode} type="radio" value="form" name="form" checked={mode === "form"} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="radio-form" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Form</label>
                </div>
                <div className="flex items-center">
                    <input id="radio-viewer" onChange={onChangeMode} type="radio" value="viewer" name="viewer" checked={mode === "viewer"} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label htmlFor="radio-viewer" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Viewer</label>
                </div>
            </div>

        <div className="flex flex-wrap gap-4">
            <div className="mb-2 block">
                <Label htmlFor="file-upload" value="Load Template" />
            </div>
            <div className="relative w-full">
                <FileInput id="file-upload" accept="application/json" onChange={(e) => handleLoadTemplate(e, ui.current)} />
            </div>
        </div>

        <div className="flex flex-wrap gap-4">
            <div className="mb-2 block">
                <Label value="Actions" />
            </div>
            <div className="inline-flex rounded-md shadow-sm relative w-full h-10" role="group">
                <button disabled onClick={onGetInputs} type="button" className="cursor-not-allowed p-0 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                    <span className="flex items-stretch transition-all duration-200 rounded-md px-4 py-2 text-sm rounded-r-none">
                        <FaArrowRightToBracket className="mr-3 h-4 w-4" /> 
                        Get Inputs
                    </span>
                </button>
                <button disabled onClick={onSetInputs} type="button" className="cursor-not-allowed p-0 text-sm font-medium text-gray-900 bg-white border-t border-b border-r border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                    <span className="flex items-stretch transition-all duration-200 rounded-md px-4 py-2 text-sm rounded-r-none">
                        <FaArrowRightFromBracket className="mr-3 h-4 w-4" /> 
                        Set Inputs
                    </span>
                </button>
                <button disabled onClick={onSaveInputs} type="button" className="cursor-not-allowed p-0 text-sm font-medium text-gray-900 bg-white border-t border-b border-r border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                    <span className="flex items-stretch transition-all duration-200 rounded-md px-4 py-2 text-sm rounded-r-none">
                        <CiSaveDown2 className="mr-3 h-4 w-4" /> 
                        Save Inputs
                    </span>
                </button>
                <button disabled onClick={onResetInputs} type="button" className="cursor-not-allowed p-0 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                    <span className="flex items-stretch transition-all duration-200 rounded-md px-4 py-2 text-sm rounded-r-none">
                        <GrPowerReset className="mr-3 h-4 w-4" /> 
                        Reset Inputs
                    </span>
                </button>
                <button onClick={() => generatePDF(ui.current)} type="button" className="p-0 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                    <span className="flex items-stretch transition-all duration-200 rounded-md px-4 py-2 text-sm rounded-r-none">
                        <IoDownloadOutline className="mr-3 h-4 w-4" /> 
                        Generate PDF
                    </span>
                </button>
            </div>
        </div>
      </div>
      <div ref={uiRef} style={{ width: '100%', height: `calc(100vh - ${headerHeight}px)` }} />
    </div>
  );
}

export default FormComponent;
