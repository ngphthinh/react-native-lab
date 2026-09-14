export const api = {
    POSTS: "https://jsonplaceholder.typicode.com/todos",
    USER: (id: string) => `https://jsonplaceholder.typicode.com/users/${id}`,
    PRODUCTS: (keyword: string, limit: number) => `https://dummyjson.com/products/search?q=${keyword}&limit=${limit}`,
    USERS: "https://example-data.com/api/v1/users",
}


interface HasName {
    title: string;
}



export const filterByName = <T extends HasName>(items: T[], keyword: string): T[] => {
    return items.filter(item => item.title.includes(keyword));
}

export interface ApiResponse<T>{
    data: T[];
    total: number;
    page: number;
}