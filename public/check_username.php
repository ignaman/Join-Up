<?php
// Include database connection (adjust to your database settings)
include('db_connection.php');

// Get the username from the POST data
$data = json_decode(file_get_contents("php://input"));
$username = $data->username;

// Check if the username already exists in the database
$query = "SELECT COUNT(*) AS count FROM user WHERE Name = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("s", $username); // "s" indicates string
$stmt->execute();
$stmt->bind_result($count);
$stmt->fetch();
$stmt->close();

// If count is 0, the username is unique
$isUnique = $count == 0;

// Respond with JSON
header('Content-Type: application/json');
echo json_encode(['isUnique' => $isUnique]);

