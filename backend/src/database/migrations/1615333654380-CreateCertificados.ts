import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCertificado1615333654380 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "certificados",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "id_participante",
                        type: "uuid"
                    },
                    {
                        name: "id_evento",
                        type: "uuid"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("certificados");
    }

}
