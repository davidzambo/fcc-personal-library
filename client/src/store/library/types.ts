export interface IBook {
    _id: string;
    title: string;
    comments?: object[];
    commentcount?: number;
}

export interface ILibraryState {
    books: IBook[];
    bookToShow: IBook|undefined;
    hasError: boolean;
    errorMessage?: string|undefined;
    isDescriptionModalOpen: boolean;
    isBookDetailModalOpen: boolean;
}
