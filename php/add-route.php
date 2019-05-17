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

        $query_string = "INSERT INTO addresses (address) VALUES ('New Jersey');"

          //alert user if successfully added to database
          if (mysql_query($query_string)) {
              print_r('nice');
          } else {
              print_r('an error occurred');
          }

          mysql_close($db_server);
    }
