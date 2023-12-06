import env from '../env-config.json' assert {type: "json"};
const youTubeUrl = 'https://www.youtube.com/watch?v=';

const getConfig = () => ({
    youTubeApiKey: env.YOUTUBE_API_KEY,
    youTubeUrl
});

export default getConfig();