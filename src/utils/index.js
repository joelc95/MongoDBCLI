class Movie {
    constructor(title, actor='not specified', director='not specified') {
        this.title = title;
        this.actor = [actor];
        this.director = director;
    }
    // This is the CREATE of my CRUD ops
    async add(collection, query) {
        // Add this to db
        if (!await collection.findOne({title: query.title})) {
            await collection.insertOne(this);
            return `Success! \'${query.title}\' has been added.`
        } else {
            return 'Movie already in database!'
        }
    }

    // This is the READ of my CRUD ops
    async list(collection, query) {
        // Return all db entries
        // If no extra arguments are given, list all
        if (process.argv.length == 3) {
            return await collection.find().toArray()
        } else if (query.actor) {
            // This should return all results with specified actor
            return await collection.find({actor: query.actor}).toArray();
        } else if (query.director) {
            return await collection.find({director: query.director}).toArray();
        }
    }

    async get(collection, query) {
        // Return specific entry from db
        if (query.title && await collection.findOne({title: query.title}) != null) {
            return await collection.findOne({title: query.title})
        } else {
            return 'Movie not found!'
        }
    }
    
    
    async edit(collection, query) {
        // This is an object with the $set operator as its only key...
        // ... its value will be another object that will contain all of the...
        // ... updated values.
        const newValues = { $set: {} }

        // If the movie exists in the db
        if (await collection.findOne({title: query.title}) != null) {
            // If user has specified a title, update it
            if (query.title) {
                newValues.$set.title = query.title;
            }
            if (query.actor) {
                newValues.$set.actor = [query.actor];
            }
            if (query.director) {
                newValues.$set.director = query.director;
            }
            await collection.updateOne({title: query.title}, newValues);
            return `${query.title} has been updated successfully!`;
        } else {
            return 'nothing happened';
        }
        
    }

    // This is the DELETE of my CRUD ops
    async remove(collection, query) {
        // Delete this from db
        if (await collection.findOne({ title: query.title})) {
            await collection.deleteOne({ title: query.title });
            return `${query.title} has been removed!`
        } else {
            return "Movie not found in database!"
        }
    }
}

module.exports = Movie;