const mongo = require("mongoose");
const { type } = require("os");

const userSchema = new mongo.Schema({
    mobNo: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    transactHistory: {
        type: Array,
    }


})

// {
//     "mobNo":"+918200749460",
//     "password":"Het#7920",
//     "name":"Patel HetManishbhai",
//     "isAdmin":true
// }
//token:
// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JObyI6Iis5MTgyMDA3NDk0NjAiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MjcwMDU0MTgsImV4cCI6MTcyNzg2OTQxOH0.3A3d07eJCa49MYfgHPS8g_ae4mGOwM4HUwCuu2ZHfzI"
module.exports = { userSchema };