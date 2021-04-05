const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const {body, validationResult} = require('express-validator')
const port = 4000

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/', (req, res)=>{
    res.send('hello')
})
//registration
app.post('/register', 
body('username').isString(),
body('email').isEmail(),
body('phone number').isNumeric(),
body('password').isLength({
    min:6
}), (req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            success:false,
            errors:errors.array()
        })
    }
    res.status(200).json({
        success:true,
        message:'register is successful'
    })
})

//login

app.post('/login', 
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({
            min:6
        }), (req,res)=>{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    success:false,
                    errors:errors.array()
                })
            }
            
                res.status(200).json({
                    success:true,
                    message:'register successfull'
                })
            
        })

app.listen(port, ()=>{
    console.log(`server is starting at http://localhost:${port}`)
})