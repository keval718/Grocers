const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt       = require('jsonwebtoken');
const config = require('config');

const ProviderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    Address: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true,
        unique: true
    },
    postal_code: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    OwnerName: {
        type: String,
        required: true
    },
    Open_time: {
        type: String,
        required: true
    },
    Close_time: {
        type: String,
        required: true
    }
});

ProviderSchema.statics.checkValidCredentials = async (email, password) => {
    const user = await provider.findOne({email})
    console.log(email);
    if(!user){
        throw new Error('Unable to login 2X')
    }
    console.log(password);
    const isMatch = await bcrypt.compare(password,user.password)
  
    if(!isMatch){
        throw new Error('Unable to login 2')
    }
  
    return user
  }

  ProviderSchema.methods.newAuthToken = async function(){
    const user  = this
    const token =  jwt.sign({ _id: user.id.toString() },config.get('jwtsecret'))
    // user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
  }

const provider = mongoose.model('provider', ProviderSchema);
module.exports = provider;