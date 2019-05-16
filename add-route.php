<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($this->request->server['HTTP_ORIGIN'])) {
  $this->response->addHeader('Access-Control-Allow-Origin: ' . $this->request->server['HTTP_ORIGIN']);
  $this->response->addHeader('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
  $this->response->addHeader('Access-Control-Max-Age: 1000');
  $this->response->addHeader('Access-Control-Allow-Credentials: true');
  $this->response->addHeader('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

  $headers = getallheaders();
        //login and connect to mysql
        require_once 'login.php';

        $db_server = mysql_connect($host, $username, $password);
        if (!$db_server) die("Unable to connect to MySQL: " . mysql_error());
        mysql_select_db("busRouteDB") or die("Unable to select database: " . mysql_error());

        $query_string = "INSERT INTO addresses (address) VALUES ('New Jersey');"

          //alert user if successfully added to database
          if (!mysql_query($query_string)) {
              die('Error: ' . mysql_error($db_server));
          }

          mysql_close($db_server);
}

?>
