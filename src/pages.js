// this file is responsable for have the functions of routes
const dataBase = require('./dataBase/db');
const saveOrphanage = require('./dataBase/saveOrphanage');

module.exports = {

    index: function(req, res) {
        return res.render('index')
    },

    async orphanage(req, res) {

        const id = req.query.id

        try {
            const db = await dataBase;
            const results = await db.all(`SELECT * FROM orphanages WHERE id = "${id}"`)
            const orphanage = results[0]

            if (orphanage.open_on_weekends === "0") {
                orphanage.open_on_weekends = false;
            } else {
                orphanage.open_on_weekends = true;
            }

            orphanage.images = orphanage.images.split(",")
            orphanage.firstImage = orphanage.images[0]
            return res.render('orphanage', { orphanage })

        } catch (error) {
            console.log(error)
            return res.send('data base error')
        }
    },

    async orphanages(req, res) {
        try {
            const db = await dataBase;
            const orphanages = await db.all("SELECT * FROM orphanages");
            return res.render('orphanages', { orphanages })
        } catch (error) {
            console.log(error)
            return res.send('data base error')
        }

    },

    createOrphanages(req, res) {
        return res.render('create-orphanage')

    },

    async saveOrphanage(req, res) {
        const fields = req.body

        //validar se todos os campos estão preenchidos

        if (Object.values(fields).includes('')) {
            return res.send('Todos os campos devem ser preenchidos')
        }

        try {
            // save a orphanage

            const db = await dataBase;

            await saveOrphanage(db, {
                lat: fields.lat,
                lng: fields.lng,
                name: fields.name,
                about: fields.about,
                whatsapp: fields.whatsapp,
                images: fields.images,
                instructions: fields.instructions,
                opening_hours: fields.opening_hours,
                open_on_weekends: fields.open_on_weekends,
            })

            //redirect
            return res.redirect('/orphanages')

        } catch (error) {
            console.log(error)
            return res.send('data base error')
        }


    }

}