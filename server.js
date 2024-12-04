const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/test', {  // Add your database name here
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB", err));

// Define roles
const ROLE_TEAM_LEAD = 'teamLead';
const ROLE_TEAM_MEMBER = 'teamMember';
const ROLE_COORDINATOR = 'coordinator';

// Define User model schema
const userSchema = new mongoose.Schema({
    rollNo: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    team: { type: String, required: true },
    role: {
        type: String,
        enum: [ROLE_TEAM_LEAD, ROLE_TEAM_MEMBER, ROLE_COORDINATOR],
        required: true
    },
    teamId: { type: String }  // Optional for future use if needed for team tracking
});

// Define the Team model schema
const teamSchema = new mongoose.Schema({
    teamId: { type: String, required: true, unique: true },
    lead: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the User model
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Reference to User model
});

// Define collections
const User = mongoose.model('User', userSchema);
const Team = mongoose.model('Team', teamSchema);

// Define task model
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, enum: ['active', 'inactive'], default: 'inactive' },
    submissionLink: { type: String },
    deadline: { type: Date, required: true }
});

const Task = mongoose.model('Task', taskSchema);

// Middleware for authentication
const authenticate = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send('Access denied. No token provided.');
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, 'secretkey');
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Token verification error:', err.message);
        res.status(400).send('Invalid token.');
    }
};

// Middleware for role-based access control
const authorize = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).send('Access denied. You do not have the required role.');
        }
        next();
    };
};

// Routes
// Route for logging in
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    let user;

    try {
        // Check if the user is a coordinator
        user = await User.findOne({ email, role: ROLE_COORDINATOR });
        
        if (user) {
            // Check coordinator credentials
            console.log('Coordinator found:', user); // Log found coordinator
            const isValidPassword = bcrypt.compareSync(password, user.password);
            if (!isValidPassword) {
                console.log('Invalid password for coordinator:', email);
                return res.status(400).json({ message: 'Invalid email or password.' });
            }
        } else {
            // If not a coordinator, check teams collection for team member or team lead
            user = await User.findOne({ email });
            if (!user) {
                console.log('User not found:', email);
                return res.status(400).json({ message: 'Invalid email or password.' });
            }
            const isValidPassword = bcrypt.compareSync(password, user.password);
            if (!isValidPassword) {
                console.log('Invalid password for user:', email);
                return res.status(400).json({ message: 'Invalid email or password.' });
            }
        }

        // Generate token for the user
        const token = jwt.sign({ id: user._id, role: user.role }, 'secretkey', { expiresIn: '1h' });
        
        // Redirect based on role
        const redirectUrl = user.role === ROLE_TEAM_MEMBER ? '/profile' : '/dashboard'; 
        res.json({ token, role: user.role, redirectUrl });
    } catch (err) {
        console.error("Server error:", err);
        res.status(500).json({ message: 'Error logging in.' });
    }
});

// Coordinator route to post a task
app.post('/tasks', authenticate, authorize(ROLE_COORDINATOR), async (req, res) => {
    try {
        const { title, description, assignedTo, deadline } = req.body;

        const task = new Task({
            title,
            description,
            assignedTo,
            deadline,
        });

        await task.save();
        res.status(201).send('Task created successfully!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating task.');
    }
});

// Route to get all tasks for a specific team lead (team members view their own tasks)
app.get('/tasks/team-lead', authenticate, authorize(ROLE_TEAM_LEAD), async (req, res) => {
    try {
        const userId = req.user.id;
        const tasks = await Task.find({ assignedTo: userId });
        res.send(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching tasks.');
    }
});

// Route to get team members based on team ID
// Route to get team members based on team ID
// Route to get team members based on team ID
app.get('/api/team/:teamId/members', authenticate, async (req, res) => {
    const { teamId } = req.params;
    try {
        // Change 'teams' to 'Team'
        const teamData = await Team.findOne({ teamId: teamId }).populate('lead').populate('members');
        if (!teamData) {
            return res.status(404).json({ message: 'Team not found' });
        }
        const members = await User.find({ _id: { $in: teamData.members } }); // Fetch user details of the members
        res.json({ lead: teamData.lead, members }); // Send both lead and members
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching team members' });
    }
});



// Route for team members to view their own tasks
app.get('/tasks/team-member', authenticate, authorize(ROLE_TEAM_MEMBER), async (req, res) => {
    try {
        const userId = req.user.id;
        const tasks = await Task.find({ assignedTo: userId });
        res.send(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching tasks.');
    }
});

// Any authenticated user can access
app.get('/dashboard', authenticate, (req, res) => {
    res.send(`Welcome ${req.user.role}!`);
});

const port = 8000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
