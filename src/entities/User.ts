// entities/User.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Role } from '../types/role.types'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ unique: true })
  username!: string

  @Column()
  password!: string

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role!: Role

  @CreateDateColumn()
  createdAt!: Date
}
