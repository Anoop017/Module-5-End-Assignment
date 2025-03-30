const express = require('express')
const mongoose = require('mongoose')
const Trip = require('./model/trips')


const app = express()
const PORT = 3000;
app.use(express.json())

app.get('/',(req, res)=>{
    res.send("Welcome to Travel Planner")
})

async function main(){
    await mongoose.connect('mongodb+srv://anoopsnair1123:raQsNSheJ49IQjji@cluster0.9uh1u.mongodb.net/Module_5_End_Assignment')
}

main()
.then(()=>console.log('DB Connected'))
.catch(err=>console.log(err))

//Create a new trip

app.post('/plans', async (req, res) => {
    try {
        const trip = new Trip(req.body);
        await trip.save();

        const formattedTrip = {
            ...trip._doc,
            startDate: trip.startDate.toISOString().split("T")[0],
            endDate: trip.endDate.toISOString().split("T")[0]
        };

        res.status(201).json({ message: "Trip created successfully", trip: formattedTrip });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});



// Get all trips

app.get('/plans', async (req, res) => {
    try {
        const trips = await Trip.find();

        const formattedTrips = trips.map(trip => ({
            ...trip._doc,
            startDate: trip.startDate.toISOString().split("T")[0],
            endDate: trip.endDate.toISOString().split("T")[0]
        }));

        res.status(200).json({ message: "Trips fetched successfully", trips: formattedTrips });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});



// Get Plans by ID

app.get('/plans/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Trip ID" });
        }

        const trip = await Trip.findById(id);

        if (!trip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        const formattedTrip = {
            ...trip._doc,
            startDate: trip.startDate.toISOString().split("T")[0],
            endDate: trip.endDate.toISOString().split("T")[0]
        };

        res.status(200).json({ message: "Trip fetched successfully", trip: formattedTrip });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});


// Update Plans by ID

app.patch('/plans/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Trip ID" });
        }

        const updatedTrip = await Trip.findByIdAndUpdate(id, req.body, {
            new: true, 
            runValidators: true 
        });

        if (!updatedTrip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        const formattedTrip = {
            ...updatedTrip._doc,
            startDate: updatedTrip.startDate.toISOString().split("T")[0],
            endDate: updatedTrip.endDate.toISOString().split("T")[0]
        };

        
        res.status(200).json({ message: "Trip updated successfully", trip: formattedTrip });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});


// DELETE plans by ID

app.delete('/plans/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Trip ID" });
        }

        const deletedTrip = await Trip.findByIdAndDelete(id);

        if (!deletedTrip) {
            return res.status(404).json({ message: "Trip not found" });
        }

        res.status(200).json({ message: "Trip deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});














app.listen(PORT,()=>{
    console.log('server is running')
})