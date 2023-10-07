import { randomUUID } from "node:crypto"
import { sql } from './db.js'

export class DatabasePostgres {


    /////////////Lista os videos/////////////////
    async list(search) {
        let videos

        if(search) {
            videos = await sql`select * from videos where title ilike ${'%' + search + '%'}`
        }else{
            videos = await sql`select * from videos`
        }

        return videos
    }

 /////////////Cria os videos/////////////////
    async create(video) {
        const videosId = randomUUID()
        const {title, description, duration} = video

        await sql`insert into videos (id, title, description, duration) VALUES (${videosId}, ${title}, ${description}, ${duration})`
    }

 /////////////Altera os videos/////////////////
    async update(id, video) {
        const {title, description, duration} = video

        await sql`update videos set title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`
    }

 /////////////Deleta os videos/////////////////
    async delete(id) {
        await sql`delete from videos where id = ${id}`
    }
}