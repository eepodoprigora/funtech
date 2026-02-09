import { API_URL } from "@shared/api";


export const getNftNames = async (limit = 12): Promise<string[]> => {
    const res = await fetch(`${API_URL}?per_page=${limit}&page=1`);
    if (!res.ok) throw new Error(`Failed: ${res.status}`);

    const data = (await res.json()) as unknown;
    if (!Array.isArray(data)) throw new Error("Invalid response format");

    return (data)
        .map((item) => item?.name)
        .filter((name): name is string => typeof name === "string" && name.trim().length > 0);
};
