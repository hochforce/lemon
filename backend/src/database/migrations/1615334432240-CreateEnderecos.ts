import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateEnderecos1615334432240 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "enderecos",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "logradouro",
                        type: "varchar"
                    },
                    {
                        name: "numero",
                        type: "number"
                    },
                    {
                        name: "complemento",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "bairro",
                        type: "varchar"
                    },
                    {
                        name: "cidade",
                        type: "varchar"
                    },
                    {
                        name: "estado",
                        type: "varchar"
                    },
                    {
                        name: "cep",
                        type: "varchar"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("enderecos");
    }

}
