<?php
// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "data_base_kfn";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Capture data from the form
$name = $_POST['name'];
$email = $_POST['email'];

// Insert data into the table
$sql = "INSERT INTO user (Name, Email) VALUES ('$name', '$email')";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close the connection
$conn->close();

