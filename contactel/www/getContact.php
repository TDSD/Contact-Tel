<?php
$mysqli = new mysqli("localhost", "root", "", "CONTACTEL");
if($mysqli->connect_error) {
  exit('Could not connect');
}

$sql = "SELECT * FROM contacts WHERE id = ?";

$stmt = $mysqli->prepare($sql);
$stmt->bind_param("s", $_GET['q']);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($id, $nom, $prenom, $telephone, $email, $adresse);
$stmt->fetch();
$stmt->close();

echo "<table>";
echo "<tr>";
echo "<th>CustomerID</th>";
echo "<td>" . $id . "</td>";
echo "<th>CompanyName</th>";
echo "<td>" . $nom . "</td>";
echo "<th>ContactName</th>";
echo "<td>" . $prenom . "</td>";
echo "<th>Address</th>";
echo "<td>" . $telephone . "</td>";
echo "<th>City</th>";
echo "<td>" . $email . "</td>";
echo "<th>PostalCode</th>";
echo "<td>" . $adresse . "</td>";
echo "</tr>";
echo "</table>";
?>