import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";


@Entity('products')
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'varchar', array: true, nullable: true })
    images: Array<string>;

    @Column()
    price:number;

    @Column()
    selling_price: number;

    @Column({ unique: true })
    sku: string;

    @Column()
    category: string;

    @Column()
    barcode: string;




}
