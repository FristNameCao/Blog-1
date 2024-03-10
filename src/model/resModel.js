
// this就是谁被调用就指向谁
class BaseModel {
    constructor(data, message) {
        if (typeof data === "string") {
            // console.log("data1: ", data)
            // console.log("message1: ", message)
            // console.log("this.message1: ", this.message)
            this.message = data
            data = null
            message = null
        }

        if (data) {
            // console.log("data2: ", data)
            // console.log("this.data2: ", this.data)
            this.data = data
        }

        if (message) {
            // console.log("message2: ", message)
            // console.log("this.message2: ", this.message)
            this.message = message

        }

    }
}

class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.errno = 0
    }
}

class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.errno = -1
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}