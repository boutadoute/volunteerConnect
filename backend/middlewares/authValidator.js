import Validator from "validatorjs";

export const registerValidation = (req , res , next) => {

    const validateRule = {

        "name":"required|string|min:3",
        "email":"required|email",
        "password":"required|min:6",
        "phone_number":"required|numeric | min:10",
        "city": "required|string"

    }

    const validation = new Validator(req.body , validateRule);

    if (validation.fails()) {

        res.status(412).send({ message: "validation Failed" });

    } else {

        next();

    }

}

export const loginValidation = async (req , res , next) => {

    const validateRule = {

        "email":"required|email",
        "password":"required|min:6"

    };

    const validation = new Validator(req.body , validateRule);

    if (validation.fails()) {

        res.status(412).json({ message: "You failed to login" });

    } else {

        next();

    }

}