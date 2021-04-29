import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateBolsas1615421280477 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "bolsas",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "financiamento",
                        type: "varchar"
                    },
                    {
                        name: "tipo_bolsa",
                        type: "varchar"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
