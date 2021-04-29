import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateContatos1615330828424 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "contatos",
                columns: [
                    {
                        name: "id",
                        type: "uuid"
                    },
                    {
                        name: "telefone",
                        type: "varchar",                      
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isNullable: true
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("contatos");
    }

}
