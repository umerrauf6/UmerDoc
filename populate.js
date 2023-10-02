const Doctor = require("./models/doctorModel");
const mongoose = require("mongoose");
async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://su0000676:Yrbhz2BmWHTkRmyN@cluster0.xynstn9.mongodb.net/UmerDoc",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}
const sampleDoctors = [
  {
    name: "Dr. John Smith",
    email: "john.smith@example.com",
    phoneNumber: 1234567890,
    password: "password123",
    description: "Experienced cardiologist with a focus on heart health.",
    city: "lahore",
    image: "https://imgur.com/doctor1image",
  },
  {
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@example.com",
    phoneNumber: 9876543210,
    password: "pass321word",
    description: "Pediatrician specializing in child healthcare.",
    city: "karachi",
    image: "https://imgur.com/doctor2image",
  },
  {
    name: "Dr. Alex Davis",
    email: "alex.davis@example.com",
    phoneNumber: 5555555555,
    password: "mypassword",
    description: "Orthopedic surgeon specializing in joint replacements.",
    city: "islamabad",
    image: "https://imgur.com/doctor3image",
  },
  {
    name: "Dr. Emily Adams",
    email: "emily.adams@example.com",
    phoneNumber: 1237894560,
    password: "securepass",
    description: "Dermatologist focusing on skincare and skin health.",
    city: "lahore",
    image: "https://imgur.com/doctor4image",
  },
  {
    name: "Dr. Michael Wilson",
    email: "michael.wilson@example.com",
    phoneNumber: 9870123456,
    password: "strongpassword",
    description:
      "Neurologist specializing in brain and nervous system disorders.",
    city: "karachi",
    image: "https://imgur.com/doctor5image",
  },
  {
    name: "Dr. Jennifer Lee",
    email: "jennifer.lee@example.com",
    phoneNumber: 6549873210,
    password: "p@ssw0rd",
    description: "Gynecologist focusing on women's health and wellness.",
    city: "islamabad",
    image: "https://imgur.com/doctor6image",
  },
  {
    name: "Dr. Robert Harris",
    email: "robert.harris@example.com",
    phoneNumber: 1122334455,
    password: "secretpassword",
    description: "General practitioner providing comprehensive healthcare.",
    city: "lahore",
    image: "https://imgur.com/doctor7image",
  },
  {
    name: "Dr. Laura Turner",
    email: "laura.turner@example.com",
    phoneNumber: 9876541230,
    password: "password2022",
    description: "Ophthalmologist specializing in eye care and vision health.",
    city: "karachi",
    image: "https://imgur.com/doctor8image",
  },
  {
    name: "Dr. David Clark",
    email: "david.clark@example.com",
    phoneNumber: 4567890123,
    password: "mypassword",
    description: "ENT specialist focusing on ear, nose, and throat issues.",
    city: "islamabad",
    image: "https://imgur.com/doctor9image",
  },
  {
    name: "Dr. Melissa Roberts",
    email: "melissa.roberts@example.com",
    phoneNumber: 7890123456,
    password: "strongpass123",
    description: "Dentist specializing in oral health and dental care.",
    city: "lahore",
    image: "https://imgur.com/doctor10image",
  },
];
connectDB();

Doctor.insertMany(sampleDoctors)
  .then(() => {
    console.log("Data inserted successfully");
  })
  .catch((error) => {
    console.error("Error inserting data:", error);
  });
