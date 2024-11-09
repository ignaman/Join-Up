<?php
header('Content-Type: application/json');

include 'db_connection.php';  // Assuming you have a file for database connection
print 'test';
// Decode JSON request body
$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'];
$email = $data['email'];
$password = password_hash($data['password'], PASSWORD_BCRYPT);  // Hash the password

// Query to insert new user data
$sql = "INSERT INTO user (Name, Email, Password) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $username, $email, $password);

$response = [];
if ($stmt->execute()) {
    $response['status'] = 'success';
} else {
    $response['status'] = 'error';
    $response['message'] = 'Failed to save data';
}

echo json_encode($response);

$conn->close();

