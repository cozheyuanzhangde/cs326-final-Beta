const express = require("express");
const pgp = require("pg-promise")({
    connect(client) {
        console.log('Connected to database:', client.connectionParameters.database);
    },

    disconnect(client) {
        console.log('Disconnected from database:', client.connectionParameters.database);
    }
});

// Local PostgreSQL credentials
const pgusername = "postgres";
const pgpassword = "p0st2333";

const url = process.env.DATABASE_URL || `postgres://${pgusername}:${pgpassword}@localhost/`;
const db = pgp(url);

async function connectAndRun(task) {
    let connection = null;
    try {
        connection = await db.connect();
        return await task(connection);
    } catch (e) {
        console.log(e);
        throw e;
    } finally {
        connection.done();
    }
}

async function addNewUser(email, password, username, schoolname, gender, major) {
    return await connectAndRun(db => db.none("INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6);", [email, password, username, schoolname, gender, major]));
}

//courseid returning for addNewComment
async function addNewCourse(schoolname, coursesubject, coursenumber, instructor, difficulty, time, overall) {
    return await connectAndRun(db => db.one("INSERT INTO gameScores VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING courseid;", [schoolname, coursesubject, coursenumber, instructor, difficulty, time, overall])
    .then(data => {
        // data = a new event id, rather than an object with it
    }));
}

//courseid returning for updateCourseInfo
async function addNewComment(courseid, username, textcomment, difficulty, time, overall) {
    return await connectAndRun(db => db.one("INSERT INTO gameScores VALUES ($1, $2, $3, $4, $5, $6) RETURNING courseid;", [courseid, username, textcomment, difficulty, time, overall]));
}

async function updateUserInfo(email, password, username, schoolname, gender, major) {
    return await connectAndRun(db => db.none("UPDATE users SET password = $2, username = $3, schoolname = $4, gender = $5, major = $6 WHERE email = $1;", [email, password, username, schoolname, gender, major]));
}

async function updateCourseInfo(courseid, difficulty, time, overall) {
    return await connectAndRun(db => db.none("UPDATE users SET difficulty = $2, time = $3, overall = $4 WHERE courseid = $1;", [courseid, difficulty, time, overall]));
}

async function loadCoursesBySchoolSubjectNumber(schoolname, coursesubject, coursenumber) {
    return await connectAndRun(db => db.any("SELECT * from courses WHERE schoolname = $1 AND coursesubject = $2 AND coursenumber = $3;", [schoolname, coursesubject, coursenumber]));
}

async function loadCoursecommentsByCourseID(courseid) {
    return await connectAndRun(db => db.any("SELECT * from courses WHERE courseid = $1;", [courseid]));
}



// EXPRESS SETUP
const app = express();

app.use('/', express.static('./client'));

app.use(express.json());

app.post("/addnewuser", async (req, res) => {
    await addNewUser(req.body.email, req.body.password, req.body.username, req.body.schoolname, req.body.gender, req.body.major);
    res.send("OK");
});

app.post("/addnewcourse", async (req, res) => {
    await addNewCourse(req.body.schoolname, req.body.coursesubject, req.body.coursenumber, req.body.instructor, req.body.difficulty, req.body.time, req.body.overall);
    res.send("OK");
});

app.post("/addnewcomment", async (req, res) => {
    await addNewComment(req.body.courseid, req.body.username, req.body.textcomment, req.body.difficulty, req.body.time, req.body.overall);
    res.send("OK");
});

app.post("/updateuserinfo", async (req, res) => {
    await updateUserInfo(req.body.email, req.body.password, req.body.username, req.body.schoolname, req.body.gender, req.body.major);
    res.send("OK");
});

app.post("/updatecourseinfo", async (req, res) => {
    await updateCourseInfo(req.body.courseid, req.body.difficulty, req.body.time, req.body.overall);
    res.send("OK");
});

app.get("/loadcoursesbyschoolsubjectnumber", async (req, res) => {
    const coursesloaded = await loadCoursesBySchoolSubjectNumber(req.query.schoolname, req.query.coursesubject, req.query.coursenumber);
    res.send(JSON.stringify(coursesloaded));
});


app.get("/loadcoursecommentsbycourseid", async (req, res) => {
    const commentsloaded = await loadCoursecommentsByCourseID(req.query.courseid);
    res.send(JSON.stringify(commentsloaded));
});


app.listen(process.env.PORT || 8080);