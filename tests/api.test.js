const request = require('supertest'); 
const app = require('../app')

describe('GET /api/todoNotes', () => {
    it('GET /api/todoNotes should return an array of todo Notes', async () => {    
        const response = await request(app).get('/api/todoNotes'); 
        expect(response.status).toBe(200); 
        expect(Array.isArray(response.body)).toBe(true); 
    
    });


})


describe('POST /api/todoNote/add', () => {
    it('POST /api/todoNote/add', async () => {
        const data = {
            title: 'A test object', 
            text: "test description", 
            isCompleted: false
        }; 

        const response = await request(app).post('/api/todoNote/add').send({note: data}); 

        expect(response.status).toBe(201); 
        expect(response.body.title).toBe(data.title); 
        expect(response.body.description).toBe(data.text); 
        expect(response.body.isCompleted).toBe(data.isCompleted); 
            
    }
    );
})
