import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity({ name: "tests" })
export class Test {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number

  @Column()
  title: string

  @Column({ nullable: true })
  description: string

  @Column()
  @CreateDateColumn()
  created_at: Date

  @Column()
  @UpdateDateColumn()
  updated_at: Date
}
