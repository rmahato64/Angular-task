import {
    BatchSize,
    BatchQuantity,
    Product,
    ProductBatchSize,
    Order,
} from './types';
import { getSortedOrderWithBatchSize } from "./utility";

describe('getSortedOrderWithBatchSize function test', () => {
    const products: Product[] = [
        { code: 'P1', name: 'Milk', price: 1.99 },
        { code: 'P2', name: 'Sour Milk', price: 2.05 },
        { code: 'P3', name: 'Cream', price: 3.59 },
        { code: 'P4', name: 'Yoghurt', price: 4.99 },
        { code: 'P5', name: 'Buttermilk', price: 3.1 },
    ];

    const batchSizes: BatchSize[] = [
        { code: 'BS1', size: 20 },
        { code: 'BS2', size: 30 },
        { code: 'BS3', size: 40 },
        { code: 'BS4', size: 50 },
        { code: 'BS5', size: 100 },
        { code: 'BS6', size: 20 },
        { code: 'BS7', size: 50 },
    ];

    const productBatchSizes: ProductBatchSize[] = [
        { productCode: 'P1', batchSizeCode: 'BS6' },
        { productCode: 'P2', batchSizeCode: 'BS1' },
        { productCode: 'P2', batchSizeCode: 'BS2' },
        { productCode: 'P2', batchSizeCode: 'BS3' },
        { productCode: 'P3', batchSizeCode: 'BS4' },
        { productCode: 'P3', batchSizeCode: 'BS5' },
        { productCode: 'P5', batchSizeCode: 'BS7' },
    ];

    const batchQuantities: BatchQuantity[] = [
        { productCode: 'P1', quantity: 20 },
        { productCode: 'P2', quantity: 500 },
        { productCode: 'P3', quantity: 40 },
        { productCode: 'P4', quantity: 234 },
    ];

    it('get orders with max batch size', () => {
        const result = getSortedOrderWithBatchSize(
            products,
            batchSizes,
            productBatchSizes,
            batchQuantities,
            true
        );
        const expected: Order[] = [
            {
                productCode: 'P1',
                productName: 'Milk',
                batchSizeCode: 'BS6',
                batchSize: 20,
                batchQuantity: 20,
                price: 1.99,
            },
            {
                productCode: 'P2',
                productName: 'Sour Milk',
                batchSizeCode: 'BS3',
                batchSize: 40,
                batchQuantity: 500,
                price: 2.05,
            },
            {
                productCode: 'P3',
                productName: 'Cream',
                batchSizeCode: 'BS5',
                batchSize: 100,
                batchQuantity: 40,
                price: 3.59,
            },
            {
                productCode: 'P4',
                productName: 'Yoghurt',
                batchSizeCode: 'BS_GENERATED_P4',
                batchSize: 1,
                batchQuantity: 234,
                price: 4.99,
            },
            {
                productCode: 'P5',
                productName: 'Buttermilk',
                batchSizeCode: 'BS7',
                batchSize: 50,
                batchQuantity: 1,
                price: 3.1,
            },
        ];
        expect(expected).toEqual(result);
    });

    it('get orders with min batch size', () => {
        const result = getSortedOrderWithBatchSize(
            products,
            batchSizes,
            productBatchSizes,
            batchQuantities,
            false
        );

        const expected: Order[] = [
            {
                productCode: 'P1',
                productName: 'Milk',
                batchSizeCode: 'BS6',
                batchSize: 20,
                batchQuantity: 20,
                price: 1.99,
            },
            {
                productCode: 'P2',
                productName: 'Sour Milk',
                batchSizeCode: 'BS1',
                batchSize: 20,
                batchQuantity: 500,
                price: 2.05,
            },
            {
                productCode: 'P3',
                productName: 'Cream',
                batchSizeCode: 'BS4',
                batchSize: 50,
                batchQuantity: 40,
                price: 3.59,
            },
            {
                productCode: 'P4',
                productName: 'Yoghurt',
                batchSizeCode: 'BS_GENERATED_P4',
                batchSize: 1,
                batchQuantity: 234,
                price: 4.99,
            },
            {
                productCode: 'P5',
                productName: 'Buttermilk',
                batchSizeCode: 'BS7',
                batchSize: 50,
                batchQuantity: 1,
                price: 3.1,
            },
        ];
        expect(expected).toEqual(result);
    });
});
