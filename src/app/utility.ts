import { BatchQuantity, BatchSize, Order, Product, ProductBatchSize } from "./types";

export const getMax = (array: any[]) =>
  array.reduce(
    (prev, current) => (prev?.size > current.size ? prev : current),
    null
  );

export const getMin = (array: any[]) =>
  array.reduce(
    (prev, current) => (prev?.size < current.size ? prev : current),
    null
  );


/**
 * @returns {Order[]} Returns the list of orders
 * @param {Product[]} products - Takes in list of products
 * @param {BatchSize[]} batchSizes - Takes in list of batchsize
 * @param {ProductBatchSize[]} productBatchSizes - Takes in list of productBatchSize
 * @param {BatchQuantity[]} batchQuantities - Takes in list of batchQuantity
 * @param {boolean} useMaxBatchSize - Takes in useMaxBatchSize as a boolean field
 */
export const getSortedOrderWithBatchSize = (
    products: Product[],
    batchSizes: BatchSize[],
    productBatchSizes: ProductBatchSize[],
    batchQuantities: BatchQuantity[],
    useMaxBatchSize: boolean
): Order[] => {
    return products.map((product) => {
        const batchQuantity = batchQuantities.find(
            (bq) => bq.productCode === product.code
        );

        const prodBatchSizes = productBatchSizes
            .filter((pbs) => pbs.productCode === product.code)
            .map((pbs) =>
                batchSizes.find((bs) => bs.code === pbs.batchSizeCode)
            );

        const batch = useMaxBatchSize
            ? getMax(prodBatchSizes)
            : getMin(prodBatchSizes);
        return {
            productCode: product.code,
            productName: product.name,
            batchSizeCode: batch ? batch.code : `BS_GENERATED_${product.code}`,
            batchSize: batch ? batch.size : 1,
            batchQuantity: batchQuantity ? batchQuantity.quantity : 1,
            price: product.price,
        };
    });
};
