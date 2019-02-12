export interface IBook {
    _id: string;
    title: string;
    comments?: object[];
    commentcount?: number;
}

export interface ILibraryState {
    books: IBook[];
    bookToShow?: IBook;
    hasError: boolean;
    errorMessage?: string;
    isDescriptionModalOpen: boolean;
    isBookDetailModalOpen: boolean;
    isAjaxRun: boolean;
}
