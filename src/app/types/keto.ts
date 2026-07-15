export interface Keto {
    id: number;
    title: string;
    calories: number;
    fat: number;
    protein: number;
    netCarbs: number
    image?: string;
    ketoImage?: File;
}