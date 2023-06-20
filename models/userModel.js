import mongoose, {Schema, model, models} from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is a required field'],
        unique: [true, 'Email already exist'] // here it will check if email is already there then it returns the 2nd element in the array
    },
    username: {
      type: String,
      required: [true, 'userName is a required field'],
      match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username is invalid and it should contain 8-20 alphanumeric letters and be unique!!"]
    },
    Image: {
        type: String
    }
});

// The models object is provided by mongoose labrary and stores all the registered models.
// If a model named User already exists in the "models" object, it assigns that existing model to the "User" variable. This prevents the redefining the model and ensures that the existing model is reused.

// If a model named "User" doesn't exist in the "Models" object, the "model" function from mongoose is called to create a new model. This newly created model is then assigned to the User variable.


// before creating a model we need to check whether this User model is already present in the Models object or not and only if it is not present in the models object then we need to create a new model named user. because this is a serverless lambda function this is running everytime when it is being called. So we need to make check that whether the multiple models is not going to created with the same name and Schema like User.

const User = models.User || model("User", userSchema);

export default User;