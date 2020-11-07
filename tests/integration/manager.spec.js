//subir o servidor no supertest
//criar variavel de ambiente para rodar o teste no bd de teste

const request = require("supertest");
const app = require('../../src/app');
const connection = require('../../src/database')
const {cpf} = require("cpf-cnpj-validator");
const truncate = require("./truncate");

describe("MANAGERS", () => {
    afterAll(() => {
        connection.close();
    })

    beforeEach( async (done) =>{
    await truncate(connection.models);
    done();
    });

    it("é possivel criar um novo gerente", async () => {
        const response = await request(app).post("/managers").send({
            name: "Bruno Gonçalves",
            cpf: cpf.generate(),
            email: "brunobgm002@gmail.com",
            cellphone: "980506199",
            password: "123456",
        });

        expect(response.ok).toBeTruthy();
        expect(response.body).toHaveProperty("id"); 
    });

    it("não é possivel cadastrar um gerente com cpf existente", async () =>{
        let cpfGerente = cpf.generate();
        let response = await request(app).post("/managers").send({
            name: "Bruno Gonçalves",
            cpf: cpfGerente,
            email: "brunobgm002@gmail.com",
            cellphone: "980506199",
            password: "123456",
        });

        let response = await request(app).post("/managers").send({
            name: "Gabriel Gonçalves",
            cpf: cpfGerente,
            email: "brunobgm123@gmail.com",
            cellphone: "980500000",
            password: "123456",
        });

        expect(response.ok).toBeFalsy();
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toEqual("cpf already exists")
    })
});