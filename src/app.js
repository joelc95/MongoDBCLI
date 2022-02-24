const yargs = require('yargs');
const { client, connection } = require('./db/connection');
const Movie = require('./utils/index');

const app = async (yargsObj) => {
    const collection = await connection();
    try {
        const movie = new Movie(yargsObj.title, yargsObj.actor, yargsObj.director);
        const query = { title: yargsObj.title, actor: yargsObj.actor, director: yargsObj.director}
        if (yargsObj.add) {
            // Take movie info, add to mongodb database, console log success message
            if (yargsObj.title === undefined) {
                console.log('HINT: The \'--add\' command requires a \'--title\' field');
                throw new Error('Improper usage of the \'--add\' command.')
            }
            
            console.log(await movie.add(collection, query));
        } else if (yargsObj.list) {
            // List all movies in database
            console.log(await movie.list(collection, query));
        } else if (yargsObj.get) {
            // Get specific movie(s)
            
            console.log( await movie.get(collection, query));
        } else if (yargsObj.remove) {
            
            console.log( await movie.remove(collection, query));
        } else if (yargsObj.edit) {
            console.log (await movie.edit(collection,query))
        }
        await client.close();
    } catch (error) {
        console.log(error)
        await client.close()
    }
}

app(yargs.argv);