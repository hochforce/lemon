import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateRecursos1615334025813 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "recursos",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "id_bolsa",
                        type: "uuid",
                        isNullable: true
                    },
                    {
                        name: "materiais",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "recursos_humanos",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "instalacoes",
                        type: "varchar",
                        isNullable: true
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("recursos");
    }

}
