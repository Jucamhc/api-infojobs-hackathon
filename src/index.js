const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const https = require('https');
const express = require('express');
const cors = require('cors');
const app = express();
const cvinfo = require('./cvInfo'); // Importa cvInfo.js sin la extensión .js

const myHeaders = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.63 Safari/537.36",
    "Authority": "www.infojobs.net",
    "Method": "GET",
    "Scheme": "https",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en,es-419;q=0.9,es-ES;q=0.8,es;q=0.7,en-US;q=0.6,es-CO;q=0.5,en-ZA;q=0.4,en-AU;q=0.3,en-CA;q=0.2,en-GB;q=0.1",
    "Cache-Control": "max-age=0"
}

const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
    agent: new https.Agent({
        minVersion: 'TLSv1.3',
        maxVersion: 'TLSv1.3'
    })
};


app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {

    res.send("<h1> API INFOJOBS </h1>" +
    "<p>" +
    "<h2>/filtradoSkill</h2>" +
    "Encontraras el array de mi hoja de vida y al final hay un clave con el nombre filtradoSkill con todos </p> <p> los skill de empleos y skill puestos en su hoja de vida se filta por medio de la funcion buscarCoincidencias</p>");

})

app.get('/filtradoSkill', (req, res) => {


    function buscarCoincidencias(cvinfo) {
        const cvSkills = [
            ...cvinfo[0].skills.entries.map((entry) => entry.skill),
            ...cvinfo[0].experiences.entries.flatMap((entry) =>
                entry.skills.map((skill) => skill)
            ),
        ];

        const uniqueSkills = cvSkills.filter((skill, index) => {
            return cvSkills.indexOf(skill) === index;
        });

        console.log(uniqueSkills);

        return uniqueSkills
    }


    const resultados = buscarCoincidencias(cvinfo);
    //console.log(resultados)

    cvinfo[0].filtradoSkill = resultados

    res.send(cvinfo);

});


app.get('/api-offers/search', async (req, res) => {

    const keyword = req.query.keyword || '';
    const normalizedJobTitleIds = req.query.normalizedJobTitleIds || '';
    const provinceIds = req.query.provinceIds || '';
    const cityIds = req.query.cityIds || '';
    const teleworkingIds = req.query.teleworkingIds || '';
    const categoryIds = req.query.categoryIds || '';
    const workdayIds = req.query.workdayIds || '';
    const educationIds = req.query.educationIds || '';
    const segmentId = req.query.segmentId || '';
    const contractTypeIds = req.query.contractTypeIds || '';
    const page = req.query.page || '1'; // Valor predeterminado de la página: 1
    const sortBy = req.query.sortBy || 'PUBLICATION_DATE'; // Valor predeterminado de la ordenación: PUBLICATION_DATE
    const onlyForeignCountry = req.query.onlyForeignCountry || 'false'; // Valor predeterminado: false
    const countryIds = req.query.countryIds || '';
    const sinceDate = req.query.sinceDate || 'ANY'; // Valor predeterminado: ANY
    const subcategoryIds = req.query.subcategoryIds || '';

    //console.log(keyword);


    try {

        const response = await fetch(`https://www.infojobs.net/webapp/offers/search?keyword=${keyword}&normalizedJobTitleIds=${normalizedJobTitleIds}&provinceIds=${provinceIds}&cityIds=${cityIds}&teleworkingIds=${teleworkingIds}&categoryIds=${categoryIds}&workdayIds=${workdayIds}&educationIds=${educationIds}&segmentId=${segmentId}&contractTypeIds=${contractTypeIds}&page=${page}&sortBy=${sortBy}&onlyForeignCountry=${onlyForeignCountry}&countryIds=${countryIds}&sinceDate=${sinceDate}&subcategoryIds=${subcategoryIds}`, requestOptions);

        console.log(response);
        if (!response.ok) {
            throw new Error('Error en la petición');
        }

        let data = await response.json();

        function buscarCoincidencias(cvinfo, offers) {
            const cvSkills = [
                ...cvinfo[0].skills.entries.map((entry) => entry.skill),
                ...cvinfo[0].experiences.entries.flatMap((entry) =>
                    entry.skills.map((skill) => skill)
                ),
            ];

            const uniqueSkills = cvSkills.filter((skill, index) => {
                return cvSkills.indexOf(skill) === index;
            });
            console.log(uniqueSkills);


            const updatedOffers = offers.map((offer) => {
                const description = offer.description.toLowerCase();
                let score = 0;

                uniqueSkills.forEach((skill) => {
                    if (description.includes(skill.toLowerCase())) {
                        score += 1;
                    }
                });

                return { ...offer, score };
            });

            return updatedOffers
        }


        const offers = buscarCoincidencias(cvinfo, data.offers);
        data.offers = offers;


        res.status(200).send(data);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
})


const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log(`Escuchando en el puerto ${PORT}`));

