const User = require('../model/userModel')
const bycrpt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Orders = require('../model/orderModel')
const Products = require('../model/productModel')
const excelToJson = require('convert-excel-to-json')
const stripeModel = require('../model/stripeModel')
const stripeSecretKey = 'sk_test_51LQ9lAFcAnctHMp8RHDxIhS9AfImNmftMY8SqmglOi7v1zIK7uDO6vPAV2XSsf3sX032hXpXilFBJ7wbLsD0iTdX00gzZH6Jj7'
// const stripePublicKey = 'sk_test_51LPh4SSBmgKYaPdcpu0c3qO3cXGIfverRS4JDlkVNSYHsREeNTlxa9hejYGgUjrGtOSBAVHO20cBistAwgHZ1rgI00H1kniJ9D'
const stripe = require('stripe')(stripeSecretKey)
require('dotenv').config()

const register = (req, res, next) => {
    try {
        bycrpt.hash(req.body.password, 10, async function (err, hashedPass) {
            if (err) {
                res.json({
                    error: err
                })
            }
            let user = new User({
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                password: hashedPass,

            })
            let exitUser = await User.findOne({
                $or: [{ email: req.body.email }, { phone: req.body.phone }]
            })
            if (exitUser) {

                res.json({
                    Status: 200,
                    message: "Already registered"

                })
            } else {
                await user.save()

                res.json({
                    Status: 200,
                    message: "registered Successfully"

                })

            }
        })
    }
    catch (error) {
        res.json({
            message: error.message
        })
    }
}

const login = async (req, res, next) => {
    try {
        console.log("user", req.body.username)
        let username = req.body.username
        let password = req.body.password
        let types = {}
        if (typeof username === 'string') {
            types = { email: username }
        }
        else if (typeof username === 'number') {
            types = { phone: username }
        }
        console.log(types)
        let user = await User.findOne(types)

        if (user) {
            bycrpt.compare(password, user.password, (err, result) => {
                if (err) {
                    res.json({
                        error: err
                    })
                }
                if (result) {
                    let token = jwt.sign({ id: user.id }, process.env.TOKEN_KEY, { expiresIn: '24hr' })
                    res.json({
                        status: 200,
                        message: 'login Successful',
                        token
                    })
                }
                else {
                    res.json({
                        message: 'password does not match'
                    })
                }
            })
        } else {
            res.json({
                message: 'no user found'
            })
        }
    }
    catch (error) {
        console.log(error)
        res.json({
            message: error.message
        })
    }
}
const stripePayment = async (req, res, next) => {

    try {

        let user = await User.findOne({ _id: req.user.id })

        console.log(user);
        let customers = await stripeModel.findOne({ userId: req.user.id })

        if (!customers) {
            let customer = await stripe.customers.create({
                email: user.email,
                description: user.name,

            });
            customers = new stripeModel({
                custumerId: customer.id,
                userId: user.id
            })
            customers.save()
        }

        const card = await stripe.customers.createSource(
            customers = customers.custumerId,
            { source: 'tok_amex' }


        );
        // const card = await stripe.customers.createSource(
        //     customer = customerModel.custumerId,
        //     { source: 'tok_visa' }
        // );



        // const cards = await stripe.customers.listSources(
        //     customer = customerModel.custumerId,
        //     {object: 'card', limit: 3}
        //   );
        res.status(200).json({
            status: 200,
            message: 'card added',
            data: card

        })


    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: error.message
        })
    }

}
const listStripe = async (req, res, next) => {

    try {
        let customers = await stripeModel.findOne({ userId: req.user.id })

        const cards = await stripe.customers.listSources(
            customers = customers.custumerId,
            { object: 'card', limit: 10 }
        );
        res.json({
            status: 200,
            data: cards
        })


    } catch (error) {
        console.log(error);
        res.json({
            message: error.message
        })
    }

}

