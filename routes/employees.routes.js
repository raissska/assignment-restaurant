const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const Employees = require('../models/Employees')
const router = Router()


//  /api/employees/create
router.post(
    '/create',
    [
        check('id', 'Incorrect passport number').isLength({min: 5}),
        check('firstName', 'Enter a name').notEmpty(),
        check('lastName', 'Enter last name').notEmpty()
    ],
    async (req, res) => {
        try {
           const errors = validationResult(req)
            console.log('errors'+errors)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Uncorrected data'
                })
            }

            const {id, firstName, lastName,tel, address, dateOfBirth} = req.body
            const employees = await Employees.findOne({id})
            if (employees) {
                res.status(400).json({message: 'the employees already exists'})
            }
            const user = new Employees({id, firstName,lastName, tel, address, dateOfBirth})

            user.save()

            res.status(201).json({message: 'Employees create'})


        } catch (e) {
            res.status(500).json({message: `Server error! + ${e}`})
        }

    })

//  /api/employees
router.get('/', async (req, res) => {
    try {
        const listEmployees = await Employees.find({})
        res.json(listEmployees)
    } catch (e) {
        res.status(500).json({message: 'Server error'})
    }
})

//  /api/employees/:id
router.get('/:id', async (req, res) => {
    try{
        const id = req.params.id
        const listEmployees = await Employees.findOne({id})
        res.json(listEmployees)
    }catch (e) {
        res.status(500).json({message: 'Server error'})
    }
})

//  /api/employees/:id
router.put('/:idEmployee',
    [
        check('id', 'Incorrect passport number').isLength({min: 5}),
        check('firstName', 'Enter a name').notEmpty(),
        check('lastName', 'Enter last name').notEmpty()
    ],
    async (req, res) => {
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Uncorrected data'
            })
        }
        const {id, firstName, lastName,tel, address, dateOfBirth} = req.body
        const idEmployee = req.params.idEmployee.trim()
        const employee = await Employees.findOne({'id':idEmployee})
        if(!employee){
            res.status(404).json({message:'Not found'})
        }
        employee.id = id;
        employee.firstName = firstName;
        employee.lastName = lastName;
        employee.tel = tel;
        employee.address = address;
        employee.dateOfBirth = dateOfBirth;
        employee.save()

        res.status(200).json({message:'Employee update'})
    }catch (e) {
        res.status(500).json({message: 'Server error'})
    }


})

//  /api/employees/:id/delete
router.delete('/:id/delete', async (req, res) => {
    try{
        const id = req.params.id
        const employee = await Employees.findOne({id})
        if(!employee){
            res.status(404).json({message: 'Not found'})
        }
        employee.remove()
        res.status(200).json({message:'Employee removed'})
    }catch (e) {
        res.status(500).json({message: 'Server error' + e})
    }
})

module.exports = router