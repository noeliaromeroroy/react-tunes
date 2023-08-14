import { IEpisode } from "./iepisode.types";

export interface IPodcast {
    id: string;
    title: string;
    description: string;
    author: string;
    episodes: IEpisode[];
    coverImageUrl: string;
}