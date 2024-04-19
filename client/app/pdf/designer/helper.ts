import { Template, Font, checkTemplate, getInputFromTemplate } from '@pdfme/common';
import { Form, Viewer, Designer } from '@pdfme/ui';
import { generate } from '@pdfme/generator';
import useSWR from 'swr'
import {
  text,
  readOnlyText,
  barcodes,
  image,
  readOnlyImage,
  svg,
  readOnlySvg,
  line,
  tableBeta,
  rectangle,
  ellipse,
} from '@pdfme/schemas';
import plugins from './plugins';
import { getAllTemplatesApi } from '@/app/api/pdftemplateapi';
import PDFTemplateModel from '@/app/types/pdftemplatemodel';
import TemplatePreset from '@/app/types/TemplatePreset';

const fontObjList = [
  {
    fallback: true,
    label: 'Roboto-Black',
    url: '/fonts/Roboto-Black.ttf',
  },
  {
    fallback: false,
    label: 'Roboto-Light',
    url: '/fonts/Roboto-Light.ttf',
  },
];

export const getFontsData = async () => {
  const fontDataList = await Promise.all(
    fontObjList.map(async (font) => ({
      ...font,
      data: await fetch(font.url).then((res) => res.arrayBuffer()),
    }))
  );

  return fontDataList.reduce((acc, font) => ({ ...acc, [font.label]: font }), {} as Font);
};

export const readFile = (file: File | null, type: 'text' | 'dataURL' | 'arrayBuffer') => {
  return new Promise<string | ArrayBuffer>((r) => {
    const fileReader = new FileReader();
    fileReader.addEventListener('load', (e) => {
      if (e && e.target && e.target.result && file !== null) {
        r(e.target.result);
      }
    });
    if (file !== null) {
      if (type === 'text') {
        fileReader.readAsText(file);
      } else if (type === 'dataURL') {
        fileReader.readAsDataURL(file);
      } else if (type === 'arrayBuffer') {
        fileReader.readAsArrayBuffer(file);
      }
    }
  });
};

export const cloneDeep = (obj: unknown) => JSON.parse(JSON.stringify(obj));

const getTemplateFromJsonFile = (file: File) => {
  return readFile(file, 'text').then((jsonStr) => {
    const template: Template = JSON.parse(jsonStr as string);
    checkTemplate(template);
    return template;
  });
};

export const downloadJsonFile = (json: unknown, title: string) => {
  if (typeof window !== 'undefined') {
    const blob = new Blob([JSON.stringify(json)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }
};

export const handleLoadTemplate = (
  e: React.ChangeEvent<HTMLInputElement>,
  currentRef: Designer | Form | Viewer | null
) => {
  if (e.target && e.target.files) {
    getTemplateFromJsonFile(e.target.files[0])
      .then((t) => {
        if (!currentRef) return;
        currentRef.updateTemplate(t);
      })
      .catch((e) => {
        alert(`Invalid template file.
--------------------------
${e}`);
      });
  }
};

export const getPlugins = () => {
  return {
    Text: text,
    ReadOnlyText: readOnlyText,
    Table: tableBeta,
    Line: line,
    Rectangle: rectangle,
    Ellipse: ellipse,
    Image: image,
    ReadOnlyImage: readOnlyImage,
    SVG: svg,
    ReadOnlySvg: readOnlySvg,
    QR: barcodes.qrcode,
    Code128: barcodes.code128,
    Signature: plugins.signature,
  };
};

export const generatePDF = async (currentRef: Designer | Form | Viewer | null) => {
  if (!currentRef) return;
  const template = currentRef.getTemplate();
  const inputs =
    typeof (currentRef as Viewer | Form).getInputs === 'function'
      ? (currentRef as Viewer | Form).getInputs()
      : getInputFromTemplate(template);
  const font = await getFontsData();

  const pdf = await generate({
    template,
    inputs,
    options: { font, title: 'pdfme' },
    plugins: getPlugins(),
  });

  const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
  window.open(URL.createObjectURL(blob));
};

export const isJsonString = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const getBlankTemplate = () =>
  ({ schemas: [{}], basePdf: { width: 210, height: 297, padding: [0, 0, 0, 0] } } as Template);

// export async function getTemplatePresets() {
//   let allTemplates : TemplatePreset[] = [];
//   const templates = await getAllTemplatesApi();
//   if(templates != null && templates.succeed)
//   {
//     for(let i = 0; i < templates.value.length; i++)
//       {
//         //allTemplates.push({key: templates.value[i].id.toString(), label: 'Template No ' + templates.value[i].id.toString() + (templates.value[i].isdefault ? "(default order template)" : ""), template: templates.value[i].schema})
//       }
//   }

//   allTemplates.push({ key: 'blank', label: 'Blank', template: getBlankTemplate() });
//   return allTemplates;
// }
export const getTemplatePresets1 = (): {
  key: string;
  label: string;
  template: () => Template;
}[] => [
  { key: 'blank', label: 'Blank', template: getBlankTemplate },
  { key: 'custom', label: 'Custom', template: getBlankTemplate },
];

export async function getTemplateByPreset(templatePresets: TemplatePreset[], templatePreset: string) {
  const preset = templatePresets.find((preset) => preset.key === templatePreset);
  return preset ? preset.template : templatePresets[0].template;
};
