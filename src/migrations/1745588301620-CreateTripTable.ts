import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTripTable1745588301620 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'trips',
        columns: [
          {
            name: 'id',
            type: 'int',
            generationStrategy: 'increment',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'start_date',
            type: 'date',
          },
          {
            name: 'end_date',
            type: 'date',
          },
          {
            name: 'destination',
            type: 'text',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'is_completed',
            type: 'boolean',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
          },
          {
            name: 'is_deleted',
            type: 'boolean',
          },
          {
            name: 'tourist_id',
            type: 'int',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'trips',
      new TableForeignKey({
        columnNames: ['tourist_id'],
        referencedTableName: 'tourists', // Make sure this matches the actual table name
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL', // Changed to SET NULL for better data integrity
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('trips');
    const foreignKey = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('tourist_id') !== -1,
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey('trips', foreignKey);
    }
    await queryRunner.dropTable('trips');
  }
}
