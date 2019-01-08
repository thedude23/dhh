<?php
	if (isset($_POST['key'])) {

		$conn = new mysqli('localhost', 'root', '', 'dhh');

		if ($_POST['key'] == 'getRowData') {
			$rowID = $conn->real_escape_string($_POST['rowID']);
			$sql = $conn->query("SELECT name, price, season FROM products WHERE id='$rowID'");
			$data = $sql->fetch_array();
			$jsonArray = array(
				'name' => $data['name'],
				'price' => $data['price'],
				'season' => $data['season'],
			);

			exit(json_encode($jsonArray));
 		}

		if ($_POST['key'] == 'getExistingData') {
			$start = $conn->real_escape_string($_POST['start']);
			$limit = $conn->real_escape_string($_POST['limit']);

			$sql = $conn->query("SELECT id, name FROM products LIMIT $start, $limit");
			if ($sql->num_rows > 0) {
				$response = "";
				while($data = $sql->fetch_array()) {
					$response .= '
						<tr>
							<td>'.$data["id"].'</td>
							<td id="products_'.$data["id"].'">'.$data["name"].'</td>
							<td>
								<input type="button" onclick="viewORedit('.$data["id"].', \'edit\')" value="Edit" class="btn btn-primary">
								<input type="button" onclick="viewORedit('.$data["id"].', \'view\')" value="View" class="btn">
								<input type="button" onclick="deleteRow('.$data["id"].')" value="Delete" class="btn btn-danger">
							</td>
						</tr>
					';
				}
				exit($response);
			} else
				exit('reachedMax');
		}


		$rowID = $conn->real_escape_string($_POST['rowID']);
		$name = $conn->real_escape_string($_POST['name']);
		$price = $conn->real_escape_string($_POST['price']);
		$season = $conn->real_escape_string($_POST['season']);

		
		if ($_POST['key'] == 'deleteRow') {
			$conn->query("DELETE FROM products WHERE id='$rowID'");
			exit('The Row Has Been Deleted!');
		}

		if ($_POST['key'] == 'updateRow') {
			$conn->query("UPDATE products SET name='$name', price='$price', season='$season' WHERE id='$rowID'");
			exit('success');
		}

		if ($_POST['key'] == 'addNew') {
			$sql = $conn->query("SELECT id FROM products WHERE name = '$name'");
			if ($sql->num_rows > 0)
				exit("Product With This Name Already Exists!");
			else {
				$conn->query("INSERT INTO products (name, price, season) 
							VALUES ('$name', '$price', '$season')");
				exit('Product Has Been Inserted!');
			}
		}
	}
?>