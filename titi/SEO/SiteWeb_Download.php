<?php
header("Access-Control-Allow-Origin: *");




function ExecuteAsyncShellCommand($comando = null){
    if(!$comando){
        throw new Exception("No command given");
    }
    // If windows, else
    if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
        system($comando." > NUL");
    }else{
        shell_exec("/usr/bin/nohup ".$comando." >/dev/null 2>&1 &");
    }
  }
  

  include $baseREP.'/PHP/config.php';


if ( isset($_POST['command'])  )
{
    if ( isset($_POST['p1'])   )
    {
        $Domaine = $_POST['p1'] ;
        
        $nc1 = $RepertoirePython."/SitesWeb/aaa.sh ".$Domaine."  2>&1 " ;
        $command = escapeshellcmd($nc1);
        ExecuteAsyncShellCommand($command) ;
    }
    else{
        header("Location: /") ;
    }
    
}
else{
    header("Location: /") ;
}
?>