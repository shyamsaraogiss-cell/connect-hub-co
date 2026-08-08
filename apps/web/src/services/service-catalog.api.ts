import { api } from "@/lib/api";import { CatalogPage,CatalogService,CatalogServiceInput,CategoryInput,ServiceCategory } from "@/types/service-catalog";
function params(values:Record<string,string|number|boolean|undefined>){const query=new URLSearchParams();for(const [key,value] of Object.entries(values))if(value!==undefined&&value!=="")query.set(key,String(value));return query.toString();}
export const getPublicCategories=()=>api<ServiceCategory[]>("/public/service-categories");
export const getPublicServices=(query:Record<string,string|number|boolean|undefined>={})=>api<CatalogPage>(`/public/services?${params(query)}`);
export const getPublicService=(slug:string)=>api<CatalogService>(`/public/services/${slug}`);
export const getAdminCategories=()=>api<ServiceCategory[]>("/service-categories");
export const createCategory=(input:CategoryInput)=>api<ServiceCategory>("/service-categories",{method:"POST",body:JSON.stringify(input)});
export const updateCategory=(id:string,input:Partial<CategoryInput>)=>api<ServiceCategory>(`/service-categories/${id}`,{method:"PATCH",body:JSON.stringify(input)});
export const deleteCategory=(id:string)=>api<{deleted:boolean}>(`/service-categories/${id}`,{method:"DELETE"});
export const getAdminServices=(query:Record<string,string|number|boolean|undefined>={})=>api<CatalogPage>(`/services?${params(query)}`);
export const createCatalogService=(input:CatalogServiceInput)=>api<CatalogService>("/services",{method:"POST",body:JSON.stringify(input)});
export const updateCatalogService=(id:string,input:Partial<CatalogServiceInput>)=>api<CatalogService>(`/services/${id}`,{method:"PATCH",body:JSON.stringify(input)});
export const deleteCatalogService=(id:string)=>api<{deleted:boolean}>(`/services/${id}`,{method:"DELETE"});
