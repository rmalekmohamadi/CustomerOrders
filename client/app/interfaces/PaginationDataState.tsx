import { useSearchParams } from 'next/navigation';

export interface IPaginationDataState {
    search: string;
    page: number;
    perpage: number;
    totalpage: number;

    setSearch: (search: string) => void;
    setPage: (page: number) => void;
    setPerpage: (perpage: number) => void;
    toArray: () => Record<string, string>;
}

export class PaginationDataState {// implements IPaginationDataState {
    constructor() {
        this.search = "";
        this.page = 1;
        this.perpage = 2;
        this.totalitems = 0;
        this.totalpage = 0;
    }

    search: string;
    page: number;
    perpage: number;
    totalitems: number;
    totalpage: number;

    setSearch(search: string) {
        this.search = search;
    }

    setPage(page: number) {
        this.page = page;
    }

    setPerpage(perpage: number) {
        this.perpage = perpage;
    }

    settotalitems(totalitems: number) {
        this.totalitems = totalitems;
    }

    toArray() {
        return { "search": this.search, "page": this.page.toString(), "perpage": this.perpage.toString() };
    }

    operattotalpage()
    {
        const totalPage = Math.trunc(this.totalitems / this.perpage);
        this.totalpage = this.totalitems % this.perpage == 0 ? totalPage: totalPage + 1;
    }

    // getFromUrl() {
    //     const searchParams = useSearchParams();
    
    //     const pageFromUrl = parseInt(searchParams.get('page') ?? "1"); // default value is "1"
    //     const perpageFromUrl = parseInt(searchParams.get('perpage') ?? "10"); // default value is "10"
    
    //     this.setSearch(searchParams.get('s') ?? "");
    
    //     if (!isNaN(pageFromUrl)) {
    //         this.setPage(pageFromUrl);
    //     }
    
    //     if (!isNaN(perpageFromUrl)) {
    //         this.setPerpage(perpageFromUrl);
    //     }
    // }
}