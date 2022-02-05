import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateEventos1615335673700 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "eventos",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "titulo",
                        type: "varchar"
                    },
                    {
                        name: "descricao",
                        type: "varchar"
                    },
                    {
                        name: "tipo",
                        type: "varchar"
                    },
                    {
                        name: "id_organizador",
                        type: "uuid"
                    },
                    {
                        name: "id_periodo_duracao",
                        type: "uuid"
                    },
                    {
                        name: "id_parceria",
                        type: "uuid",
                        isNullable: true
                    },
                    {
                        name: "id_endereco",
                        type: "uuid",
                        isNullable: true
                    },
                    
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "status",
                        type: "varchar"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("eventos")
    }

}
