import { getSearch, getVideosByIds } from "../api/youtube";

const findVideos = async ({ query, order }: { query: string, order: string; }) => {


    const searchResults = await getSearch(query, order);
    if (searchResults?.error) {
        throw new Error(searchResults.error.message);
    }
    const ids = searchResults.items?.map((x: any) => x.id.videoId) ?? '';
    return await getVideosByIds(ids);

};


export { findVideos };