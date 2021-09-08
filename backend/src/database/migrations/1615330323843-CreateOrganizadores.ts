import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateOrganizadores1615330323843 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "organizadores",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "id_contato",
                        type: "uuid",
                    },
                    {
                        name: "nome",
                        type: "varchar"
                    },
                    {
                        name: "sobrenome",
                        type: "varchar"
                    },
                    {
                        name: "cpf",
                        type: "varchar"
                    },
                    {
                        name: "campus_instituicao",
                        type: "varchar"
                    },
                    {
                        name: "titulacao",
                        type: "varchar",
                    },
                    {
                        name: "cargo",
                        type: "varchar"
                    },
                    {
                        name: "password",
                        type: "varchar"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("organizadores");
    }

}
