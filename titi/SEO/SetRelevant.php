<?php
header("Access-Control-Allow-Origin: *");


if ( isset($_POST['command'])  )
{
    if ( isset($_POST['p1'])   )
    {
        $id = $_POST['p1'] ;
        $isChecked = $_POST['p2'] ;

       
        include $baseREP.'/PHP/config.php';
        $conn = new mysqli($servername, $username, $password, $dbname);
        $conn->set_charset("utf8") ;
        if ($conn->connect_error)
            die("Connection failed: " . $conn->connect_error);


        $sql = "update SiteWeb_Ranking set isRelevant = ".$isChecked." WHERE id = ".$id ;
        $conn->query($sql) ;

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