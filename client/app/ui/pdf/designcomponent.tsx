'use client'
import { useRef, useState } from "react";
import { Template, Lang } from "@pdfme/common";
import { Designer } from "@pdfme/ui";
import {
  getFontsData,
  getBlankTemplate,
  getTemplateByPreset,
  readFile,
  cloneDeep,
  getPlugins,
  handleLoadTemplate,
  generatePDF,
  downloadJsonFile,
} from "@/app/pdf/designer/helper";
import { FileInput, Label } from "flowbite-react";
import { IoDownloadOutline } from "react-icons/io5";
import PDFTemplateModel from "@/app/types/pdftemplatemodel";
import { savePDFTemplateApi } from "@/app/api/pdftemplateapi";
import { Spinner } from "@/app/ui/spinner";
import TemplatePreset from "@/app/types/TemplatePreset";
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation'

const headerHeight = 65;

const initialTemplatePresetKey = "blank"

// const templatePresets = getTemplatePresets();



function DesignerComponent({
    templatePresets
  }: {
    templatePresets: TemplatePreset[];
  }) {

    const designerRef = useRef<HTMLDivElement | null>(null);
  const designer = useRef<Designer | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lang, setLang] = useState<Lang>('en');
  const [templatePreset, setTemplatePreset] = useState<string>(initialTemplatePresetKey);
  const [prevDesignerRef, setPrevDesignerRef] = useState<Designer | null>(null);
  const router = useRouter()

  const buildDesigner = (presetKey?:string) => {
    // let template: Template = getTemplateByPreset(templatePresets, localStorage.getItem('templatePreset') || "");
    // try {
    //   const templateString = localStorage.getItem("template");
    //   if (templateString) {
    //     setTemplatePreset(customTemplatePresetKey);
    //   }

    //   const templateJson = templateString
    //     ? JSON.parse(templateString)
    //     : getTemplateByPreset(templatePresets, localStorage.getItem('templatePreset') || "");
    //   checkTemplate(templateJson);
    //   template = templateJson as Template;
    // } catch {
    //   localStorage.removeItem("template");
    // }
    const preset = templatePreset == null && presetKey == null ? templatePresets[0] : templatePresets.find(e => e.key == (presetKey ?? templatePreset));
    // setTemplatePreset(preset?.key ?? "blank")
    let template: Template = preset?.template as Template;
    getFontsData().then((font) => {
      if (designerRef.current) {
        designer.current = new Designer({
          domContainer: designerRef.current,
          template,
          options: {
            font,
            lang,
            labels: {
              'clear': '🗑️', // Add custom labels to consume them in your own plugins
            },
            theme: {
              token: {
                colorPrimary: '#25c2a0',
              },
            },
          },
          plugins: getPlugins(),
        });
        designer.current.onSaveTemplate(onSaveTemplate);
        designer.current.onChangeTemplate(() => {
          setTemplatePreset(preset?.key ?? initialTemplatePresetKey);
        })
      }
    });
  }

  const onChangeBasePDF = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      readFile(e.target.files[0], "dataURL").then(async (basePdf) => {
        if (designer.current) {
          designer.current.updateTemplate(
            Object.assign(cloneDeep(designer.current.getTemplate()), {
              basePdf,
            })
          );
        }
      });
    }
  };

  const onDownloadTemplate = () => {
    if (designer.current) {
      downloadJsonFile(designer.current.getTemplate(), "template");
      console.log(designer.current.getTemplate());
    }
  };

  const onSaveTemplate = async (template?: Template) => await onSaveTemplateHandler(template, false);
  const onSaveTemplateDefault = async (template?: Template) => await onSaveTemplateHandler(template, true);
  const onSaveTemplateHandler = async (template?: Template, isdefault?:boolean) => {
    if (designer.current) {
        console.log(templatePreset)
        console.log(parseInt(templatePreset))
      const pdfTemplate: PDFTemplateModel = {id:parseInt(templatePreset), isdefault:isdefault ?? false, schema:template || designer.current.getTemplate() };
      setIsLoading(true);
      const res = await savePDFTemplateApi(pdfTemplate);
      if(res != null && res.succeed)
        {
            toast.success('Template saved successfully'); 
            router.push("/")
        }
        else{
            toast.success('Failed to save template'); 
        }
        setIsLoading(false);
    }
  };

  const onChangeTemplatePresets = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTemplatePreset(e.target.value);
    // localStorage.setItem("template", JSON.stringify(getTemplateByPreset(localStorage.getItem('templatePreset') || "")));
    // localStorage.removeItem("template");
    // localStorage.setItem("templatePreset", e.target.value);
    buildDesigner(e.target.value);
  }

  if ((designerRef as Designer) != prevDesignerRef) {
    if (prevDesignerRef && designer.current) {
      designer.current.destroy();
    }
    buildDesigner();
    setPrevDesignerRef(designerRef as Designer);
  }

  return (<Spinner isLoading={isLoading}>
      <div className="flex flex-wrap gap-2 h-56 grid-cols-3 content-center">
      <div className="flex flex-wrap gap-4">
        <div className="mb-2 block">
            <Label htmlFor="countries" value="Template Preset" />
        </div>
        <div className="relative w-full">
            <select id="countries" onChange={onChangeTemplatePresets} value={templatePreset} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {templatePresets.map((preset) => (
                <option key={preset.key}
                    value={preset.key}>
                    {preset.label}
                </option>
                ))}
            </select>
        </div>
        </div>
        {/* <span style={{ margin: "0 1rem" }}>/</span>
        <label>
          Lang:{" "}
          <select onChange={(e) => {
            setLang(e.target.value as Lang)
            if (designer.current) {
              designer.current.updateOptions({ lang: e.target.value as Lang })
            }
          }} value={lang}>
            <option value="en">English</option>
            <option value="ja">Japanese</option>
            <option value="ar">Arabic</option>
            <option value="th">Thai</option>
            <option value="pl">Polish</option>
            <option value="it">Italian</option>
            <option value="de">German</option>
            <option value="fr">French</option>
          </select>
        </label> */}

        <div className="flex flex-wrap gap-4">
            <div className="mb-2 block">
                <Label htmlFor="file-upload" value="Change BasePDF" />
            </div>
            <div className="relative w-full">
                <FileInput id="file-upload" accept="application/pdf" onChange={onChangeBasePDF} />
            </div>
        </div>
        {/* <span style={{ margin: "0 1rem" }}>/</span>
        <label style={{ width: 180 }}>
          Change BasePDF
          <input type="file" accept="application/pdf" onChange={onChangeBasePDF} />
        </label>
        <span style={{ margin: "0 1rem" }}>/</span> */}

        <div className="flex flex-wrap gap-4">
            <div className="mb-2 block">
                <Label htmlFor="file-upload" value="Load Template" />
            </div>
            <div className="relative w-full">
                <FileInput id="file-upload" accept="application/json" onChange={(e) => {
                    handleLoadTemplate(e, designer.current);
                    setTemplatePreset(initialTemplatePresetKey);
                }} />
            </div>
        </div>
        {/* <label style={{ width: 180 }}>
          Load Template
          <input type="file" accept="application/json" onChange={(e) => {
            handleLoadTemplate(e, designer.current);
            setTemplatePreset(customTemplatePresetKey);
          }} />
        </label> */}

        <div className="flex flex-wrap gap-4">
            <div className="mb-2 block">
                <Label value="Actions" />
            </div>
            <div className="inline-flex rounded-md shadow-sm relative w-full h-10" role="group">
                <button onClick={onDownloadTemplate} type="button" className="p-0 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                    <span className="flex items-stretch transition-all duration-200 rounded-md px-4 py-2 text-sm rounded-r-none">
                        <IoDownloadOutline className="mr-3 h-4 w-4" /> 
                        Download Template
                    </span>
                </button>
                <button onClick={() => onSaveTemplate()} type="button" className=" p-0 text-sm font-medium text-gray-900 bg-white border-t border-b border-r border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                    <span className="flex items-stretch transition-all duration-200 rounded-md px-4 py-2 text-sm rounded-r-none">
                        <IoDownloadOutline className="mr-3 h-4 w-4" /> 
                        Save Template
                    </span>
                </button>
                <button onClick={() => generatePDF(designer.current)} type="button" className="p-0 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white">
                    <span className="flex items-stretch transition-all duration-200 rounded-md px-4 py-2 text-sm rounded-r-none">
                        <IoDownloadOutline className="mr-3 h-4 w-4" /> 
                        Generate PDF
                    </span>
                </button>
                <button onClick={() => onSaveTemplateDefault()} type="button" className="p-0 text-sm font-medium text-white bg-blue-700 border border-gray-200 rounded-e-lg hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-60 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <span className="flex items-stretch transition-all duration-200 rounded-md px-4 py-2 text-sm rounded-r-none">
                        <IoDownloadOutline className="mr-3 h-4 w-4" /> 
                        Save As Default Invoice Template PDF
                    </span>
                </button>
            </div>
        </div>
        
      </div>
          <div ref={designerRef} style={{ width: '100%', height: `calc(100vh - ${headerHeight}px)` }} />
        </Spinner>

  );
}

export default DesignerComponent;
