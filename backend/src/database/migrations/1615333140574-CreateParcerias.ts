import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateParcerias1615333140574 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "parcerias",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "parceiro",
                        type: "varchar"
                    },
                    {
                        name: "tipo_parceria",
                        type: "varchar"
                    },
                    {
                        name: "valor",
                        type: "varchar",
                        isNullable: true
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("parcerias");
    }

}
