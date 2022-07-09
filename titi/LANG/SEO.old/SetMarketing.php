<?php
header("Access-Control-Allow-Origin: *");

//echo "<script>alert('test');</script>";


if ( isset($_POST['command'])  )
{
    if ( isset($_POST['p1'])   )
    {
        $Domaine = $_POST['p1'] ;
        $Value = $_POST['p2'] ;


       
        include $baseREP.'/PHP/config.php';
        $conn = new mysqli($servername, $username, $password, $dbname);
        $conn->set_charset("utf8") ;
        if ($conn->connect_error)
            die("Connection failed: " . $conn->connect_error);


        $sql = "select * from  SiteWeb_Info WHERE Domaine = '".$Domaine."'" ;
        $result = $conn->query($sql);
        if ($result->num_rows > 0)
            $sql2 = "update SiteWeb_Info set Marketing = '".$Value."' WHERE Domaine = '".$Domaine."'" ;
        else
            $sql2 = "insert into SiteWeb_Info (Domaine, Marketing) values ( '".$Domaine."','".$Value."' )"  ;

        $conn->query($sql2) ;


        $conn->close();
    }
    else{
        header("Location: /") ;
    }
    
}
else{
    header("Location: /") ;
}
?>