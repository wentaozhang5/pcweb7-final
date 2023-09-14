import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();
const port ="3001" //0 -65535

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//conn to database
const pool = mysql
.createPool(
    {
        host:"localhost",
        user:"root",
        password:"123456",
        database:"computing_training",
    }
)
.promise();
 

async function getCourses(){
    const [rows] = await pool.query(
        "SELECT * FROM courses ; "
    );
    return rows
}

async function getSignUpCoursesByUserID(user_id){
    const [rows] = await pool.query(
        `SELECT courses.name,courses.image,courses.description,sign_up_courses.order_id 
        from courses INNER JOIN sign_up_courses  WHERE courses.id = sign_up_courses.course_id  
        AND sign_up_courses.order_id IN (
       SELECT a.order_id FROM sign_up_courses AS a 
                 JOIN user_login AS b WHERE a.user_id = b.user_id  
                    AND b.user_email = ? )
         `, [user_id]
    );
    return rows;
}

async function getSignUpCoursesbyOrderID(order_id){
    const [rows] = await pool.query(
        "SELECT * FROM sign_up_courses WHERE order_id = ? ", [order_id]
    );
    return rows;
}

async function addSignUpCourses(user_id,course_id,phone,message) {
  try{  
    const [result] =  await pool.query(
        `INSERT INTO sign_up_courses (user_id,course_id,phone,message)  VALUES (?, ?, ?, ?) ;`
                ,[user_id,course_id,phone,message] 
    );
    const id = result.insertId;
    return getSignUpCoursesbyOrderID(id);
  }
  catch (err)
  {
    console.error(err);
    return ([]);
  }
    
}


async function deleteSignUpCourse(id){
    await pool.query(
         `DELETE FROM sign_up_courses WHERE order_id = ? `, [id]
    );
}

async function getPortfolio(id) {
    const [rows] =await pool.query(
       "SELECT * FROM cases WHERE id = ? " , [id]
    );
    return rows[0];
}

async function getAllPortfolio() {
    const [rows] =await pool.query(
       "SELECT * FROM cases ;"
    );
    return rows;
}

async function addPortfolio(title,course_name,description,video_clip) {
    const [result] =  await pool.query(
        `INSERT INTO cases (title,course_name,description,video_clip)  VALUES (?, ?, ?, ?) `,
        [title,course_name,description,video_clip]
    );
    const id = result.insertId;
    return getPortfolio(id);
}

async function updatePortfolio(id,title,course_name,description,video_clip) {
    const [result] =  await pool.query(
        ` UPDATE cases SET 
        title = ?,
        course_name = ? ,
        description = ? ,
        video_clip = ? 
        WHERE id = ? `,
        [title,course_name,description,video_clip,id]
    );
    return getPortfolio(id);
}

async function deletePortfolio(id){
    await pool.query(
         `DELETE FROM cases WHERE id = ? `, [id]
    );
}

//add user info
async function getUserInfo(){
    const [rows] = await pool.query(" SELECT * FROM user_login ");
    //console.log(rows);
    return rows;
};

async function addUserInfo(user_email,user_password,user_name){
    const [result] = await pool.query(`INSERT INTO user_login (user_email,user_password,user_name) 
    VALUES (?,?,? )` , [user_email,user_password,user_name]
    );
}

async function getUserInfoByEmail(user_email_address){
    const rows = await pool.query(" SELECT * FROM user_login WHERE user_email = ? ",[user_email_address]);
    //console.log(rows);
    return rows[0];
};


app.listen(port, ()=> {
    console.log(`Example app listening on port ${port}` );

});


app.get("/portfolios/:id", async (req,res)=>{
    const id = req.params.id;
    const portfolio = await getPortfolio(id);
    res.send(portfolio).status(200);


});

app.get("/portfolios", async (req,res)=>{
    const portfolios = await getAllPortfolio();
    res.send(portfolios).status(200);


});

app.post("/post/portfolios",async (req,res)=>{

    const {title,course_name,description,video_clip} = req.body;
    const portfolio = await addPortfolio(title,course_name,description,video_clip);
    console.log("portfolio added: ", portfolio);
    res.send({status:"success"}).status(200);

});

app.put("/put/portfolios/:id",async (req ,res)=>{
    const id = req.params.id;
    const {title,course_name,description,video_clip} = req.body;
    const updatedPortfolio = await updatePortfolio(id,title,course_name,description,video_clip);
    res.send(updatedPortfolio).status(202);
}
);

app.delete("/delete/portfolios/:id", async (req,res)=>{
    const id = req.params.id;
    await deletePortfolio(id);
    res.send({status :"success"}).status(200);
});

app.get('/users/:id', async function(req, res){
        const id = req.params.id;
        const users = await getUserInfoByEmail(id);
        res.send(users).status(200);
        
});
app.post("/post/users",async (req ,res)=>{
    const {user_email,user_password,user_name} = req.body;
    const user_info = await addUserInfo(user_email,user_password,user_name );
    console.log("users successfully added to table: ", user_info);
    res.send({status:"success"}).status(200);
}
);


app.get('/courses',async (req,res)=>{
    const courses = await getCourses();
 //   console.log(courses);
    res.send(courses).status(200);
});

app.get('/sign_up_courses/:id', async function(req, res){
    const id = req.params.id;
    const signUpCourses = await getSignUpCoursesByUserID(id);
    res.send(signUpCourses).status(200);
    
});

app.post("/post/sign_up_courses",async (req ,res)=>{
    const {user_id,course_id,phone,message} = req.body;
    const signUpCourses = await addSignUpCourses(user_id,course_id,phone,message);
    console.log("signed up courses added to table: ", signUpCourses);
    if (signUpCourses.length >0)
    {
        res.send({status:"success"}).status(200);
    }
    else
    {
        res.send({status:"conflict"}).status(409);
    }
}
);


app.delete("/delete/sign_up_courses/:id", async (req,res)=>{
    const id = req.params.id;
    await deleteSignUpCourse(id);
    res.send({status :"success"}).status(200);
});