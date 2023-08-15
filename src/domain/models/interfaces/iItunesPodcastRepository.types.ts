import { IPodcast } from "./iPodcast.types";

export interface ITunesPodcastRepository {
    searchPodcasts(query: string): Promise<IPodcast[]>;
}