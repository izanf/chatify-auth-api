import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm"
import bcrypt from 'bcryptjs'

@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  name: string

  @Column()
  isActive: boolean

  @BeforeInsert()
  async hashPasswordBeforeInsert() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeUpdate()
  async hashPasswordBeforeUpdate() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}

export default User
