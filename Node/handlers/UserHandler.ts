import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import express from "express";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { Blog } from "../beans/Blog";
import { User } from "../beans/User";
import { MongoDBClient } from "../clients/mongoDbClient";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(function (req, res, next) {
	const origin = req.headers.origin;
	res.setHeader('Access-Control-Allow-Origin', origin);
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	res.header("Access-Control-Allow-credentials", true);
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
	next();
});

app.use(
	bodyParser.json({
		extended: true,
	})
);
app.use(express.static("public"));

app.listen(PORT, () => {
	console.log(`server started on port ${PORT}`);
});

// create new user
app.post("/signup", async (req, res) => {
	const mongoDbClient: MongoDBClient = new MongoDBClient();

	const user: User = req.body;
	user.user_id = uuid().replace(/-/gi, ""); //to remove dash if there
	const response = await mongoDbClient.postItem(user, "USER");
	res.send(response);
});

//get existing user
app.get("/user", async (req, res) => {

	

	const mongoDbClient: MongoDBClient = new MongoDBClient();

	const email = req.query.email;

	const response = await mongoDbClient.getItem({ email: email }, "USER");
	response.password = undefined;
	res.send(response);
});

// update password
app.post("/user/password", async (req, res) => {
	const mongoDbClient: MongoDBClient = new MongoDBClient();

	const user: User = req.body;

	bcrypt.hash(user.password!, 10).then((password) => {
		user.password = password;
	});
	const response = await mongoDbClient.updateitem(
		{ email: user.email },
		"USER",
		user
	);
	res.send(response);
});

// login
app.post("/login", async (req, res) => {
	const mongoDbClient: MongoDBClient = new MongoDBClient();

	const user: User = req.body;

	const oldUser = await mongoDbClient.getItem({ email: user.email }, "USER");

	const match = await bcrypt.compare(user.password!, oldUser.password);

	if (match) {
		const token = jwt.sign(
			{ email: user.email, iss: "blog.ak.com" },
			"mcjfHfie"
		);
		res.send(token);
	} else {
		throw new Error("Incorrect Password");
	}
});

//authorize
app.post("/authorize", (req, res) => {
	const token = req.body.token;
	const response = jwt.verify(token, "mcjfHfie");
	res.send(response);
});

// create new blog
app.post("/blog", async (req, res) => {
	const mongoDbClient: MongoDBClient = new MongoDBClient();

	const blog: Blog = req.body;
	blog.blog_id = uuid().replace(/-/gi, "");
	const createdDate = new Date();
	blog.created_at = createdDate.getTime();
	const response = await mongoDbClient.postItem(blog, "BLOG_DATA");

	// add entry to tags

	const tags = blog.tags;
	if (tags) {
		for (let tag of tags) {
			tag = tag.toLowerCase();
			try {
				let tagData = await mongoDbClient.getItem({ tag_name: tag }, "TAG");
				tagData.blog_id.push(blog.blog_id);
				await mongoDbClient.updateitem({ tag_name: tag }, "TAG", tagData);
			}
			catch (err) {
				if (err instanceof Error && err.message === "Item does not exist") {
					await mongoDbClient.postItem(
						{ tag_name: tag, blog_id: [blog.blog_id] },
						"TAG"
					);
				}
			}
		}
	}
	res.send(response);
});

// get blog
app.get("/blog", async (req, res) => {
	const mongoDbClient: MongoDBClient = new MongoDBClient();
	const blog_id = req.query.blog_id;

	const response = await mongoDbClient.getItem(
		{ blog_id: blog_id },
		"BLOG_DATA"
	);
	res.send(response);
});

// get all blogs of a user
app.get("/blogall", async (req, res) => {
	const mongoDbClient: MongoDBClient = new MongoDBClient();
	const user_id = req.query.user_id;

	const response = await mongoDbClient.getItems(
		{ user_id: user_id },
		"BLOG_DATA"
	);
	console.log(response);
	res.send(response);
});

// get all blogs
app.get("/blogs", async (req, res) => {
	const mongoDbClient: MongoDBClient = new MongoDBClient();

	let response = await mongoDbClient.getallitem(
		"BLOG_DATA"
	);

	response.sort((a, b) => b.created_at - a.created_at);

	res.send(response);
});

// delete user
app.post("/user/delete", async (req, res) => {
	const mongoDbClient: MongoDBClient = new MongoDBClient();

	const user: User = req.body;

	const response = await mongoDbClient.deleteitem(
		{ email: user.email },
		"USER"
	);
	res.send(response);
});

// delete blog
app.post("/deleteblog", async (req, res) => {
	const mongoDbClient: MongoDBClient = new MongoDBClient();
	const blog: Blog = req.body;
	const response = await mongoDbClient.deleteitem(
		{ blog_id: blog.blog_id },
		"BLOG_DATA"
	);
	res.send(response);
});

// update user
app.post("/user/update", async (req, res) => {
	const mongoDbClient: MongoDBClient = new MongoDBClient();

	const user: User = req.body;

	const response = await mongoDbClient.updateitem(
		{ email: user.email },
		"USER",
		user
	);
	res.send(response);
});

// update blog
app.post("/blog/update", async (req, res) => {
	const mongoDbClient: MongoDBClient = new MongoDBClient();
	const blog: Blog = req.body;
	const response = await mongoDbClient.updateitem(
		{ blog_id: blog.blog_id },
		"BLOG_DATA",
		blog
	);
	res.send(response);
});


// get blogs from tag
app.get("/tag", async (req, res) => {
	const mongoDbClient: MongoDBClient = new MongoDBClient();

	const tag = req.body.tag;

	const response = await mongoDbClient.getItem(
		{ tag_name: tag },
		"TAG"
	);
	res.send(response.blog_id);
})