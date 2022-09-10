

const data = require("../mockdata.json")

const find = (req, res, next) => {
    try {
        let find = req.query.find
        console.log(find)
        const result = data.find(mockdata => {
            // if (mockdata.first_name === find) {
            //     return mockdata
            // }
            // else if (mockdata.last_name === find) {
            //     return mockdata
            // }
            // else if (mockdata.email === find) {
            //     return mockdata
            // }
            return mockdata.first_name === find || mockdata.last_name === find || mockdata.email === find


        })
        console.log(result)
        if (result) {
            return res.json({
                status: 200,
                message: "Succuessful",
                data: result
            })
        }
            return res.json({
                status: 200,
                message: "key value not found",
            })
    }
    catch (error) {
        res.json({
            message: 'error'

        })
    }

}
const filter = (req, res, next) => {
    try {
        let find = req.query.find
        console.log(find)
        const result = data.filter(mockdata => {
            if (mockdata.first_name === find) {
                return mockdata.first_name === find
            }
            else if (mockdata.last_name === find) {
                return mockdata.last_name === find
            }
            else if (mockdata.email === find) {
                return mockdata.email === find
            }
        })
        console.log(result)
        if (result) {
            return res.json({
                status: 200,
                message: "Succuessful",
                data: result
            })
        }
        return res.json({
            status: 200,
            message: "key value not found",
        })
    }
    catch (error) {
        res.json({
            message: 'error'

        })
    }

}
const list = (req, res, next) => {
    let ar2 = []
    const listing = data.map(e => {
        return {
            name: e.first_name + e.last_name,
            mark: e.mark + 10
        }
         

        // const listing = data.forEach((e) => {
        //     ar2.push({
        //         name: e.first_name + e.last_name,
        //         mark: e.mark + 10
        //     })
        //     return
    

    })

    return res.json({
        status: 200,
        message: "Succuessful",
        data: listing
    })
}
const marks = (req, res, next) => {
    const find = req.query.find
    console.log(find)
    const listmark = data.find(mockdata => {
        if (mockdata.first_name === find) {
            return mockdata
        }
        else if (mockdata.last_name === find) {
            return mockdata
        }
        else if (mockdata.email === find) {
            return mockdata
        }


    })
    if (listmark) {
        return res.json({
            status: 200,
            message: "Succuessful",
            data: listmark.email
        })
    }
    return res.json({
        status: 200,
        message: "key value not found",
    })
}


const total = (req, res, next) => {
    // const find = req.query.find
    // console.log(find)
    const totalmark = data.reduce(function (acc, r) {
        return acc + r.mark
        // return totals
    }, 0)
    if (totalmark) {
        return res.json({
            status: 200,
            message: "Succuessful",
            data: totalmark
        })
    }
    return res.json({
        status: 200,
        message: "key value not found",
    })
}


const marklist1 = (req, res, next) => {

    const marklist = data.filter(lessmark => lessmark.mark < 35)
    if (marklist) {
        return res.json({
            status: 200,
            message: "Succuessful",
            data: marklist
        })
    }
    return res.json({
        status: 200,
        message: "key value not found",
    })
}
const marklist2 = (req, res, next) => {

    const marklist = data.filter(lessmark => lessmark.mark >= 35 && lessmark.mark <= 50)
    if (marklist) {
        return res.json({
            status: 200,
            message: "Succuessful",
            data: marklist
        })
    }
    return res.json({
        status: 200,
        message: "key value not found",
    })
}
const marklist3 = (req, res, next) => {

    const marklist = data.filter(lessmark => lessmark.mark >= 75 && lessmark.mark < 100)
    if (marklist) {
        return res.json({
            status: 200,
            message: "Succuessful",
            data: marklist
        })
    }
    return res.json({
        status: 200,
        message: "key value not found",
    })
}

const getAllMarks = (req, res, next) => {
    const average = []
    const good = []
    const well = []
    let result = []
    const getmark = data.reduce((acc, l) => {
        let mark, goodMark, wellmark
        if (l.mark < 35) {
            mark = l
            average.push({
                mark

            })
        }

        if (l.mark >= 35 && l.mark <= 50) {
            goodMark = l
            good.push({ goodMark })
        }
        if (l.mark >= 75 && l.mark < 100) {
            wellmark = l
            well.push({
                wellmark
            })
        }
        return {
            average, good, well
        }

    }, 0)

    result.push({ average }, { good }, { well })
    console.log(getmark)
    if (getmark) {
        return res.json({
            status: 200,
            message: "Succuessful",
            data: {
                result
            }
            // data: good

        })
    }

    return res.json({
        status: 200,
        message: "key value not found",
    })
}
module.exports = { find, filter, list, marks, total, marklist1, marklist2, marklist3, getAllMarks }