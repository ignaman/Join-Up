<?php
include 'connect.php';

$sql = "SELECT * FROM user";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<p>" . $row["Name"] . "</p>";
    }
} else {
    echo "0 results";
}
$conn->close();

