import { fastify } from "fastify";
// import { DatabaseMemory } from "./database-memory.js";
import { DatabasePostgres } from "./database-postgres.js";

const server = fastify()

// const database = new DatabaseMemory()

const database = new DatabasePostgres()

/////Posta os Videos/////////////
server.post('/videos', async (request, reply) =>{
    const {title, description, duration} = request.body

    await database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send()
})

/////Pega lista ou Search dos Videos/////////////
server.get('/videos', async (request) =>{
    const search = request.query.search      

    const videos = await database.list(search)

    return videos
})

/////Altera o video pelo id/////////////
server.put('/videos/:id', async (request, reply) =>{
    const videoId = request.params.id
    const {title, description, duration} = request.body

    const video = await database.update(videoId,{
        title,
        description,
        duration
    })

    return reply.status(204).send()
})

/////Deleta o video pelo id/////////////
server.delete('/videos/:id', async (request,reply) =>{
    const videoId = request.params.id

    await database.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    port: process.env.PORT ?? 3333,
});