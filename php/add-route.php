<?php
/*
if (isset($_GET['name'], $_GET['email'], $_GET['message'])) {
  print_r($_GET);
}
*/

  if ($_SERVER['REQUEST_METHOD'] == 'GET') {

        //login and connect to mysql
        require_once 'login.php';

        $db_server = mysql_connect($host, $username, $password);
        if (!$db_server) die("Unable to connect to MySQL: " . mysql_error());
        mysql_select_db("busRouteDB") or die("Unable to select database: " . mysql_error());

        $query_string = "SELECT * FROM addresses;"

          //alert user if successfully added to database
        $query = mysql_query($query_string);

        $number_of_requests = mysql_num_rows($query);
          if ($number_of_requests == 0) {
            echo "no response";
          } else {
          		echo '<table id = "products" class="sortable table table-striped">';
		          echo '<tr> <th>item_id</th> <th>name</th> <th>price</th> <th>quantity</th> <th>date of last restock</th> <th>calories</th> <th class="sorttable_nosort">qr</th> </tr>';

              for ($current_row = 0; $current_row < $number_of_requests; $current_row++)
              {
              	// walker variable (through rows in the table)
                $request = mysql_fetch_row($query);
                echo '<tr>';
                foreach ($request as $value) {
                	echo '<td>' . $value . '</td>';
                }
              	echo'</tr>';
              }
        	    echo '</table>';
          }

          mysql_close($db_server);
    }
