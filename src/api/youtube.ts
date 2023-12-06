import config from '../config';
import { buildSearchParams } from '../utils/api-util';
const baseUrl = `https://www.googleapis.com/youtube/v3`;

export const getSearch = async (q: string = '', { order, pageToken }: { order: string, pageToken?: string; }) => {
    const params = buildSearchParams({
        key: config.youTubeApiKey,
        type: 'video',
        part: 'snippet',
        maxResults: '25',
        ...(order && { order }),
        ...(pageToken && { pageToken }),
        q,
    });

    const response = await fetch(`${baseUrl}/search?${params}`);
    return await response.json();
};

const buildPart = (include: string[]) => {
    return include.join(',');
};
const buildIds = (ids: string[]) => {
    return ids?.join(',') ?? '';
};

export const getVideosByIds = async (ids: any = [''], pageToken: any) => {
    const include = ['snippet', 'contentDetails', 'statistics'];
    ;
    const params = buildSearchParams({
        key: config.youTubeApiKey,
        part: buildPart(include),
        maxResults: '25',
        id: buildIds(ids),
    });

    const response = await fetch(`${baseUrl}/videos?${params}`);
    const data = await response.json();
    return { ...data, ...pageToken };
};
