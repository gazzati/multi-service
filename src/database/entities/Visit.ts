import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity({ name: "visits" })
export class Visit {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number

  @Column()
  ip: string

  @Column()
  ua: string

  @Column({ nullable: true })
  browser: string

  @Column({ nullable: true })
  os: string

  @Column({ nullable: true })
  device: string

  @Column()
  @CreateDateColumn()
  created_at: Date

  @Column()
  @UpdateDateColumn()
  updated_at: Date
}
