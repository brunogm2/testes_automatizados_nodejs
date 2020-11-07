const generateID = require ('../../src/utils/generateUUID');

//Testar se é possivel gerar um uuID único.
//Testar se esta vindo um ID
//Testar se este ID é uma string
//Testar se o tamanho da string é o que eu espero, 36 caracteres.

//Indentificação do que eu estou testando.
describe("generateUUID", () => {
    //caso de teste
   it("se é possivel gerar um uuID único", () => {
     const id = generateID();

    //o que eu estou esperando e aonde.
     expect(id).toBeDefined();
     expect(typeof id).toBe("string");
     expect(id).toHaveLength(36);
   });
});