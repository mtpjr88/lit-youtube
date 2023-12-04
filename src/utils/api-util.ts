export const buildSearchParams = (data: Record<string, any>) => {
    const searchParams = new URLSearchParams(data).toString();
    return searchParams;
};