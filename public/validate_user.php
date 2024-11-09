<?php
header('Content-Type: application/json');

// Database connection setup
$servername = "localhost";
$dbUsername = "root";       // Your MySQL username
$dbPassword = "";           // Your MySQL password
$dbname = "database_kfn";   // Your database name

$conn = new mysqli($servername, $dbUsername, $dbPassword, $dbname);

// Check for connection errors
if ($conn->connect_error) {
    echo json_encode(["valid" => false, "error" => "Database connection failed"]);
    exit;
}

// Get the raw JSON data from the request
$data = json_decode(file_get_contents("php://input"), true);

// Retrieve and validate input
$usernameOrEmail = isset($data['usernameOrEmail']) ? $data['usernameOrEmail'] : null;
$password = isset($data['password']) ? $data['password'] : null;

if (empty($usernameOrEmail) || empty($password)) {
    echo json_encode(["valid" => false, "error" => "Username or password cannot be empty"]);
    exit;
}

// Query to check if the user exists in the database
$query = "SELECT password FROM user WHERE (Name = ? OR Email = ?) LIMIT 1";
$stmt = $conn->prepare($query);
$stmt->bind_param("ss", $usernameOrEmail, $usernameOrEmail);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["valid" => false, "error" => "Invalid username or password"]);
} else {
    $row = $result->fetch_assoc();
    // Assuming passwords are stored in a hashed format; verify the password
    if (password_verify($password, $row['password'])) {
        echo json_encode(["valid" => true]);
    } else {
        echo json_encode(["valid" => false, "error" => "Invalid username or password"]);
    }
}

// Close the statement and connection
$stmt->close();
$conn->close();