const chagre = async (req, res, next) => {

    try {
        let customers = await stripeModel.findOne({ userId: req.user.id })
        // const charge = await stripe.charges.create({
        //     amount: 20000,
        //     currency: 'usd',
        //     source: 'tok_amex',
        //     description: 'chandru',
        //   });
        // const paymentIntent = await stripe.paymentIntents.create({
        //     amount: 7000,
        //     currency: 'inr',
        //     payment_method_types: ['card'],
        //   });
        // const paymentIntent = await stripe.paymentIntents.update(
        //     'pi_3LQ9odFcAnctHMp80tM97Pbs',
        //     {metadata: {order_id: '6735'}}
        //   );
        const paymentIntent = await stripe.paymentIntents.confirm(
            'pi_3LQ9odFcAnctHMp80tM97Pbs',
            { payment_method: 'pm_card_visa' }

        );

        // const paymentIntents = await stripe.paymentIntents.list({
        //     limit: 3,
        //   });
        // const paymentIntent = await stripe.paymentIntents.retrieve(
        //     'pi_3LQ9odFcAnctHMp80tM97Pbs'
        //   );
        res.status(200).json({
            status: 200,
            message: 'card added',
            data: paymentIntent
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: error.message
        })
    }


}
const updateCard = async (req, res, next) => {
    try {

        // let result = await stripeModel.findOne({userId :req.user.id})

        let customers = await stripeModel.findOne({ userId: req.user.id })
        // const cards = await stripe.customers.listSources(
        //     customers = customers.custumerId,
        //     { object: 'card', limit: 1 }
        // );
        const card = await stripe.customers.updateSource(
            customers = customers.custumerId,
            'card_1LRrSXFcAnctHMp8UNrqXBHY',
            { name: 'kavi' }
        );
        res.status(200).json({
            status: 200,
            message: 'card updated',
            data: card
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: error.message
        })
    }




}
const deleteCard = async (req, res, next) => {
    try {

        // let result = await stripeModel.findOne({userId :req.user.id})

        let customers = await stripeModel.findOne({ userId: req.user.id })

        const card = await stripe.customers.deleteSource(
            customers = customers.custumerId,
            'card_1LQ86HSBmgKYaPdcIyjiNWMj',

        );
        res.status(200).json({
            status: 200,
            message: 'card deleted',
            data: card
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: error.message
        })
    }
}

const uploadproduct = async (req, res, next) => {
    try {
        const file = req.file.path
        let result = excelToJson({
            sourceFile: file,
            header: {
                rows: 1
            },
            columnToKey: {
                A: 'productsName',
                B: 'productPrice',
                C: 'productDescription',
                D: 'productReviews'
            }
        })
        console.log(result)
        result = await Products.insertMany(result.Sheet1)
        console.log(result.Sheet1)
        res.json({
            status: 200,
            message: 'Added successfully',
            result
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message
        })
    }
}
const orderplace = async (req, res, next) => {

    try {
        let result = await Products.find({ _id: { $in: req.body.items } })
        let totalCost = 0
        result.map(a => {
            totalCost += a.productPrice
        })
        console.log(req.user)

        result = new Orders({
            items: req.body.items,
            userId: req.user.id,
            total: totalCost,
            date: req.body.date
        })
        console.log(result)
        await result.save()
        res.json({
            status: 200,
            data: result
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
const paymentMethod = async (req, res, next) => {

    try {
        let customers = await stripeModel.findOne({ userId: req.user.id })
        let result = await Orders.findOne({ userId: req.user.id })
        console.log(result)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: result.total,
            currency: 'usd',
            payment_method_types: ['card'],
            customer : customers.custumerId,
        });

        res.json({
            status: 200,
            data: paymentIntent
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
const paymentMethod2 = async (req, res, next) => {

    try {
        let customer = await stripeModel.findOne({ userId: req.user.id })
        console.log(customer);
        const paymentIntent = await stripe.paymentIntents.confirm(
            'pi_3LRvhwFcAnctHMp8089D8HJm',
           {payment_method: 'card_1LRrW5FcAnctHMp8Z428RUKl'},
        );

        res.json({
            status: 200,
            data: paymentIntent
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
module.exports = {
    register,
    login,
    stripePayment,
    listStripe,
    chagre,
    updateCard,
    deleteCard,
    orderplace,
    uploadproduct,
    paymentMethod,
    paymentMethod2
}