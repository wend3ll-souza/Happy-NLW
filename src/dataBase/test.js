const dataBase = require('./db');
const saveOrphanage = require('./saveOrphanage');

dataBase.then(async db => {
    // insert data into the table
    await saveOrphanage(db, {
        lat: "-22.9193016",
        lng: "-47.5595007",
        name: "Lar dos meninos",
        about: "Presta assistência a crianças de 06 a 15 anos que se encontram em situação de risco e/ou vulnerabilidade social.",
        whatsapp: "12907867433",
        images: [
            "https://images.unsplash.com/photo-1595009552535-be753447727e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9",

            "https://images.unsplash.com/photo-1576883600124-64c5aa68b4bc?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjF9"
        ].toString(),
        instructions: "Venha caso se sentir a vontade e traga muito amor e paciência para dar",

        opening_hours: "Horário de visitas Das 8h às 18h",

        open_on_weekends: "0"

    })

    // query data into the table 

    const selectedOrphanages = await db.all("SELECT * FROM orphanages");
    console.log(selectedOrphanages)

    //consult only one orphanage, for ID

    const orphanage = await db.all('SELECT * FROM orphanages WHERE id = "3"')
    console.log(orphanage)

    // delete data of table 

    //await db.run("DELETE FROM orphanages WHERE id = '4'")
})