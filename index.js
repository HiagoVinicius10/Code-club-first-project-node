const express = require ('express')
const uuid =  require('uuid')

const app = express()
const port = 3000
app.use(express.json())

/*
    Query params => meusite.com/users?name=Hiago&age=28   // FILTROS
    Estrutura do QUERY -> const {name, age} = request.query // Destructuring assignment. OU 
    // ↓↓ Da para fazer desse jeito também ↓↓
    // const name = request.query.name
    // const age = request.query.age

    Route params => /users/2 // BUSCAR, DELETAR OU ATUALIZAR ALGO ESPECIFICO. ID
    Request Body => { "name": "Hiago", "age": 28 }

    - GET        =>Buscar informação no back-end
    - POST       =>Criar uma nova informação no back-end
    - PUT /PATCH => Alterar/Atualizar uma informação no back-end
    - DELETE     => Deletar informação no back-end

    - Middleware => INTERCEPTADOR => Tem o poder de parar ou alterar dados da requisição
*/


const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if(index < 0) return response.status(404).json({ error: 'User not found' })

        request.userIndex = index
        request.userId = id

        next()
}

app.get('/users', (request, response) =>{
     return response.json(users)
     
})

app.post('/users', (request, response) =>{
    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)
    return response.status(201).json(user) 
})

app.put('/users/:id', checkUserId, (request, response) =>{
    const { name, age, } = request.body
    const index =  request.userIndex
    const id = request.userId
    
    const updatedUser = { id, name, age }

    users[index] = updatedUser

    return response.json(updatedUser)
})


app.delete('/users/:id', checkUserId, (request, response) =>{
    const index =  request.userIndex

        users.splice(index,1)

    return response.status(204).json()
})








app.listen (port, (D =>{
    console.log(`🚀 Server is running on port ${port}`)
}))