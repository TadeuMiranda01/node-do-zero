import { randomUUID } from "node:crypto"

export class DatabaseMemory {
    #videos = new Map()

    /////////////Lista os videos/////////////////
    list(search) {
        return Array.from(this.#videos.entries())
        .map((videoArray)=>{
            const id = videoArray[0]
            const data = videoArray[1]

            return {
                id,
                ...data,
            }
        })
        .filter(video => {
            if(search) {
                return video.title.includes(search)
            }

            return true
        })
    }

 /////////////Cria os videos/////////////////
    create(videos) {
        const videoId = randomUUID()

        this.#videos.set(videoId, videos)
    }

 /////////////Altera os videos/////////////////
    update(id, videos) {
        this.#videos.set(id, videos)
    }

 /////////////Deleta os videos/////////////////
    delete(id) {
        this.#videos.delete(id)
    }
}