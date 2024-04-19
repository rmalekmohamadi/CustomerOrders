'use server';

import { API_BASE_URL } from "@/app/appconfig";
import PDFTemplateModel from "../types/pdftemplatemodel";

export async function getDefaultPDFTemplateApi() {
    return await fetch(API_BASE_URL + '/pdftemplates/getdefault', { cache: 'no-store' }).then(async res => await res.json())
}

export async function getAllTemplatesApi() {
    return await fetch(API_BASE_URL + '/pdftemplates/filter?&page=1&perpage=100', { cache: 'no-store' }).then(async res => await res.json())
}

export async function savePDFTemplateApi(arg: PDFTemplateModel) {
    return fetch(API_BASE_URL + '/pdftemplates/save/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
      body: JSON.stringify(arg)
    }).then(res => res.json())
  }