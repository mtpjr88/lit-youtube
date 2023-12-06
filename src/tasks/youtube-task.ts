import { getSearch, getVideosByIds } from "../api/youtube";

const findVideos = async ({ query, order, pageToken }: { query: string, order: string; pageToken?: any; }) => {
    const searchResults = await getSearch(query, { order, pageToken });
    if (searchResults?.error) {
        throw new Error(searchResults.error.message);
    }
    const ids = searchResults.items?.map((x: any) => x.id.videoId) ?? '';
    return await getVideosByIds(ids, { nextPageToken: searchResults.nextPageToken, prevPageToken: searchResults.prevPageToken });

};


export { findVideos };