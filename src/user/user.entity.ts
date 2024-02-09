import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterRemove, AfterUpdate } from "typeorm";
import { Exclude } from "class-transformer";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;

    @Column()
    // @Exclude()
    password:string;

    @AfterInsert()
    logInsert(){
        console.log("User has been inserted with id", this.id);
    }

    @AfterRemove()
    logDelete(){
        console.log("User with id", this.id,"has been deleted");
    }

    @AfterUpdate()
    logUpdate(){
        console.log("User has been Updated with id", this.id);
    }
}