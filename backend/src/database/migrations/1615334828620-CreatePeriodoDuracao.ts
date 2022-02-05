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
                        name: "inicio",
                        type: "timestamp"
                    },
                    {
                        name: "fim",
                        type: "timestamp"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("periodo_duracao");
    }

}
