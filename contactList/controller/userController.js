const User = require('../model/userModel')
const bycrpt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Contact = require('../model/contact')
const Request = require('../model/request')
const mongoose = require('mongoose')
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
                friends: req.body.friends
            })
            await user.save()
            if (user) {
                var result = {
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    profilePic: user.profilePic
                }
                res.json({
                    Status: 200,
                    message: 'Added successfully',
                    data: user

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
        console.log(user)
        // let product = await User.findOne({ $or: [{ email: username }, { phone: username }] })
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
                        data: { token }
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
const userget = async (req, res, next) => {
    try {
        let user = await User.find()
        res.json({
            status: 200,
            data: user
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message
        })
    }
}

const contactList = async (req, res, next) => {
    try {

        let contact = new Contact({
            userId: req.user.id,
            contactId: req.body.contactId
        })

        await contact.save()
        res.json({
            status: 200,
            data: contact
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message
        })
    }

}
const contactGet = async (req, res, next) => {
    try {
        let { search, page = 1, limit = 10 } = req.query
        // const page = parseInt(req.query.page)
        // const limit = parseInt(req.query.limit)
        // const start = (page - 1) * limit    
        let users = await User.find({ name: { $regex: `${search}` } })
        let totalcount = await Contact.countDocuments(({ userId: req.user.id, contactId: users }))
        const total = totalcount;
        const currentPage = page ? +page : 1;
        const totalPages = Math.ceil(total / limit);
        const pageMeta = {};
        pageMeta.limit = parseInt(limit);
        pageMeta.page = currentPage;
        pageMeta.total = total;
        pageMeta.totalPages = totalPages;
        const start = (page - 1) * limit


        let contacts = await Contact.find({ userId: req.user.id, contactId: users }).populate('contactId').limit(limit).skip(start)
        contacts = contacts.map(a => {
            return {
                userId: a.userId,
                contactName: a.contactId.name,
                contactId: a.contactId._id,

            }
        })


        // console.log(contacts.contactId)
        //  let users = await User.find()
        // console.log(users)
        // contacts = contacts.map(a=>{
        //     console.log(a.contactId)
        //     let b = users.find(f=>f._id = a.contactId)
        //     console.log(b)

        //     return         {
        //         ...a,
        //         contactId : b
        //     }
        // })
        //    const page = parseInt(req.query.page)
        //         const limit = parseInt(req.query.limit) 
        // totalcount = contacts.length

        // if(contacts && page && limit && totalcount)
        // {



        res.json({
            status: 200,
            data: {
                pageMeta,
                contacts
            }

        })


        // }
        //         let contacts = await Contact.find({ userId: req.user.id }).populate('contactId').limit(limit)


    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message
        })
    }
}
const getUser = async (req, res, next) => {
    try {
        // console.log(req.user)
        let user = await User.find({ _id: { $nin: [req.user.id] } })
        // console.log(user)
        res.json({
            status: 200,
            data: user
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message
        })
    }
}
const request = async (req, res, next) => {
    try {
        // let requestTo = req.body.requestTo
        let request = new Request({
            requestTo: req.body.requestTo,
            userId: req.user.id,
        })
        request = await request.save()
        if (request.accepted == 0) {
            res.json({
                status: 200,
                message: "wait for friend list"
            })
        }
        // await contact.save()



        // res.json({
        //     status: 200,
        //     data: request
        // })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message
        })
    }
}
const findandAccepted = async (req, res, next) => {
    try {

        let user = req.user.id
        console.log(user)
        let request = await Request.findOneAndUpdate({ requestTo: user }, { $set: { accepted: req.body.accepted } }, { new: true })
        console.log(request)

        if (request.accepted == 1) {
            let users = await User.find({ _id: request.userId })
            users = Object.assign({}, users)
            console.log(users)

            // users = Object.keys(request.requestTo).map(key => {
            //     this.users[key] = [];

            //   this.users.friends[key].map(item => {
            //         this.request[key].push({ friend : items.friend });
            //     });
            // });
            // users = users['friend'].push(request);

            // console.log(users)
            let user = users[0].friends.push(request.requestTo)
            console.log(users)

            // users = await users.findByIdAndUpdate({ _id: request.userId }, { $set: { friends: user } }, { new: true })

            console.log(users)


            res.json({
                status: 200,
                message: "friend request accepted",
                data: request
            })
        } else {
            res.json({
                status: 400,
                message: "friend request rejected",
            })
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message
        })
    }
}
const listFriend = async (req, res, next) => {
    try {
        let { page = 1, limit = 10 } = req.query
        let totalcount = await Request.countDocuments({ $or: [{ requestTo: req.user.id }, { userId: req.user.id }], accepted: true })
        const total = totalcount;
        const currentPage = page ? +page : 1;
        const totalPages = Math.ceil(total / limit);
        const pageMeta = {};
        pageMeta.limit = parseInt(limit);
        pageMeta.page = currentPage;
        pageMeta.total = total;
        pageMeta.totalPages = totalPages;
        const start = (page - 1) * limit
        let request = await Request.find({ $or: [{ requestTo: req.user.id }, { userId: req.user.id }], accepted: true }).populate('requestTo').populate('userId').skip(start).limit(limit)
        request = request.map(a => {
            if (a.requestTo._id == req.user.id) {
                return {
                    myName: a.requestTo.name,
                    frdName: a.userId.name,
                }
            } else {
                return {
                    myName: a.userId.name,
                    frdName: a.requestTo.name,
                }
            }
        })
        res.json({
            status: 200,
            pageMeta,
            data: request
        })
    } catch (error) {
        // console.log(error)
        res.status(400).json({
            message: error.message
        })
    }
}



module.exports = { register, login, userget, contactList, contactGet, getUser, request, findandAccepted, listFriend }