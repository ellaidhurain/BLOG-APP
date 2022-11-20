const user = {
    signup:"http://localhost:5000/api/user/signup",
    login: "http://localhost:5000/api/user/login",
    getAllUser:"http://localhost:5000/api/user/getAllUser",
}

const blog = {

    addBlog:"http://localhost:5000/api/blog/addBlog",
    getOneBlog:"http://localhost:5000/api/blog/getOneBlog/:id",
    getAllBlogs:"http://localhost:5000/api/blog/getAllBlogs",
    updateOneBlog:"http://localhost:5000/api/blog/updateOneBlog/:id",
    deleteOneBlog:"http://localhost:5000/api/blog/deleteOneBlog/:id",
    getOneUser:"http://localhost:5000/api/blog/getOneUser/:id",

}

export {user, blog}