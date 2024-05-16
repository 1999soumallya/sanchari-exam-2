module.exports = {
    commonError: (error) => {
        return { message: 'Internal server error!', success: false, error: error.stack }
    },
    validationError: (errors) => {
        return { message: "Please fill all mandatory field", success: false, errors: errors }
    },
    middleware: {
        validToken: "Provide valid token to perform this operation",
        unauthorized: "Your are not authorized to access this platform",
        requireToken: "Provide valid token to access this platform"
    },
    userCheck: {
        success: true,
        notfound: false,
        failed: "User find process failed"
    },
    register: {
        success: "You are successfully registered",
        failed: "Your registration process failed",
    },
    login: {
        success: "Login Successful",
        noUser: "Invalid username or password",
        failed: "Login process failed please try after some time",
        wrong: "Your email and password is not matched!",
    },
    addUser: {
        success: "New user is successfully added to the system",
        failed: "New user registration process failed",
    },
    removeUser: {
        success: "User is successfully removed from the system",
        failed: "User remove process failed",
        notfound: "User is not found in the system",
    },
    getAllUser: {
        success: "All users are successfully fetched",
        failed: "User fetch process failed",
    },
    logout: {
        success: "You are successfully logged out",
        failed: "Logout process failed",
    }
}