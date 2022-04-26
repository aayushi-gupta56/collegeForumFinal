const express = require('express');
const cors = require('cors');
const app = express();
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const dotenv = require('dotenv');
const clubsRoute = require('./routes/clubs_profile');
const studRoute = require('./routes/stud_profile');
const membersRoute = require('./routes/club_members');
const postsRoute = require('./routes/posts');
const convoRoute = require('./routes/conversation');
const msgRoute = require('./routes/message')
const calendarRoute = require('./routes/calendar')
const path = require("path")

dotenv.config();

app.use(cors());
app.use(express.json());

app.use(express.static('public'))

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/clubs', clubsRoute);
app.use('/api/stud', studRoute);
app.use('/api/clubs/members', membersRoute);
app.use('/api/posts', postsRoute);
app.use('/api/convo', convoRoute)
app.use('/api/msg', msgRoute);
app.use('/api/calendar', calendarRoute);

app.listen(process.env.PORT | 5000, ()=>{
    console.log("Server running on port 5000");
})