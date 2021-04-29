import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePeriodoDuracao1615334828620 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "periodo_duracao",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "data_inicio",
                        type: "varchar"
                    },
                    {
                        name: "hora_inicio",
                        type: "varchar"
                    },
                    {
                        name: "data_fim",
                        type: "varchar"
                    },
                    {
                        name: "hora_fim",
                        type: "varchar"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("periodo_duracao");
    }

}
