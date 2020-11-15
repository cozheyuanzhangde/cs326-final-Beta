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
    return await connectAndRun(db => db.none("INSERT INTO users VALUES (DEFAULT, $1, $2, $3, $4, $5, $6);", [email, password, username, schoolname, gender, major]));
}


async function addNewCourse(schoolname, coursesubject, coursenumber, instructor, difficulty, time, overall, username, textcomment) {
    db.tx(async db => {
        const courseid = await db.one("INSERT INTO courses(courseid, schoolname, coursesubject, coursenumber, instructor, difficulty, time, overall) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7) RETURNING courseid;", [schoolname, coursesubject, coursenumber, instructor, difficulty, time, overall], c => +c.courseid);
        return db.none("INSERT INTO coursecomments VALUES ($1, $2, $3, $4, $5, $6);", [courseid, username, textcomment, difficulty, time, overall]);
    });
}

async function addNewComment(courseid, username, textcomment, difficulty, time, overall) {
    return await connectAndRun(db => db.none("INSERT INTO coursecomments VALUES ($1, $2, $3, $4, $5, $6);", [courseid, username, textcomment, difficulty, time, overall]));
}

async function updateUserInfoByUserID(userid, email, password, username, schoolname, gender, major) {
    return await connectAndRun(db => db.none("UPDATE users SET email = $2, password = $3, username = $4, schoolname = $5, gender = $6, major = $7 WHERE userid = $1;", [userid, email, password, username, schoolname, gender, major]));
}

async function updateUserInfoNoPWDChangeByUserID(userid, email, username, schoolname, gender, major) {
    return await connectAndRun(db => db.none("UPDATE users SET email = $2, username = $3, schoolname = $4, gender = $5, major = $6 WHERE userid = $1;", [userid, email, username, schoolname, gender, major]));
}

async function updateCourseInfoByCommentsAVG(courseid) {
    return await connectAndRun(db => db.none("UPDATE courses SET difficulty = (SELECT ROUND(AVG(difficulty)) FROM coursecomments WHERE courseid = $1), time = (SELECT ROUND(AVG(time)) FROM coursecomments WHERE courseid = $1), overall = (SELECT ROUND(AVG(overall)) FROM coursecomments WHERE courseid = $1) WHERE courseid = $1;", [courseid]));
}

async function loadCourseByCourseID(courseid) {
    return await connectAndRun(db => db.one("SELECT * from courses WHERE courseid = $1;", [courseid]));
}

async function loadCoursesBySchoolSubjectNumber(schoolname, coursesubject, coursenumber) {
    return await connectAndRun(db => db.any("SELECT * from courses WHERE LOWER(schoolname) = LOWER($1) AND LOWER(coursesubject) = LOWER($2) AND coursenumber = $3;", [schoolname, coursesubject, coursenumber]));
}

async function loadCoursesBySchoolSubject(schoolname, coursesubject) {
    return await connectAndRun(db => db.any("SELECT * from courses WHERE LOWER(schoolname) = LOWER($1) AND LOWER(coursesubject) = LOWER($2);", [schoolname, coursesubject]));
}

async function loadCoursesBySchool(schoolname) {
    return await connectAndRun(db => db.any("SELECT * from courses WHERE LOWER(schoolname) = LOWER($1);", [schoolname]));
}


async function loadCoursecommentsByCourseID(courseid) {
    return await connectAndRun(db => db.any("SELECT * from coursecomments WHERE courseid = $1;", [courseid]));
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
    await addNewCourse(req.body.schoolname, req.body.coursesubject, req.body.coursenumber, req.body.instructor, req.body.difficulty, req.body.time, req.body.overall, req.body.username, req.body.textcomment);
    res.send("OK");
});

app.post("/addnewcomment", async (req, res) => {
    await addNewComment(req.body.courseid, req.body.username, req.body.textcomment, req.body.difficulty, req.body.time, req.body.overall);
    res.send("OK");
});

app.post("/updateuserinfo", async (req, res) => {
    await updateUserInfoByUserID(req.body.userid, req.body.email, req.body.password, req.body.username, req.body.schoolname, req.body.gender, req.body.major);
    res.send("OK");
});

app.post("/updateuserinfonopwdchange", async (req, res) => {
    await updateUserInfoNoPWDChangeByUserID(req.body.userid, req.body.email, req.body.username, req.body.schoolname, req.body.gender, req.body.major);
    res.send("OK");
});

app.post("/updatecourseinfo", async (req, res) => {
    await updateCourseInfoByCommentsAVG(req.body.courseid);
    res.send("OK");
});

app.get("/loadthiscourse", async (req, res) => {
    const thiscourse = await loadCourseByCourseID(req.query.courseid);
    res.send(JSON.stringify(thiscourse));
});

app.get("/loadcoursesbyschoolsubjectnumber", async (req, res) => {
    const coursesloaded = await loadCoursesBySchoolSubjectNumber(req.query.schoolname, req.query.coursesubject, req.query.coursenumber);
    res.send(JSON.stringify(coursesloaded));
});

app.get("/loadcoursesbyschoolsubject", async (req, res) => {
    const coursesloaded = await loadCoursesBySchoolSubject(req.query.schoolname, req.query.coursesubject);
    res.send(JSON.stringify(coursesloaded));
});

app.get("/loadcoursesbyschool", async (req, res) => {
    const coursesloaded = await loadCoursesBySchool(req.query.schoolname);
    res.send(JSON.stringify(coursesloaded));
});


app.get("/loadcoursecommentsbycourseid", async (req, res) => {
    const commentsloaded = await loadCoursecommentsByCourseID(req.query.courseid);
    res.send(JSON.stringify(commentsloaded));
});


app.listen(process.env.PORT || 8080);