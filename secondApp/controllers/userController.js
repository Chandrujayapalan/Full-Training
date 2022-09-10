const User = require('../models/userModel')
const bycrpt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Subject = require('../models/subjectModel')
const excelToJson = require('convert-excel-to-json');


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
                gender: req.body.gender,
                DoB: req.body.DoB,
                email: req.body.email,
                password: hashedPass,
                userType: 1
            })
            if (req.file) {
                user.profilePic = req.file.path
            }
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
                    user: result

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
        let user = await User.findOne({ $or: [{ email: username }, { phone: username }] })
        if (user) {

            bycrpt.compare(password, user.password, (err, result) => {
                if (err) {
                    res.json({
                        error: err
                    })
                }
                if (result) {
                    let token = jwt.sign({ id: user.id, userType: user.userType }, 'Secretvalue', { expiresIn: '12hr' })
                    console.log(user)
                    res.json({

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
        res.status(400).json({
            error
        })
    }
}


const subject = async (req, res, next) => {
    try {
        let subjectList = new Subject({

            userId: req.body.userId,
            English: req.body.English,
            Tamil   : req.body.Tamil,
            Maths  : req.body.Maths,
            Science: req.body.Science,
            Social: req.body.Social,

        })
        await subjectList.save()
        res.json({
            message: 'added successfully',
        })

    } catch (error) {
        res.json({
            message: error.message
        })
    }
}
const updateSubject = async (req, res, next) => {
    try {
        let userId = req.body.subjectId
        let updateMark = {

            English: req.body.English,
            Tamil: req.body.Tamil,
            Maths: req.body.Maths,
            Science: req.body.Science,
            Social: req.body.Social,
            Total: req.body.Total,
        }
        console.log(userId)
        let upmark = await Subject.findByIdAndUpdate(userId, { $set: updateMark })
        res.json({
            upmark,
            message: 'Updated Successfully',

        })
    } catch (error) {
        res.json({
            message: 'an occur error'
        })
    }
}

const deleteSubject = async (req, res, next) => {
    try {
        let subjectId = req.body.subjectId
        await Subject.findByIdAndRemove(subjectId)
        res.json({
            message: 'Delete'

        })
    } catch (error) {
        res.json({
            message: 'error'
        })
    }
}
const totalUser = async (req, res, next) => {
    try {
        let get = await Subject.find()
        res.json({
            get
        })
    } catch (error) {
        res.status(400).json({
            message: 'an error  Occured'

        })
    }
}
const singleUser = async (req, res, next) => {
    try {
        let userId = req.body.userId
        let marks = await Subject.findById(userId)
        res.json({
            status: 200,
            data: marks
        })

    } catch (error) {
        res.json({
            message: 'an error  Occured'

        })
    }
}
const studentList = async (req, res, next) => {
    try {
        let list = await User.find({ userType: 1 })
        res.json({
            status: 200,
            data: list

        })
    } catch (error) {
        res.json({
            message: 'an error  Occured'

        })

    }
}
const subjectwiseMark = async (req, res, next) => {
    try {
        let find = req.query.find
        let items = await Subject.find().select(find)
        items = items.map(mark => {
            return {
                [find]: mark[find]

            }
        }

        )
        res.json({
            status: 200,
            data: items
        })



    } catch (error) {
        res.json({
            message: error.message
        })
    }



}

const totalSingleUser = async (req, res, next) => {
    try {
        let result = await Subject.find()
        result = result.map(obj => {
            return {
                tamil: obj.Tamil,
                english: obj.English,
                maths: obj.Maths,
                social: obj.Social,
                science: obj.Science,
                total: obj.Tamil + obj.English + obj.Maths + obj.Social + obj.Science
            }
        })
        result = result.sort((a, b) => {
            return a.Total - b.Total
        }).reverse()
        result = result.map(as => {
            return {
                rank: as.total
            }
        })
        console.log(result)
        res.json({
            status: 200,
            data: result
        })

    } catch (error) {
        res.json({
            message: error.message
        })
    }
}
// const rank = async (req, res, next) => {
//     try {

//         let result = await Subject.find().select()
//         result = result.sort((a, b) => {
//             return a.Total - b.Total
//         }).reverse()
//         result = result.reduce((as,a)=> {
//             return {
//               as:as.Total     
//             }
//         },0)
//         console.log(result)
//         res.json({
//             result
//         })
//     } catch (error) {
//         res.json({
//             message: error.message
//         })
//     }
// }
const rank = async (req, res, next) => {
    try {
        let result = await Subject.find()
        result = result.map(obj => {
            return {
                tamil: obj.Tamil,
                english: obj.English,
                maths: obj.Maths,
                social: obj.Social,
                science: obj.Science,
                total: obj.Tamil + obj.English + obj.Maths + obj.Social + obj.Science,
            }
        })
        let sorted = result.sort((a, b) => a.Total - b.Total).reverse().map((a, i) => {
            a.ranks = (i + 1)
            return a
        })
        // result = result.map(v => sorted.indexOf(v) + 1)
        res.json({
            status: 200,
            data: sorted

        })

    } catch (error) {
        res.json({
            message: error.message
        })
    }
}
// const rank = async (req, res, next) => {
//         try {
//             let result = await Subject.find()
//             result = result.map(obj => {
//                 return {

//                     english: obj.English,
//                     tamil: obj.Tamil,
//                     maths: obj.Maths,
//                     science: obj.Science,
//                     social: obj.Social,                  
//                     total: obj.Tamil + obj.English + obj.Maths + obj.Social + obj.Science,

//                 }
//             })
//            result = result.reduce((acc,l) =>{

//             return{
//                ...acc,[l.total]:(acc[l.total])
//             }
//             })
//            console.log(result)
//                    res.json({
//                     result
//                    })

//         } catch (error) {
//             res.json({
//                 message: error.message
//             })
//         }
//     }
const studentId = async (req, res, next) => {
    try {
        let userId = req.body.userId
        let student = await User.findById(userId)
        res.json({
            Status: 200,
            message: "Value goted",
            data: student
        })

    } catch (error) {
        res.json({
            message: 'an error  Occured'

        })
    }
}
const uploadimage = async (req, res, next) => {
    try {
        let userId = req.user.id
        // let student = await User.findById(userId)
        console.log(req.user)
        console.log(userId)
        let upmark = await User.findByIdAndUpdate(userId, { $set: { profilePic: req.file.path } },{new:true})
        console.log(req.file)
        if (upmark) {
            res.json({
                status: 200,
                message: 'Added successfully',
                data: upmark

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
const execl = async (req, res, next) => {

    try {
        const file = req.file.path
        let result = excelToJson({
            sourceFile: file,
            header: {
                rows: 1
            },
            columnToKey: {

                A: 'name',
                B: 'email',
                C: 'phone'
            }
        })
        result = result.Sheet1.map(a => {
            a.password = "abcd@1234"
            return a
        })
        result = await User.insertMany(result)

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
const execl1 = async (req, res, next) => {

    try {
        const file = req.file.path
        let result = excelToJson({
            sourceFile: file,
            header: {
                rows: 1
            },
            columnToKey: {

                A: 'name',
                B: 'email',
                C: 'phone'
            }
        })

        result = User.bulkWrite([
            {
                updateMany: {
                    "filter": { name: "Aravind" },
                    "update": { $set: { email: "arav13@gmail.com", phone: 9876654321 } },
                    "upsert": true
                }
            }
        ])
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
module.exports = { execl1, execl, uploadimage, studentId, register, login, subject, updateSubject, deleteSubject, singleUser, totalUser, rank, studentList, totalSingleUser, subjectwiseMark }