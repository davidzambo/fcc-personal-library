import { ILibraryState } from "@/store/library/types";

export interface IRootState {
    version: string;
    library?: ILibraryState;
}


