import { buildSearchParams } from "../utils/api-util";

const YOUTUBE_API_KEY = 'AIzaSyA-viF-duAFfibtpE-hoQeKZtdJ0wyH5aQ';
const baseUrl = `https://www.googleapis.com/youtube/v3`;

export const getSearch = async (q: string = '') => {
    const params = buildSearchParams({
        key: YOUTUBE_API_KEY,
        type: 'video',
        part: 'snippet',
        maxResults: '25',
        q
    });

    const url = `${baseUrl}/search?${params}`;
    const response = await fetch(url);
    return await response.json();

};


const buildPart = (include: string[]) => {
    return include.join(',');

};
const buildIds = (ids: string[]) => {
    return ids?.join(',') ?? '';
};

export const getVideosByIds = async (ids: any = ['']) => {
    const include = ['snippet', 'contentDetails', 'statistics'];

    const params = buildSearchParams({
        key: YOUTUBE_API_KEY,
        part: buildPart(include),
        maxResults: '25',
        id: buildIds(ids),
    });

    const url = `${baseUrl}/videos?${params}`;
    const response = await fetch(url,);
    return await response.json();


};

