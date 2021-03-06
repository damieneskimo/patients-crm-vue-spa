import { rest } from 'msw';
import Faker from 'faker';

const fakePatients = [];
const fakeNotes = [];
const numOfPatients = 50;
for (let index = 1; index <= numOfPatients; index++) {
    fakePatients.push({
        id: index,
        name: Faker.name.findName(),
        email: Faker.internet.email(),
        gender: Faker.random.arrayElement([
            'male', 'female', 'rather not say'
        ]),
        mobile: Faker.phone.phoneNumber('02# #### ####'),
        profile_photo: Faker.image.avatar()
    })

    fakeNotes[index] = [];
    for (let i = 1; i <= 5; i++) {
        fakeNotes[index].push({
            id: i,
            user_id: index,
            content: Faker.lorem.sentences(),
            created_at: new Date(Faker.date.past()).toDateString()
        })
    }
}

export const handlers = [
    rest.get('/sanctum/csrf-cookie', (req, res, ctx) => {
        return res(
            // Calling `ctx.cookie()` sets given cookies
            // on `document.cookie` directly.
            ctx.cookie('XSRF-TOKEN', 'abc-123'),
        )
    }),
    rest.post('/login', (req, res, ctx) => {
        return res(
            // Respond with a 204 status code
            ctx.status(204),
        )
    }),
    rest.post('/logout', (req, res, ctx) => {
        // clear the session
        sessionStorage.clear()
        document.cookie = 'XSRF-TOKEN=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';

        return res(
            // Respond with a 204 status code
            ctx.status(204),
        )
    }),
    rest.get('/api/me', (req, res, ctx) => {
        if (! document.cookie.split(';').some((item) => item.includes('XSRF-TOKEN=abc-123'))) {
            return res(
                ctx.status(401)
            )
        }
        return res(
            ctx.status(200),
            ctx.json({
                'name': 'Admin',
                'email': 'damien@gmail.com',
                'profile_photo': Faker.image.avatar()
            })
        )
    }),
    rest.get('/api/patients', (req, res, ctx) => {
        const page = req.url.searchParams.get('page')
        let start = 0 + 15 * (page - 1);
        let end = 14 + 15 * (page - 1);
        
        let data = fakePatients.slice(start, end);
        const keywords = req.url.searchParams.get('keywords');
        if (keywords !== null) {
            data = data.filter(item => {
                let nameEmail = (item.name + ' ' + item.email).toLowerCase();

                return nameEmail.includes(keywords)
            })
        }

        const gender = req.url.searchParams.get('gender');
        if (gender !== null) {
            data = data.filter(item => {
                return item.gender == gender
            })
        }

        return res(
            ctx.status(200),
            ctx.json({
                "data": data,
                "meta": {
                    current_page: page? parseInt(page) : 1,
                    last_page: Math.ceil(numOfPatients/15),
                    per_page: 15,
                    total: fakePatients.length
                }
            })
        )
    }),
    rest.post('/api/patients', (req, res, ctx) => {
        const {email, gender, mobile, name} = req.body;
        return res(
            ctx.status(201),
            ctx.json({
                id: fakePatients.length + 1,
                name,
                email,
                gender,
                mobile,
            })
        )
    }),
    rest.get('/api/patients/:id', (req, res, ctx) => {
        return res(
            ctx.json(fakePatients[req.params.id])
        )
    }),
    rest.put('/api/patients/:id', (req, res, ctx) => {
        const {email, gender, mobile, name} = req.body;
        const { id } = req.params;
        const patient = fakePatients[id];
        patient.email = email;
        patient.gender = gender;
        patient.mobile = mobile;
        patient.name = name;

        return res(
            ctx.status(200),
            ctx.json(patient)
        )
    }),
    rest.get('/api/patients/:patientId/notes', (req, res, ctx) => {
        const { patientId } = req.params
        return res(
            ctx.status(200),
            ctx.json(fakeNotes[patientId]
            )
        )
    }),
    rest.post('/api/patients/:patientId/notes', (req, res, ctx) => {
        const { content } = req.body;
        const { patientId } = req.params;

        return res(
            ctx.status(201),
            ctx.json({
                id: fakeNotes[patientId].length + 1,
                user_id: patientId,
                content,
                created_at: Date.toString()
            })
        )
    }),
]
