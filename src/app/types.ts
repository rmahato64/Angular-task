export type Product = {
    code: string;
    name: string;
    price: number;
};

export type BatchSize = {
    code: string;
    size: number;
};

export type BatchQuantity = {
    productCode: string;
    quantity: number;
};

export type ProductBatchSize = {
    productCode: string;
    batchSizeCode: string;
};

export type Order = {
    productCode: string;
    productName: string;
    batchSizeCode: string;
    batchSize: number;
    batchQuantity: number;
    price: number;
};
